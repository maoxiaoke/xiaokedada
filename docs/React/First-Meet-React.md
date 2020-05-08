# React 核心概念

1. 组件复用 compisition / Stateless component / render props / high-order components / children/ Cross-Cutting Concern 问题
2. 组件通信 props / context
3. Hook

Ref 

## 组件通信

React 遵循古老的 *单向数据流* 原则。**父子组件之间的参数传递使用 Props。兄弟组件之间的参数传递通过共同的父组件作为桥梁**。

### Props

1. **父子组件通信**

父子之间通信使用 Props 可以很好地解决这一点。举例，有一个 `<Counter />` 组件。

```tsx
// Counter.tsx
interface State {
  count: number;
}
export default class Counter extends React.Component<{}, State> {
  public constructor (props: {}) {
    super(props)
  }
  state: State = {
    count: 0
  }

  public render () {
    return (
      <>
        <Count count={ this.state.count } />
      </>
    )
  }
}
```

父组件通过 Props 向子组件传递一个 `count`。子组件可以通过 `this.props.count` 访问到这个 count 值。如下：

```tsx
// Count.tsx
interface Props {
  count: number;
}

const Count: React.FunctionComponent<Props> = (props) => {
  return <h1>{ props.count }</h1>
}

export default Count
```

如果子组件需要向父组件传递参数呢？正如你想到的 - 控制反转，仍然可以通过 Props 来实现，只不过现在父组件向子组件传递的是一个可以接受 *子组件传递过来的参数的函数*。

为了说明这个问题，还是改写上面的例子。

> 不过在这种改写的情况下，就不一定是 React 组件实践的最佳案例。

改写 `<Counter />` 组件，增加一个内部函数并向子组件传递。

```tsx
// Counter.tsx
interface State {
  count: number;
}
export default class Counter extends React.Component<{}, State> {
  public constructor (props: {}) {
    super(props)
  }
  state: State = {
    count: 0
  }

  // Look here
  private increment = (count: number) => {
    this.setState({
      count: (this.state.count + count)
    })
  }

  public render () {
    return (
      <>
      	{/* And Look here */}
        <Count count={ this.state.count } onAdd={this.increment} />
      </>
    )
  }
}
```

接下来看下子组件 `<Count />` 是如何操作 `increment` 函数的。

```tsx
// Count.tsx
interface Props {
  count?: number;
  onAdd: (count: number) => void;
}

const Count: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <h1>{props.count}</h1>
      <Button type="primary" onClick={ () => props.onAdd(5) }>increment</Button>
    </>
  )
}

export default Count
```

对于，兄弟组件之间的参数传递，目前没什么好说的。记住 *单向数据流*概念，记住 *兄弟组件之间的参数传递通过共同的父组件作为桥梁* 来实现的。

2. **Props 多层级传递**

Props 和 spread 运算符结合，可以更简洁地将参数传递给更深层的子组件。例如 `<Count />` 包含一个 `<Count-Child />` 子组件，可以这样传递 Props（`<Counter />` 组件的内部参数）。

```tsx
// Count.tsx
interface Props {
  count?: number;
  onAdd: (count: number) => void;
}

const Count: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <h1>{props.count}</h1>
      <Button type="primary" onClick={ () => props.onAdd(5) }>increment</Button>
    	{/* Look here */}
    	<Count-Child {...props} />
    </>
  )
}

export default Count
```

