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

2. 不再只有一个数据入口。数据有可能是用户输入，也有可能是通过 AJAX 返回的数据，或者是其他数据。

3. 没有单个 State Store 的概念。

当 View 和 Model 进行解耦后，状态的改变可能会 request 到多个 Model（和后端的处理一样，request 到多个数据库）。如果对 Model 进行抽象，Model 不是和 View 一对一对应。当项目变得很大的时候，就可能会出现这样的结果：

> 这里说的 state，称为 状态。跟 Model data 并不是等价的。

![When scale](http://p3puylt4n.bkt.clouddn.com/MVC_02.PNG)

> 图片来源，[Rethinking Web App Development at Facebook](https://www.youtube.com/watch?v=nYkdrAPrdcw)

### MV* 的一个很大的优势

MV* 架构的一个很大的优势在于，确保[**关注点分离**](https://en.wikipedia.org/wiki/Separation_of_concerns)(Separation of concerns，SOC)，使得功能充分解耦。这样，在 MV* 的系统中，逻辑被认为是独立的实体，分散到组件的各个地方。

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

+ 花费更多的时间去同步，也就是说，如果数据不按照一致的方向流动，就可能出错
+ 缺乏数据的可预测性。当数据流单向地从系统进入组件时，就很容易预测和跟踪所有可能产生的影响，这种设计是很重要的，而且不只是局限于调试。这样，更多的时间可以花在构建应用的功能上。

#### 维持一个内部状态树

发布和订阅模式(Publish-subscribe pattern) 是组件间通信的中比较流行的一种机制。举个例子: Vue 的 `$on` 和 `$emit` 就是这样的一种方式。这种方式一定程度上进行了 *松耦合*，发布者和订阅者之间能够相互独立地运行。

但发布和订阅模式的最重要的优点，同时也是最大的缺点。第一，信息中介不会传递信息传递的状态，无法获知消息传递是成功还是失败。另外，发布者同样也不知道订阅者的状态。最后，当订阅者数量增加时，会不会造成系统不稳定？

> 参考来源 [Design Patterns: PubSub Explained](https://abdulapopoola.com/2013/03/12/design-patterns-pub-sub-explained/)

flux 在内部维持一个状态树。