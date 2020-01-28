# Hooks

本文行文逻辑的思维缺陷：**严重的结果导向型**。

## 痛点

1. 组件嵌套地狱(wrapper hell)
2. 组件逻辑复用的困局
3. Giant Components
4. Confusing classes
   + Class is more difficult then fucntion
   + Some pattern of class is more difficult to optimize
   + Convert funcitonal components to class components is confusing.

组件逻辑复用的困局

用函数组件来替代 Class 组件，那么之前的函数组件有哪些功能是缺乏的呢？

+ 组件内状态
+ 生命周期

设计的目标：

1. 统一的写法 - 当然是函数写法
2. 能够支持组件内状态 ⭐️⭐️⭐️⭐️⭐️
3. 能够支持组件的生命周期 ⭐️⭐️⭐️⭐️
4. 需要提供性能优化措施 ⭐️⭐️⭐️⭐️
5. 能够提供组件内逻辑的复用 - 函数的天然作用
6. 支持 Context

## 如何支持组件内状态。

JavaScript 中有一个函数调用栈的概念。[Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)。所以要保存函数内的状态，能够有哪些方式呢。

1. 闭包

2. 以某种方式存储在函数外的数据结构，需要具有持久性 - 非纯的方式

	+ 全局变量 - 比如 store - 副作用
	+ 全局存储 - 比如 localstorage - 副作用
	+ DOM 节点 - 副作用

闭包排除。

**Question： 用闭包成不成。**

ok，现在存储状态的方案确定了，在这里可以联想 redux 这类 flux 状态管理架构，可以写一个雏形。

```jsx
function CounterHook () {
  const [count, dispatch] = useState(1)

  const handleClick = () => {
    dispatch(3)
  }

  return (
    <div>
      <p>count: {count}</p>
      <button type="primary" onClick={handleClick}>increment</Button>
    </div>
  )
}
```

`count` 返回的外部储存里的 *变量*，`1` 用来初始化，`dispatch` 用来更新外部存储*变量*  count 的值。

所以 useState 的初步的作用就是：

```js
let count = null
function useState (initial) {
	count = initial
	const dispatch = newState => {
		count = newState
	}
	return [count, dispatch]
}
```

上面的设计其实有一个问题： dispatch 之后 count 的值的变化并没有通知到组件。其中有一个很简单的方法（发布订阅这种复杂的事情，就不做了）：

```jsx
function CounterHook () {
  let [count, dispatch] = useState(1)

  const handleClick = () => {
    dispatch(3)
    count = useState(1)[0]
  }

  return (
    <div>
      <p>count: {count}</p>
      <button type="primary" onClick={handleClick}>increment</Button>
    </div>
  )
}
```

ok，组件内部的 count 状态已经更新为新的状态了。状态变化后，应该触发组件的 re-rendering。由于这是函数组件，函数从头到尾执行一遍，结果外部存储的 *变量*  `count` 又变回了初始值 `1`。

好难受，怎么办？重回 redux 的老路，放弃**函数内状态**？

> 反正数据都是存在外部的，我把更新数据的操作也存在外部不就得了。函数 re-rendering 的时候，把更新数据的操作全都执行一遍不就得到了所需要的状态值；或者我们换一个思路，既然已经在外部保存了上次更新的状态值，那么我们只要保存最后一次操作不就可以了。
>

按照这个思路，有下面两件事要做：

1. 定义一个结构，不仅可以储存状态，还需要储存操作；
2. 组件第一次 render 的时候和组件 update 的时候，`useState` 的操作不一样；第一次 render 组件的时候，应该创建上面定义的外部结构来存储状态，并给状态赋初值；update 的时候，应该是执行储存的更新操作，得到需要的那个状态。

结构的类型定义如下:

```ts
type Hook = {
  memoizedState: any,	// 最终保存的状态值，需要的值

  queue: UpdateQueue<any, any> | null,  // 保存更新操作的 queue

  next: Hook | null,
};

type UpdateQueue<S, A> = {
  last: Update<S, A> | null, // 循环链表，存储更新操作
};

type Update<S, A> = {
  action: A,		// 更新的操作
  next: Update<S, A> | null, // 下一个更新操作
};
```

上面的结构看上去是满足的。

接下来进行实现：

首先，useState 应该在  mount / update 两个阶段的行为不一致。

