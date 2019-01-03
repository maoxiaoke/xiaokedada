# 你看到的 JavaScript，并不是真实的

## console.log 是 Async 的吗？

之前在调试程序，遇到了 `console.log` 的问题，差点颠覆我的认知观。大概是如下的一段程序：

```js
let { printLogo } = order
  console.log('printLogo---', printLogo)  // true
  const _data = {
    printLogo
  }
  console.log('_data---', _data)  // { printLogo: false }
```

我们知道，JavaScript 是一门单线程的、运行至完成的语言，怎么可能会出现这种情况呢。这不禁让我怀疑 `console.log` 是异步的可能性。

所以，我 Google 了 `console.log async` 的关键词。得到这些结果：

+ [console.log() async or sync?](https://stackoverflow.com/questions/23392111/console-log-async-or-sync#)
+ [Please stop using console.log(), it’s broken…](https://hackernoon.com/please-stop-using-console-log-its-broken-b5d7d396cf15)
+ [Is Chrome's JavaScript console lazy about evaluating arrays?](https://stackoverflow.com/questions/4057440/is-chromes-javascript-console-lazy-about-evaluating-arrays)

我来引用这么一句话：

> Calling console.log when the console is not yet active only results in a reference to the object being queued, not the output the console will contain.

他们通常称这种行为为 **lazy evaluation**。

所以当我们在 Chrome 的控制台打印对象时，`console.log` 保存的是 *对象的引用*。当我们点击*展开*时，Chrome 重新取得引用地址内的内容呈现给用户。

如下图所示：

![](http://p3puylt4n.bkt.clouddn.com/console.jpg)

当我们第一次打印的时候，控制台显示 `{}`，当点击 *展开* 时，里面却有内容 `{ foo: 'bar' }`。

但由于 `console.log` 的实现并没有官方规范，所以在 `firefox` 或者 `ie` 中可能会得到不同的结果，这都不必惊慌。

所以，有时候 `console.log` 并不可靠。所以在目前，使用 `console.log` 来调试代码并非是非常好的方式，而是使用**断点**的调试方式。但有些时候，受限于环境等因素影响，除了 `console.log` 之外，没有其他更好的方式，可以采用以下处理：

```js
console.log(JSON.stringify(obj))
```