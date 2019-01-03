# 异步编程要点

TODO:

- [ ] 了解操作系统有关线程、并发、并行、锁模型、CSP 模型

异步编程是 JavaScript 中一个非常重要的概念。

异步的核心是 **现在** 和 **稍后**。*稍后* 体现在 *时间差* 上，过一会儿才会执行。

```js
ajax('http://xiaokedada.com',function callbackFunction(data){
  // 稍后执行
})
```

TODO:

- [ ] 多线程
- [ ] 协程 Coroutine
- [ ] 并发 Concurrency
- [ ] 并行 Parallelism
- [ ] 消费者和生产者问题 (经典的线程同步问题))

## 进程、线程和 JavaScript 单线程

> A process is an instance of an execting program. 操作系统概念。

进程(Process)实际上是一段正在执行的程序。静态的程序并不是进程，进程是激活的实体(Active Entity)。从内容的角度来理解进程，包含运行过程时的 text(代码)、data(全局变量)、heap(运行时创建)和 stack(函数调用栈)。

为了利用多 CPU(multi-CPU) 或 多核心 (multi-core) 的系统，在一个进程中，可以提供多了执行上下文(即 Single CPU, many exection context)，那便是线程(Thread)。Thread 可以共享 Process 的内存空间，数据文件等内容。

在最初，JavaScript 便被设计为单线程执行。有以下的优点：

1. 


### 理解浏览器的工作原理

对于浏览器的设计，大概有两种方案：

1. 单一进程，多个线程；或者是
2. 多个进程，通过 IPC(Inter Process Communication) 相互通信

不同的浏览器的实现并不一致，针对现代的 chrome 浏览器而言。最顶部是一个 **浏览器进程**(Browser Process)，负责协调其他进程；对于 **渲染器进程**(renderer process)，会为每个 Tab 页都创建一个进程(这中策略可能处于变化之中)；GPU 进程(GPU Process)执行 GPU 任务；插件进程(Plugin Process) 是为页面中的插件 - 比如 Flash 提供的进程；此外，chrome 还提供了 Extension Process 和 Utility Process。

multi-renderer process 的目的在于当其中的一个 tab 页崩溃的时候，不会导致整个浏览器崩溃。当然，缺点是十分明显，会消耗大量内容。

[How Blink Works](https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit#heading=h.p8sox77u21on)

[Multi-process Architecture](https://www.chromium.org/developers/design-documents/multi-process-architecture)

[Threading and Tasks in Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/threading_and_tasks.md#Tasks)

[Design Documents](https://dev.chromium.org/developers/design-documents)

<!-- 系统通过同时运行多个进程或线程，可以实现 *并行计算*(parallel computing)。 -->

## 多线程编程

## 并发 - Concurrency

CPU 按照[时间片]()来进行调度，单个 CPU 或 单个核在某一个时刻只能处理一个 Thread。CPU 运行极快，在执行上下文迅速切换时候，在我们看来，就像是 **多个线程同时运行**。这就是并发的概念。

并发

## 并发与

## 协程 Coroutine





[1] http://www.qnx.com/developers/docs/6.4.1/neutrino/getting_started/s1_procs.html