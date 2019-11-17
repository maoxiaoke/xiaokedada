# Hooks



## 组件逻辑复用的困局



用函数组件来替代 Class 组件，那么之前的函数组件有哪些功能是缺乏的呢？

+ 组件内状态
+ 生命周期

设计的目的：

1. 函数写法
2. 能够支持组件内状态 ⭐️⭐️⭐️⭐️⭐️
3. 能够支持组件的生命周期 ⭐️⭐️⭐️⭐️
4. 能够提供组件内逻辑的复用 - 函数的天然作用



现在我们考虑如何支持组件内状态。

JavaScript 中有一个函数调用栈的概念。[Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)。所以要保存函数内的状态，能够有哪些方式呢。

1. 闭包

2. 以某种方式存储在函数外的数据结构，需要具有持久性 - 非纯函数

<del>
3. 全局变量 - 比如 store - 副作用

4. 全局存储 - 比如 localstorage - 副作用

5. DOM 节点 - 副作用
</del>

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
useState (initial) {
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


