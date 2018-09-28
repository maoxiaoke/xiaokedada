# Flux 学习

Flux 是一种信息架构，或者说软件架构。而不是框架。

## MVC or MV*

MVC 是开发用户界面的一种软件架构。其中 M，V，C 的关系大概如下图所示。

![MVC](http://p3puylt4n.bkt.clouddn.com/500px-MVC-Process.svg.png)

> 图片来自 [wiki 百科](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

实际上很明显，在真正的 MVC 架构中（或者说传统的，只是我不太像把话说得太死），数据的流向是**单向的**(unidirectional) 的。后端的实施大概是这样，服务端接收数据，通过 `Controller` 进行逻辑处理，对 `Model` 中的数据进行修改，最终更新 `View` 层。

变种也可能是这种方式：

![](http://p3puylt4n.bkt.clouddn.com/mvc-backend.jpg)

> 图片来自 [Why we are doing MVC and FLUX wrong](http://www.christianalfoni.com/articles/2015_08_02_Why-we-are-doing-MVC-and-FLUX-wrong)

`View` 层并不和 `Model` 直接交互，而是会再经过 `Controller` 进行一次数据组装。

### 前端的 MVC 的思考

在前端应用 MVC 是一件很让人困惑的事情。

1. 第一点，无法保证 MVC 是一个单向的数据流结构。源于多种原因，比如：
  + 诸如 Vue、Angular 的 MV* 框架绑定 `onchange()` 事件来更新 Model
  + MV* 框架会通过 Model 中的数据来更新 View
  + 可以通过 `AJAX` 返回新的 Model 数据

> 参考来源 [MVC vs. Flux ? Bidirectional vs. Unidirectional?](https://stackoverflow.com/questions/33447710/mvc-vs-flux-bidirectional-vs-unidirectional/33455847)

2. 不只有一个数据入口。

3. 没有单个 State Store 的概念。

当 View 和 Model 进行解耦后，状态的改变可能会 request 到多个 Model（和后端的处理一样，request 到多个数据库）。如果对 Model 进行抽象，Model 不是和 View 一对一对应。当项目变得很大的时候，就可能会出现这样的结果：

> 这里说的 state，称为 状态。跟 Model data 并不是等价的。

![When scale](http://p3puylt4n.bkt.clouddn.com/MVC_02.PNG)

> 图片来源，[Rethinking Web App Development at Facebook](https://www.youtube.com/watch?v=nYkdrAPrdcw)

### MV* 的一个很大的优势

MV* 架构的一个很大的优势在于，确保[**关注点分离**](https://en.wikipedia.org/wiki/Separation_of_concerns)(Separation of concerns，SOC)，使得功能充分解耦。这样，在 MV* 的系统中，逻辑被认为是独立的实体，分散到组件的各个地方。


## Flux 的使用场景

 `action` 多。

---

## 当我们在讨论 flux 的时候，我们在说什么

flux 比较关注的一点是，`data`。flux 将数据（信息）作为首要的设计考量。因此，我们可能需要考虑几个问题：

1. 数据的入口在哪里

这个问题有点难思考。就前端而言，数据的来源可能是用户输入、视图产生、AJAX 返回或者其他方式。当设计 flux 这样的一个信息架构时，对不同的数据来源应该做一个怎样的处理？

2. 状态管理

状态管理的一个很重要的点是，状态在哪里发生变化？

3. 同步更新

当数据之间存在相互依赖的时候，如何确保同步更新？尤其是当数据是异步更新的时候，我们无法控制何时才发生状态变化。这个时候，所能做的就只能等待异步更新发生，然后检查所有的数据依赖。

### flux 提供的解决方案

#### 单向数据流

数据在各组件之间以任意方向传递是很方便的，但同样会暴露两个问题：

+ 花费更多的时间去同步，也就是说，如果数据不按照一致的方向流动，就可能出错(尤其是大型应用，存在大量状态的竞态时)
+ 缺乏数据的可预测性。单向数据流能够提供状态的可追溯、可回溯。这种可预见的好处并不仅限于：

  1. 调试
  2. 自动化测试
  3. 更关注于功能实现

::: tip
当数据流单向地从系统进入组件时，就很容易预测和跟踪所有可能产生的影响，这种设计是很重要的，而且不只是局限于调试。这样，更多的时间可以花在构建应用的功能上。
:::

#### 更新轮回 - update Round

![](http://p3puylt4n.bkt.clouddn.com/flux-update-loop.png)

flux 的更新轮回有这么几个特点

+ 在一个更新轮回中，只有一个 `action` 在进行分发
+ 同时，我们还要保证，在一个更新轮回中没有其他任何异步行为可以打断它

#### 维持一个内部状态树

发布和订阅模式(Publish-subscribe pattern) 是组件间通信的中比较流行的一种机制。举个例子: Vue 的 `$on` 和 `$emit` 就是这样的一种方式。这种方式一定程度上进行了 *松耦合*，发布者和订阅者之间能够相互独立地运行。

但发布和订阅模式的最重要的优点，同时也是最大的缺点。第一，信息中介不会传递信息传递的状态，无法获知消息传递是成功还是失败。另外，发布者同样也不知道订阅者的状态。最后，当订阅者数量增加时，会不会造成系统不稳定？

> 参考来源 [Design Patterns: PubSub Explained](https://abdulapopoola.com/2013/03/12/design-patterns-pub-sub-explained/)

flux 在内部维持一个状态树。

#### 逻辑和状态紧密耦合

flux 使用 Store 集中修改状态，这样会导致逻辑与数据紧密耦合，这是 flux 的 Store 的一个特点。这样，不需要花费太多的精力在关注点分离，逻辑和状态变更也更为简单。

### flux 的结构图

![](http://p3puylt4n.bkt.clouddn.com/flux-ar.png)

> 图片来自 [flux 官网](https://facebook.github.io/flux/)

#### Action

官网是这样定义的：*The actions are simple objects containing the new data and an identifying type property.* - actions 是包含新数据（负载）和标识类型属性的简单对象。

:::tip
标准的 action 有两个要求，其一：

+ 必须是一个 **简单对象**
+ 必须有一个 `type` 属性

比如：

```js
{
  type: 'ADD_SOMETHING',
  payload: {
    text: 'Do something'
  }
}
```
> https://github.com/redux-utilities/flux-standard-action
:::

我们可以将 action 作为给系统传递新数据的唯一途径，是系统的入口。


:::warning
Action 是数据的入口。没有 action，一切都不会发生。Flux 使用 `Action` 来描述具体要发生什么。
:::

#### Dispatcher

Dispatcher 的职责是将 Actions 分发到 Store 中。在 flux 应用中，只有一个 Dispatcher，它是 Store 回调函数注册的地方，它将决定如何处理所有的依赖。也就是说，有了 Store 注册的回调函数，Store 就会知道哪个 Action 和它存储的状态相关。

和传统的 Publish-subscribe pattern不同的地方在于：

1. 每个回调并不是和特定的事件相对应（即，单个回调可以处理多个事件）。但是，负载（PayLoad）分发到每个注册的回调。
2. 回调可以全部或部分延迟运行，直到所依赖的回调被执行完。

> 所谓负载(PayLoad)，就是传递给回调函数的 *参数*。

可见，Dispatcher 可以说是 flux 中最重要的功能。flux 官方的实现比较简单(下面是一个简单的调用图)：

![flux-dispatcher](http://p3puylt4n.bkt.clouddn.com/flux-dispatcher.png)

> https://github.com/facebook/flux/blob/master/src/Dispatcher.js

在这里我们肯定希望得到解答，Dispatcher 是如何解决 *同步更新* 的问题，如何进行依赖关系的处理。

![flux-waitFor](http://p3puylt4n.bkt.clouddn.com/flux-waitFor.jpg)

也就是说，在 flux 的官方实现中，解决依赖的方式仍然是通过排序。

#### 思考官方实现的 Dispatcher

很显然，官方使用比较简单的代码就实现了一个满足要求的 Dispatcher，但是还是值得进一步思考。

1. 官方使用 class 来实现 Dispatcher。当我们使用官方提供的 Dispatcher 时，需要去实例化。

但是，在 flux 中，任何一刻都只有一个更新在轮回中发生。所以，我们只需要一个 Dispatcher 的实例。在设计模式中，这称之为 [**单例模式**](https://en.wikipedia.org/wiki/Singleton_pattern)。这是一种好的方式吗？这应该是值得思考的。

2. 官方实现 register 的时候，传递的是回调函数，而非存储器的引用。

如果说我们想要访问存储器更多的内容，而不仅仅是回调，这样的实现让我们似乎办不到。

:::warning
Dispatcher 是数据依赖的最终仲裁者
:::

#### Store

Store 是 flux 保存状态的地方，也是状态唯一能够被修改的地方。

:::warning
状态存储在 Store 中，有且只有 Store 可以改变它们。
:::

#### View

和 MV* 架构一致的地方，视图是负责渲染数据的。但用户交互（事件）的时候，MV* 架构可能会触发 Controller，也可能会直接修改 Model 里面的数据。而在 flux 中，则会触发 Action。

这样的目的，保障 flux 的单一入口。也就是说，通过 `AJAX` 获取数据来更新状态和用户点击按钮所触发的行为是一致的，对 flux 而言，两者没有区别。



----

## flux 优化

### Action 的优化

action 是传递数据给系统的唯一途径。前面我们隐约提到了数据的一些分类。比如，以数据来源分类：

+ 用户输入
+ API 返回
+ 视图产生(UI 状态)
+ 等等

从一个更抽象的角度来分类(即软件层面)：

+ 共享数据
+ 动态数据

#### ActionCreator

在实际的项目中，我们不太可能直接将 `Action` 和我们的业务代码杂糅起来，而更适合用 *模块化* 的解决方案。总结来说，使用 `ActionCreator` 有以下优点：

1. 模拟数据 - `ActionCreator` 可以让我们在真实数据和模拟数据之间切换自如。
2. 更利于模块化的组织 `Actions` - 当然，单纯的 `Action` 也可以进行模块化组织。

`ActionCreator` 也很简单。即，`Action` 的一个包装器。例如：

```js
// './action/load-tasks'
import dispatcher from '../dispatcher'

// export Action type
export const LOAD_TASKS = 'LOAD_TASKS'

// dispatching an action using mock data
export function loadTasks () {
  dispatcher.dispatch({
    type: LOAD_TASKS,
    payload: [
      {
        id: 1,
        name: 'xiaoke',
        state: 'running'
      }
    ]
  })
}
```

#### Asynchronous Actions

笼统来讲，我们可以将 `Action` 分为 View 和 API调用 产生两类。`View` 一般会触发一些同步 `Action`(并不是绝对的)，`API` 会触发一些异步 `Action`。

在我们整个 flux 的设计理念中，都非常强调 *同步* 的概念 - 即，在一个更新的轮回中，所有涉及的操作都是同步的。为什么需要同步，因为任何异步都是导致应用数据产生 `mutation` 的根源。那么，剩下最后一个需要解答的问题是：同步会不会使得我们从新回来远古时代？显然不会，因为这种同步，只是 flux 数据流的同步，而不是整个应用。

所以，对于异步 `ActionCreator` 的设计，就需要满足一点：在 `Action` 被分发前，一定需要等到某种响应。

```js
// './action/load-tasks'
import dispatcher from '../dispatcher'

// export Action type
export const LOAD_TASKS = 'LOAD_TASKS'

// 模拟异步请求
let api = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
})

api.then((res) => {
  dispatcher.dispatch({
    type: LOAD_TASKS,
    tasks: res
  })
})
```

更深入一点，我们还可以继续探讨 View 产生的和 异步请求 产生 `Action` 时，`ActionCreator` 如何设计；当需要组织异步请求时，`ActionCreator` 如何设计；需要处理 `error` 时，`ActionCreator` 如何设计；等等。

#### 对异步 ActionCreator 的最后一个问题，应该在 ActionCreator 中处理返回数据吗

在 flux 的设计中，我们更强调的是 `Store` 中来处理数据，而不是 `ActionCreator`。所以，我们应该去保留这种统一性，有两点：

+ 更好地跟踪状态变化
+ 可能有利于抽象化 `Action`

对以上内容的总结，在对 `Action` 的优化过程中，更强调的一下两点：

+ 模块化
+ `ActionCreator`

### Store 的优化 - 优良的 Store 设计是 flux 的基础

对于一个中大型应用，通常比较复杂，掺杂大量功能，Store 会表现得更为复杂。我们不可能为每个功能都设计一个 Store，这完全是不合理的。

在我们设计一个 Store 时，值得思考的问题有：

+ Store 是否映射到应用中的一个上层功能？
+ Store 是否忽略了不需要使用的 API 数据
+ 是否包含了太多 Store

#### 如何解决太多的 Store

但是在 flux 中，第三点往往是设计的难点。随着应用的构建，会包含越来越多的存储器。

我们能够想到的解决方案之一是，是不是可以增加**通用型**存储器。增加通用型存储器的一个缺陷是会增加更多的依赖管理，然而处理依赖并非一件很简单的事。

另外一个解决方案是，将所有的 `State` 放在一个 `Store` 里面。这样的缺陷是，单个 `Store` 的复杂度太高，将它重构成多个 `Store` 是有必要的。

### Dispatcher 的优化

----

## 和 View 层交互

和 View 层交互的第一个方面，是触发 `Store` 中的数据改变。这一点我们可以通过分发 `Actions` 来解决。

另一个方面，是从 `Store` 中取得状态数据。这当然有很多种方式：

1. 直接引用存储器

虽然可以直接引用存储器，但存在弊端。一是数据的不变性问题，另一个还是 View 层无法去感知状态的改变。

2. 使用 EventEmitter

官方包装了 Node 的 `EventEmitter` 的模块叫 `fbemitter`。

### Immutable Store


更多参考：

1. [Fluxxor](http://fluxxor.com/what-is-flux.html) - Fluxxor 是一个纯粹的 flux 库
2. [The Case for Flux](https://medium.com/swlh/the-case-for-flux-379b7d1982c6)
3. [Why do we need Flux with React?](https://stackoverflow.com/questions/35924036/why-do-we-need-flux-with-react) - Stack Overflow 问答
4. [MVC vs Flux – which one is better?](http://voidcanvas.com/flux-vs-mvc/) - 一篇批评 flux 的理性文章

5. [Idiomatic Redux: Why use action creators?](https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/)

6. [Why we are doing MVC and FLUX wrong
](http://www.christianalfoni.com/articles/2015_08_02_Why-we-are-doing-MVC-and-FLUX-wrong)

7. [The Evolution of Flux Frameworks](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31)

8. [The Case for Flux](https://medium.com/swlh/the-case-for-flux-379b7d1982c6) - 一篇描述 flux 应用场景的一篇文章


问题的思考逻辑：

1. 是什么？
2. 为什么？
  + 熟悉的场景(situation)
  + 场景的冲突点(complict)
  + 问题所在(Question)
  + 解决方案(Method)
3. 不这样行不行？
4. 有什么可拓展的