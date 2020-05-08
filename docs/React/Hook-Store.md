# Hook Store

React 状态管理方案：

1. 传统的主要有

+ `Redux`
+ `Mbox`

2. 基于 Hook 的方案的方案有：

+ [unstated-next](https://github.com/jamiebuilds/unstated-next)

+ [constate](https://github.com/diegohaz/constate)

+ [iceStore](https://github.com/ice-lab/icestore)

[飞冰](https://ice.alibaba-inc.com/) 团队开发。

+ []

## 设计一个数据流应考虑的因素

数据流，包含两个关键字「数据」和「流」。数据的流向是从「数据的生产者」(Data Provider) 流向「数据的消费者」(Data Consumer)。即存在两个动作实体，

+ Provider 提供数据(对数据进行增删查改)；
+ Consumer 进行取数操作，并且数据变更后能够及时重新获取。

## 基于 Context 的 Hook 状态管理方案

这种方案主要是基于 [Context](https://reactjs.org/docs/context.html) 的特性，通过顶层组件 `<Context.Provider />` 实现对状态的统一管理。简单来说，为 `<Context.Provider />` 组件提供状态。

```jsx
const StoreContext = React.createContext();
const StoreProvider = (props) => {
  const [store, setStore] = React.useState({
    name: "xiaoke",
    count: 1
  });
  const value = React.useMemo(() => [state, setStore], [state]);
  return <StoreContext.Provider value={value} {...props} />;
}
```

`<StoreContext.Provider />` 提供用于保存 `name` 和 `count` 的 Store。这是保存 Store 的地方，同时为 Store 的数据更改提供了 `setStore` 方法。

> 这里，我们并未为 `createContext` 提供 defaultValue，这是有意为之。

有了 Provider，我们的组件设计如下：

```jsx
export default function App() {
  return (
    <StoreProvider>
      <User />
      <Counter />
      <CounterDispatch />
    </StoreProvider>
  );
}
```

接下来，数据提供方(`<CounterDispatch />`)如何变更数据，并且数据消费方(`<User />` 和 `<Counter />`)如何及时消费 Store。可以使用 `React.useContext` 这个 Hook 得到方便解决。

```jsx
// 消费 Store 的组件
const Counter = () => {
  const [state] = React.useContext(StoreContext);
  return <p>count: {state.count}</p>;
}

const User = () => {
  const [state] = React.useContext(StoreContext);
  return <p>I am {state.name}</p>;
}

// 变更 Store 的组件
const CounterDispatch = () => {
  const [, setStore] = React.useContext(StoreContext);
  const inc = () => setStore(store => ({
    ...store,
    count: store.count + 1
  }));
  return <button onClick={inc}>add</button>;
}
```

### 使用 useReducer 优化 Store

类似于 Redux，可以使用 Reducer 统一管理变更 Store 的行为。完整代码如下:

```jsx
const StoreContext = React.createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_COUNT_INC':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    default:
      throw new Error('error')
  }
}

const StoreProvider = (props) => {
  const [store, dispath] = React.useReducer(reducer, {
    name: "xiaoke",
    count: 1
  });
  const value = React.useMemo(() => [store, dispath], [store]);
  return <StoreContext.Provider value={value} {...props} />;
}

const User = () => {
  const [state] = React.useContext(StoreContext);
  return <p>i am {state.name}</p>;
}

const Counter = () => {
  const [state] = React.useContext(StoreContext);
  return <p>count: {state.count}</p>;
}

const CounterDispatch = () => {
  const [, dispath] = React.useContext(StoreContext);
  const inc = () => dispath({ type: 'SET_COUNT_INC'});
  return <button onClick={inc}>add</button>;
}

export default function App() {
  return (
    <div>
      <StoreProvider>
        <User />
        <Counter />
        <CounterDispatch />
      </StoreProvider>
    </div>
  );
}
```

[![Edit hook-store-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hook-store-context-nvqbk?fontsize=14&hidenavigation=1&theme=dark)

### 方案优化

若使用 Context「集中式」地管理 Store，则每个消费 `Context` 的组件都会被重新渲染，从而可能导致性能问题。

> 在上例中，当点击 Add 按钮，`<Counter />` 会被重新渲染，组件 `<User />` 和 `<CounterDispatch />` 也会被重新渲染。

- 评价： 这个方案的状态管理依赖组件，即 component-dependent。

### 案例

[unstated-next](https://github.com/jamiebuilds/unstated-next) 、[outstated](https://github.com/yamalight/outstated)等三方库便是基于 Context + State 提供数据状态管理。

## Reference

1. [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