### Context

 有时候组件有父父子子孙孙，无穷无尽。尤其是项目中需要一些 *全局*（Global）的参数需要在各个组件中传递。这个时候 [Context](https://reactjs.org/docs/context.html) 登场了。Context 提供一种方法，让参数在组件间 *肆意* 传递，而而不需要显式地传递 Props。

此刻，有三点需要关心：

1. 如何使用 context
2. 组件如何改变 context
3. 多个 context 的场景

仍然沿用上面的例子，不过最好，新增一个 `context.ts` 文件，来存储 Context 信息。

```ts
// context.ts
import * as React from 'react'

export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {}
})

export const UserContext = React.createContext({
  name: 'xiaoke'
})
```

这里我们创建了 `ThemeContext` 和 `UserContext`，用来模拟需要多个 context 的场景。`<Lastest />` 组件是 `<Counter>` 的父组件，在这个组件中，注入 context。

```tsx
// Lastest.tsx
import Counter from '../components/counter'
import { ThemeContext, UserContext } from '../context/index'

interface State {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  name: string;
}
export default class Latest extends React.Component<{}, {}> {
  public constructor (props: {}) {
    super(props)
  }

  private toggleTheme = () => {
    this.setState((state: State) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }))
  }

  state: State = {
    theme: 'dark',
    toggleTheme: this.toggleTheme,
    name: 'xiaoke'
  }

  public render () {
    const { name } = this.state
    return (
      <>
        <ThemeContext.Provider value={this.state}>
          <UserContext.Provider value={{ name }}>
            <p>Latest</p>
            <Counter />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </>
    )
  }
}
```

也就是说，通过 `<ThemeContext.Provider>` 和 `<UserContext.Provider>` 我们向 `<Lastest />` 的所有子组件注入了 `ThemeContext` 和 `UserContext`。在组件 `<Count />` 中，可以这样访问 context。

```tsx
// Count.tsx
import Button from 'antd/lib/button'
import { ThemeContext, UserContext } from '../context/index'

interface Props {
  count?: number;
  onAdd: (count: number) => void;
}

const Count: React.FunctionComponent<Props> = (props) => {
  return (
    <ThemeContext.Consumer>
      {
        ({ theme, toggleTheme }) => (
          <UserContext.Consumer>
            {
              ({ name }) => (
                <>
                  <h1>{`${props.count} and theme is ${theme} and user is ${name}`}</h1>
                  <Button type="danger" onClick={toggleTheme}>toggle theme</Button>
                  <Button type="primary" onClick={ () => props.onAdd(5) }>increment</Button>
                </>

              )
            }
          </UserContext.Consumer>
        )
      }
    </ThemeContext.Consumer>
  )
}

export default Count
```

`xxx.Consumer` 是提供给 Stateless Component 的一种写法。如果是 State Component，就需要使用到 [Class.contextType](https://reactjs.org/docs/context.html#classcontexttype) 这个 api。

>Class.contextType 这种方式只能订阅单个 context

如下面的例子：

```tsx
import { ThemeContext } from '../context/index'
export default class Count extends React.Component<Props, {}> {
  static contextType = ThemeContext
  render () {
    return (
    	<h1>{`${this.props.count} and theme is ${this.context.theme}`}</h1>
      <Button type="danger" onClick={this.context.toggleTheme}>toggle theme</Button>
      <Button type="primary" onClick={ () => props.onAdd(5) }>increment</Button>
    )
  }
}
```

#### Cons Of Context

Context 在代码中大量使用 Context 并不是一个好的设计。相反，很多情况下 [Component Composition](https://reactjs.org/docs/context.html#before-you-use-context) 会更更有帮助。

大量使用 Context 有下面几个很明显的问题：

1. 组件难以复用
2. 组件层级嵌套太深



## 组件复用

组件复用是组件设计时至关重要的一环。

### Stateless Component

Stateless Component 天然具有组件复用的良好特性。比如，上面提到的 `<Count />` 就可以设计成 Stateless Component。

```tsx
interface Props {
  count?: number;
}

export default class Count extends React.Component<Props> {
  private static defaultProps: Props = {
    count: 10
  }
  public render () {
    return <h1>{this.props.count}</h1>
  }
}
```

### Render Props

但是，想要复用 State Component 就没那么简单了。`render props` 提供了一种方法复用组件的逻辑。以组件 `<Counter />` 为例，我们想复用 `increment` 这一逻辑，但展示数字的形式可能千差万别。

```tsx
// Counter.tsx
import Button from 'antd/lib/button'

interface Props {
  render: (state: any) => any;
}
interface State {
  count: number;
}
export default class Counter extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)
  }
  state: State = {
    count: 0
  }

  private increment = (count: number = 1) => {
    this.setState({
      count: (this.state.count + count)
    })
  }

  public render () {
    return (
      <>
        {/* Look here */}
        <div>{this.props.render(this.state)}</div>
        <Button type="danger" onClick={() => this.increment()}>increment</Button>
      </>
    )
  }
}
```

这跟以前的 `<Counter />` 的逻辑没什么差别，只是在渲染的时候会根据 Props 来渲染不同的组件，即 `<div>{this.props.render(this.state)}</div>`。`<Lastest />` 组件是 `<Counter />` 的父组件，在这里提供不同的组件给  `<Counter />` 渲染。

> `<div>{this.props.render(this.state)}</div>` 是不是有点像 *组件占位符*。在 Vue 中，对应于 [slot](https://vuejs.org/v2/guide/components-slots.html)。

```tsx
// Latest.tsx
import Counter from '../components/counter'
import Count from '../components/count'

export default class Latest extends React.Component<{}, {}> {
  public render () {
    return (
      <div>
        <p>Latest</p>
        <Counter render={({ count }) => (
          <Count count={count} />
        )}/>
      </div>
    )
  }
}
```

不过请注意，这种情况下是父子之间的参数传递是如何处理的。

#### 普通 Props 和 render Props

### Higher-Order Components (HOC)

如同 [高阶函数](../JavaScript/Light-FP-Functions.md)的定义，但 HOC 的定义更为 *严格* 些：函数的参数是一个组件，返回也是一个组件，那么这个函数就是 **高阶函数**。

最基本的 HOC 设计如下：

```tsx
function HOCExample (WrappedComponent) {
  return class extends React.Component {
    render () {
      return <WrappedComponent />
    }
  }
}
```

> 额，怎么说呢？好像一个装饰器呀。

从装饰器的角度来看，高阶组件会为 `WrappedComponent` 提供 *辅助性*功能，而这功能，我们当然希望是可复用的代码逻辑。当然，应当抛开 [设计模式]() 来讨论这个问题，从函数式的角度来说，高阶函数可以接受一个函数作为参数，或返回一个函数。但高阶函数仍然是函数，函数可以有什么作用？-- 抽象。高阶组件是一个特殊的(高阶)函数（接收组件作为参数，并返回组件），所以高阶组件可以抽象 **代码逻辑**。

