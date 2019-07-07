# weekly.js 第 1 天

本文主要包含以下内容：

1. 声明 `.svg` 文件
2. 如何为 React 写 TypeScript


## Stateless or Functional Components 的写法

使用 `React.FunctionComponent` 来声明无状态组件。比如：

```tsx
import * as React from 'react'

interface Props {
  count: number;
}

const Count: React.FunctionComponent<Props> = (props) => {
  return <h1>{ props.count }</h1>
}

export default Count
```

## Class Components 的写法

举个例子：

```tsx
import * as React from 'react'
import Count from './count'
import Button from 'antd/lib/button'

interface State {
  count: number;
}

export default class Counter extends React.Component<{}, State> {
  public constructor (props: {}) {
    super(props)
  }
  public state: State = {
    count: 0
  }

  private increment = () => {
    this.setState({
      count: (this.state.count + 1)
    })
  }

  private decrement = () => {
    this.setState({
      count: (this.state.count - 1)
    })
  }

  public render () {
    return (
      <div>
        <Count count={ this.state.count }></Count>
        <Button type="primary" onClick={ this.increment }>increment</Button>
        <Button type="danger" onClick={ this.decrement }>decrement</Button>
      </div>
    )
  }
}
```

由于不设置组件的 Props，因此设置为 `{}`。

## Default Props

比如改造第一个 `Count.tsx` 组件。

```tsx
import * as React from 'react'

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

[Using TypeScript with React](https://alligator.io/react/typescript-with-react/)

## 加入 react-router

[React-router](https://reacttraining.com/react-router/) 是 React 最热门的路由方案。

最后我们的网站应该是个这样子的(只是随便画了一下)：

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/weekly-js-web.PNG?raw=true)

大概有个首页、添加页、授权页。

### 项目结构的变化

为了代码更好组织，增加 `routes` 和 `pages` 两个文件目录，分别用来存放 *路由配置* 和 *页面*。

### 路由配置

路由配置如下：

```tsx
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import About from '../pages/about'
import Home from '../pages/home'

const routes = () => {
  return (
    <Router>
      <Route path="/" component={ Home } />
      <Route path="/about" exact component={ About } />
    </Router>
  )
}

export default routes
```

这是最简单的配置，接下来是陆续完善这个配置。

1. 页面访问 `/about` 的时候，不希望同时匹配到 `/` 页面。

为 `/` 增加一个 `exact` 关键字。

```tsx
<Route path="/" exact component={ Home } />
```

2. 如果用户访问 `/home` 这个路由，希望重定向到路由 `/`

为此，增加一个 `<Route />` 组件。

```tsx
<Route path="/home" render={() => (
  <Redirect to="/" />
)} />
```

3. 如果用户访问到错误的路由，希望增加 404 页面

通过 `<Switch />` 组件，我们可以匹配到第一个符合的页面，如果匹配不到我们设置的路由，用一个 404 页面取代。结果变成：

```tsx
<Router>
  <Switch>
    <Route path="/" exact component={ Home } />
    <Route path="/home" render={() => (
      <Redirect to="/" />
    )} />
    <Route path="/about" exact component={ About } />
    <Route render={() => <h1>404, Nothing Found</h1>} />
  </Switch>
</Router>
```