```js
function useState (initial) {
	isMounting ? onMount(initial) : onUpdate()
}
```

**Question：怎么判断是不是第一次渲染**

在第一次渲染阶段 - mount 阶段名称好像不太合适。

1. Mount 阶段 useState 的行为

+ 初始化 hook - 如果不存在属于这个函数组件的 hook，就应该创建一个
+ 初始化状态 -  函数应该接受一个状态初始值

```js
// onMount
function onMount (initial) {
	const hook: Hook = {
		memoizedState: null,
		queue: null,
		next: null,
	}
	hook.memoizedState = initial
	const queue = hook.queue = {
		last: null,
	}
	const dispatch = dispatchAction.bind(null, queue)

	return [hook.memoizedState, dispatch]
}
```

2. Dispatch 操作

dispatch 不能像之前那么简单，直接把值储存到 `hook`  的 `memoizedState` 里。

+ 将更新状态的操作储存到 queue 中；
+ 执行渲染。

```js
function dispatchAction (queue, action) {
	const update: Update = {
		action,
		next: null,
	}

	/*
	const last = queue.last
	if (last === null) {
		// 第一次 dispatch
		// 单向循环链表
		update.next = update;
	} else {
		const first = last.next
		if (first !== null) {
		// 第二次 dispatch
		// 单向循环链表
			update.next = first
		}
		last.next = update
	}
	*/

	queue.last = update

	// 执行渲染组件
	scheduleWork(fiber, expirationTime);
}
```

**比较大的一个问题：为什么不能够当前 dispatch 操作执行 action，还需要在 onUpdate 的时候执行**

3. 更新阶段 useState 的行为

+ 找到需要更新的 hook
+ 根据最后的更新操作计算最新的 state

```js
// onUpdate
function onUpdate (initial) {
	// 找到要更新的 hook
	const hook = updateWorkInProgressHook()
	const queue = hook.queue

	// let first; // 链表的第一个 update
	const last = queue.last
	let update = last
	let newState = hook.memoizedState;

	do {
		newState = update.action
		update = update.next
	} while(udpate !== null)

	// 更新 Hook

	hook.memoizedState = newState
	const dispatch = queue.dispatch

	return [hook.memoizedState, dispatch]
}
```

### 组件内存在多个状态

```tsx
function CounterHook () {
  const [count, dispatchCount] = useState(1)
  const [name, dispatchName] = useState('6爷')

  const handleClick = () => {
    dispatchCount(3)
  }

  const handleClickName = () => {
  	dispatchName('xiaoke')
  }

  return (
    <div>
      <p>count: {count}; name: {name}</p>
      <button type="primary" onClick={handleClickCount}>increment</Button>
      <button type="primary" onClick={handleClickName}>change</Button>
    </div>
  )
}
```

最容易想到的一个方案就是 hashMap：

```js
{
	'tagA': hookA,
	'tagB': hookB,
	...
}
```

这个方案怎么样呢？（定位hook方便，实现难度大一点，使用体验不太好，需要指定 key）

还有一种是使用 **单向链表**。回过头来看 Hook 的定义：

```ts
type Hook = {
  memoizedState: any,	// 最终保存的状态值，需要的值

  queue: UpdateQueue<any, any> | null,  // 保存更新操作的 queue

  next: Hook | null,
};
```

最终的结果就类似于：

```ts
const fiber = {
	...
	memoizedState: {
		memoizedState: 1,
		queue: xxx,
		next: {
			memoizedState: '6爷',
			queue: xxx,
			next: null
		}
	}
}
```

> 为什么不建议在判断语句中使用 hook 的原因
>

那么这里其实还有个问题就是：在 update 阶段时，是怎么找到对应的 hook 的。

```js
// 全局 currentHook
currentHook = nextCurrentHook;

const newHook: Hook = {
  memoizedState: currentHook.memoizedState,
  queue: currentHook.queue,
  next: null,
};

if (workInProgressHook) {
	// 第一个 hook
	workInProgressHook = newHook;
} else {
	workInProgressHook = workInProgressHook.next = newHook;
}

nextCurrentHook = currentHook.next
```

可以看出：

> update 阶段从头到尾重新创建了一条 hook 链；但是执行顺序时按照 mount 阶段的执行顺序。


### useState 优化

有一个边界问题是，我们可以同步地多次调用 dispatch。

