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

进程(Process)和线程(Thread)是操作系统概念<sup>1</sup>。Thread 是操作系统配置处理器时间的基本单元；一个或多个 Thread 运行在 Process 的上下文中；Thread 共享内存空间。

系统通过同时运行多个进程或线程，可以实现 *并行计算*(parallel computing)。

## 协程 Coroutine





[1] http://www.qnx.com/developers/docs/6.4.1/neutrino/getting_started/s1_procs.html