```tsx
function CounterHook () {
  const [count, dispatch] = useState(1)

  const handleClick = () => {
    dispatch(3)
    dispatch(5)
    dispatch(7)
  }

  /*
   const handleClick = () => {
    dispatch(count + 1)
    dispatch(count + 1)
    dispatch(count + 1)
  }
  */

  return (
    <div>
      <p>count: {count}; name: {name}</p>
      <button type="primary" onClick={handleClickCount}>increment</Button>
    </div>
  )
}
```

针对上面的情况：是多次渲染 or 不多次渲染？


？为什么更新操作要有单向循环链表的设计。

? 不同类型的 hook 存储在一条  hook 链上吗？

？两个问题。


## 如何支持组件声明周期

React 支持很多声明周期，refer to [The Component Lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)。但常用的不多，主要有以下几个：

+ `componentDidMount`
+ `componentWillUnmount`
+ `componentDidUpdate`

其中，有一类非常常见的使用场景是我们会处理一些有副作用的操作，比如 AJAX 请求、浏览器事件的绑定和监听 等。从函数式的角度来说，这都是一些有 Side Effect 的操作。

我们仍然可以保持原有的声明周期函数的方式，并在函数组件适当的时机执行它，这些显然不是问题。

```tsx
function CounterHook () {
  const [count, dispatch] = useState(1)

  const handleClick = () => {
		dispatch(2)
  }

	componentDidMount () {
		// Do something harmful
	}

  return (
    <div>
      <p>count: {count}; name: {name}</p>
      <button type="primary" onClick={handleClickCount}>increment</Button>
    </div>
  )
}
```

但是 React 显然没有这样做。它希望将以前那些组件周期函数从你脑中摒除。告诉你，在函数组件中，你可以操纵组件状态，也可以进行有副作用的操作。并指定，操纵函数组件内部状态，使用 `useState`；进行副作用操作，请放在 `useEffect` 执行。对于 React 的使用者而言，代码的规范化会导致整个函数组件非常的一目了然，即只需思考哪些是组件内部状态，哪些是副作用操作，哪些是需要缓存的计算等等。

关于 React 的声明周期函数为何如此深恶痛绝，有以下理由：

+ 产生副作用的操作和清楚副作用的操作是分割的

ok，接下来来考虑如何实现 `useEffect`。useEffect 传入的是一个 [thunk 函数](https://reactgo.com/thunks-javascript/)，执行时机在 `componentDidMount` 和 `componentDidUpdate`，thunk 函数返回的函数的执行时机是 `componentWillUnmount`。

按照 useState 的设计思路，我们不需要在 mount 和 update 阶段进行区分了，同时也不需要对外提供 `dispatch` 函数，真实简单得很呢：**只需要将 useEffect 按序插入 hook 链中，等待 Fiber 在合适的时机来执行 useEffect 中的操作即可**。但是，如果我们要走得更远，就需要思考得更多。

在 useState 的介绍中，我们提到函数组件在重新渲染时会执行所有 Hook，而对于很多带有副作用的操作而言，其操作的开销可能是很大的。无差别的更新，会导致函数组件性能和体验大幅下降。因此我们想到的可能是提供一个依赖项，如果依赖变更了，在重新渲染的时才会执行副作用操作。

上述的分析中，有三点比较重要：

1. Hook.memoizedState 不再是一个值了，而是一系列配置组合。
2. 可以维护一个 updateQueue 队列提供给 Fiber 进行执行。
3. 还是应该区分 mount 和 update 阶段，在 update 阶段将更新前后依赖进行比对，如果不一致，才加入到 updateQueue 队列中。

因此，设计下 useEffect 下 Hook 的类型定义。

```ts
type Hook = {
  memoizedState: Effect, // 保存 Effet 的配置

  queue: UpdateQueue<any, any> | null,

  next: Hook | null,
};

type Effect = {
  tag: HookEffectTag,
  create: () => (() => void) | void,	// 副作用操作
  destroy: (() => void) | void,	// 取消副作用的操作
  deps: Array<mixed> | null,	// 依赖
  next: Effect,
};

type UpdateQueue = {
	lastEffect: Effect | null;
}
```

设计的 `useEffect` 的用法如下：

```ts
useEffect(() => {
	sideEffectOper();
	return destroy
}, [deps])
```

代码实现如下：

```ts
function useEffect (create, deps) {
	isMounting ? onMountEffect(create, deps) : onUpdateEffect(create, deps)
}
```

在 mount 阶段，我们需要：

+ 将 Effect Hook 追加到 Hook 链中。
+ 将 Effect 加入到 updateQueue 中。

```ts
// onMountEffect
function onMountEffect (create, deps) {
  const hook = mountWorkInProgressHook();	// 追加到 Hook 链中
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = pushEffect(create, undefined, nextDeps);	// 将 Effect 加入到 updateQueue 中
}

function pushEffect(tag, create, destroy, deps) {
  const effect: Effect = {
    tag,
    create,
    destroy,
    deps,
    next: (null: any),
  };
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}
```

可以看到，所有的 Hooks, 无论是 State Hook 还是 Effect Hook，都使用同一条 Hook 链(也没必要为不同的 Hook 类型提供不同的 Hook 链)。

在 update 阶段，需要比较更新前后 deps 的值，如果不同，则进行 Effect 操作。

```ts
// onUpdateEffect
function onupdateEffect(create, deps): void {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy = undefined;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        pushEffect(NoHookEffect, create, destroy, nextDeps);
        return;
      }
    }
  }

  hook.memoizedState = pushEffect(create, destroy, nextDeps);
}

function areHookInputsEqual(
  nextDeps: Array<mixed>,
  prevDeps: Array<mixed> | null,
) {
  if (prevDeps === null) {
    return false;
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
```

根据 update 阶段的 `useCallback` 实现，考虑以下问题；

+ Each Render has Its Own Effects

伴随着函数组件的每一次执行，`useEffects` 都是属于这一次执行，保留着这一次执行的闭包，而非上一次或下次的。

+ 传入的 deps 为空，或空数组如何呢？

很明显，如果不传入 deps，则每次 update 时都会执行 thunk 函数。

如果传入为 `[]`，则每次比较都一致，则只在 mount 阶段执行一次。

至此为止，简单介绍了下 useEffect 的使用场景：执行副作用操作。但还有些细节还需要我们进一步思考：

1. 执行时机交给 Fiber，逻辑是如何？
2. 在 mount 阶段，传入 `pushEffect` 的 destory 是 undefined，destroy 是何时得到拆解的。

## 处理性能优化

在更新组件时，往往会导致子组件也进行不必要的渲染。为了优化这类场景的性能，在类组件中引入了 [shouldComponentUpdate](https://reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action) 这个 api，通过比较 `nextProps` 和 `nextState` 来判断组件是否需要更新。

接下来考虑函数组件父子的关系。正如我们上面反复提到的，无论是 mount 还是 update，函数组件都会从头到尾重新执行一遍。考虑下面这个例子:

```tsx
const randomColour = () => "#" + ((Math.random() * 0xffffff) << 0).toString(16);

const Button = props => {
  return (
    <button onClick={props.onClick} style={{ background: randomColour() }}>
      {props.children}
    </button>
  );
};

function App() {
  const [count, setCount] = React.useState(0);
  const [delta, setDelta] = React.useState(1);

  const incDelta = () => setDelta(delta => delta + 1);
  const incCount = () => setCount(count => count + delta);

  return (
    <div>
      <p>count: {count}</p>
      <p>delta: {delta}</p>
      <Button onClick={incDelta}>测试 delta</Button>
      <Button onClick={incCount}>测试 count</Button>
    </div>
  );
}
```

上面的这个例子，当我们点击 `测试 delta` 按钮时，父组件重新渲染，即便 incCount 并未触发，但也会导致子组件 `测试 count` 的按钮重新渲染。因为 `incCount` 是子组件的 props，由于 JavaScript 函数是对象，子组件通过比较引用，判断自身需要更新(React 的 render 逻辑？)。

那么，从 useEffect 带来的启发：我们可不可以通过依赖来确定是否更新组件，如果依赖不变更，则仍然返回上次渲染的函数。由于返回的仍然是上次渲染的函数，子组件渲染时通过比较引用，确定不需要重新渲染。

大概使用方式如下：

```tsx
const randomColour = () => "#" + ((Math.random() * 0xffffff) << 0).toString(16);

const Button = props => {
  return (
    <button onClick={props.onClick} style={{ background: randomColour() }}>
      {props.children}
    </button>
  );
};

function App() {
  const [count, setCount] = React.useState(0);
  const [delta, setDelta] = React.useState(1);

  const incDelta = React.useCallback(() => setDelta(delta => delta + 1), []);
  const incCount = React.useCallback(() => setCount(count => count + delta), [delta]);

  return (
    <div>
      <p>count: {count}</p>
      <p>delta: {delta}</p>
      <Button onClick={incDelta}>测试 delta</Button>
      <Button onClick={incCount}>测试 count</Button>
    </div>
  );
}
```

当我们点击 `测试 count` 时，无论是函数 `incDelta` 还是 `incCount` 仍是上次的渲染的函数(**过去的函数**)，子组件 `<Button>` 不会重复渲染。

其实现逻辑非常简单：

```ts
// onMountCallback
function onMountCallback(callback, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

// onUpdateCallback
function updateCallback(callback, deps){
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

在 update 阶段，如果前后两次更新依赖不变，仍然返回之前的 callback。

同理，除了子组件通过 callback 向父组件传参，父组件还可以向子组件传参，这是 React 组件传参的[正确姿势](./First-Meet-React.md)。那么，React 是如何来进行比较的呢。是 `Object.is` 这个操作。可见，无论你是函数、数组、对象，都是 compared by reference。

这便是 `useMemo` 的产生的原因了。

```tsx
function List(props: Props) {
  const { list } = props;
  return (
    <ul>
      {list.map(item => (
        <li key={item.toString()}>{item}</li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = React.useState(0);
	const [list] = React.useState(["a"]);

  return (
    <div className="App">
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <List list={list} />
    </div>
  );
}
```

同理，当我们点击 count 按钮时，我们并不想渲染 List 组件。但由于 `Object.is(['a', 'a'])` 返回的结果是 false，仍然会造成 List 组件渲染。这时，我们可以使用 `useMemo`。

```tsx
function List(props: Props) {
  const { list } = props;
  return (
    <ul>
      {list.map(item => (
        <li key={item.toString()}>{item}</li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = React.useState(0);
	const [list] = React.useState(["a"]);

	const listB = React.useMemo((list) => list, [])

  return (
    <div className="App">
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <List list={listB} />
    </div>
  );
}
```

其实现和 `useCallback` 类似，简单来说：`useCallback(fn, deps) === useMemo(() => fn, deps)`，这是因为 `useMemo` 在返回之前会 `(() => fn)()` 执行一下。

```ts
// onMountMemo
function onMountMemo (nextCreate,deps){
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

// onUpdateMemo
function updateMemo (nextCreate, deps){
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

那么，`useMemo` 的用途在哪？在缓存一些大的数据结构，耗时的计算，以避免重复渲染的性能损耗。

## 其他 Hook

### useRef

useRef 的而实现非常简单。

```ts
function onMountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}

function onUpdateRef(initialValue) {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```

提供一个 current 用来保存任何值，真的是方便得很呢。

+ TODO: 使用场景
+ 输入输出

### useContext

### useReduceer


## 自定义 Hook

## 回过头来，hook 到底是什么？

**Hooks make components truly declarative by providing of state and side effects.**

特点：

1. 可重用(Rusable) - Means *Separate of Concerns*。并非复用状态，而是复用状态逻辑(state logic)。
2. smaller components

### 名人名言

> Hooks apply the React philosophy (explicit data flow and composition) inside a component, rather than just between the components. - Dan From [Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)

> And that’s the goal of Hooks — to make components truly declarative even if they contain state and side effects. - Dan From [Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)

> They’re not a way to share state — but a way to share stateful logic. - Dan From [Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)

## Recap

1. [React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/)


## Reference

1. [源码解析 React Hook 构建过程：没有设计就是最好的设计](https://www.infoq.cn/article/fiWNgsIOLaCmt-hphLYC)

2. [React Hooks完全上手指南](https://www.atatech.org/articles/152757#25)

3. [React’s useCallback and useMemo Hooks By Example](https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/)


如果想了解 Hook 设计相关的，下面的可以参阅：

4. [Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)
5. [Hooks refs](https://github.com/reactjs/rfcs/blob/master/text/0068-react-hooks.md)

下面是一些 video。

6. [React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?time_continue=4774&v=dpw9EHDh2bM&feature=emb_logo)