# Generator

TODO:

- [] Generator 异常
- [] 对闭包的影响

## Overview

Generator 函数是 ES6 新引入的一类函数，该函数可以 *中断* 或 *恢复* 自身的的运行。
Generator 对象是 Generator 函数的一个实例，既是 Iterator 又是 Iterable。

```js
function* genFunc() {
  // A
  console.log('a')
  yield
  console.log('b')
}
typeof genFunc
/*
"function"
*/
const gen = genFunc() // or `const gen = new genFunc()`
gen.next()
/*
"a"
*/
gen.next()
/*
"b"
*/
```

## 如何定义 Generator

我们可以通过四种方式定义 Generator。

1. Generator 函数声明

```js
function* genFunc() { ... }
const gen = genFunc()
```

2. Generator 函数表达式

```js
const genFunc = function * () { ... }
const gen = genFunc()
```

3. Generator 方法定义

```js
const obj = {
  * genFunc() { ... }
}
const gen = obj.genFunc()
```

4. Generator 成员函数定义

```js
class genClass () {
  * genFunc () { ... }
}
const instance = new genClass()
const gen = instance.genFunc()
```

## 理解 Generator

在「异步编程」一节中，涉及到以下几点：
<!-- 
1. 回调函数的不可信，不可组合
2. 并发
3. 异步和我们的顺序思考不一致 -->

### 打破运行至完成

「运行至完成」的概念是由于 JavaScript 的单线程确定的，即 “一旦函数开始执行，在这个函数完成之前，不会有其他代码中断它”。比如：

```js
let x = 1
const foo = () => {
  x++
  console.log(x)
}
foo()
```

在上述的例子中，毫无意外，`x` 最终的结果只为 `2`。这是一个确定的答案。

但是，当我们引入 Generator 之后，「运行至完成」就不再是真理了。比如下面这例子：

```js
let x = 1
const foo = function * () {
  x++
  yield
  console.log(x)
}
const bar = () => x++

const it = foo()  // 生成一个 Iterator 来控制这个 Generator
it.next() // 启动，`x` 的值为 2。代码在第四行暂停。
bar() // 暂停 foo() 的执行，插入 bar() 的执行。 `x` 的值为 3.
it.next() // 打印 `3`
```

在上面的这个例子中，我们将 `foo` 定义为 Generator。假设 `foo()` 可以在某刻暂停(通过 `yield`)，便可以在暂停的地方运行其他的代码，即以协程(Coroutine)或者说合作(Cooperative)的方式运行代码。

有这么几点值得进一步深究：

1. Generator 的返回
2. `yield`
3. `next()` 方法

### 数据生产者 - Data Producer

在「迭代协议」一节曾提到：*迭代协议* 是构建 *数据源*(Data Source) 和 *数据消费方*(Data Consumers) 之间的桥梁。

> 一个比喻，我们可以将此行为类比成 *购买面包*。Data Source 是面包店里的面包，而 Data Cousumers 则是顾客。顾客可以在面包店里依次取用面包，直至面包售完。

而 Generator 的功能之一就是作为 Data Producer，“生产” 数据源。

```js
const func = function * () {
  yield 'a'
  yield 'b'
}
const arr = [ ...func() ] // ['a', 'b']
```

> 另一个比喻，我们可以将 Generator 类比成 *面包工*。顾客到店购买面包，购买一个，面包工生产一个，直至面包工说，“No more breads, 我们打烊了”。

`func` 仍然是个函数，遵循函数的基本准则。可以接收参数，也可以 `return`。非显式 `return` 的 Generator 返回 `undefined`。例如：

```js
const func = function * () {
  yield 'a'
  yield 'b'
}
const it = func()
it.next() // { value: 'a', done: 'false' }
it.next() // { value: 'b', done: 'false' }
it.next() // { value: undefined, done: 'false' }
```

另一点是，Generator 的返回返回 **既是 Iterator，也是 Iterable**。

```js
const func = function * () {
  yield 'a'
  yield 'b'
}
const it = func()
const er = it[Symbol.iterator]()
er[Symbol.iterator]() === er
```

### 数据消费者 - Observer

接下来将谈到 `yield` 和 `next()`。两者共同实现 Generator 作为 *数据消费者* 的层面。

在[韦氏词典](https://www.merriam-webster.com/dictionary/yield#synonym-discussion) 来理解 `yield` 所表达的含义：

+ “to give up possession of on claim or demand” - 表达屈服，让步的含义
+ “to produce or furnish as return” - 表达生产，产出的含义
+ “to be replaced by something” - 表达取代的含义

`yield` 较为准确地表达了它的意义和作用。首先，「屈服、让步、取代」都表明 Generator 运行到此处将会将执行权“转交”出去，函数在这个地方“暂停或停止”运行；

第二，「生产，产生」表明，当 `yield` 转交执行权的时候，会向外 `return` 一个结果，该结果定义为：

```ts
interface IteratorResult {
  value: any;
  done: boolean
}
```

第三，当 Generator “取回” 执行权的时，`yield` 就会发出询问：**我应该在这里插入什么？**。而这，将由 `next()` 回答。

我们举下面这个例子。

```js
const multiply = function * (a) {
  return y = a * (yield)  // A
}
const it = multiply(2)
it.next(3) // B
// { value: undefined, done: false }
it.next(4)  // C
// { value: 8, done: true }
```

当 Generator 运行到 A 处，代码在 `yield` 暂停执行，转交执行权，「生产，产生」`{ value: undefined, done: false }` 作为结果返回。当 Generator 重新取得执行权后，`yield` 将 `it.next(4)` 传入的 `4` 作为其插入值。如果 `next()` 方法没有显式地传入值，则为 `undefined`。

在 Generator “转交” 和 “取回” 执行权的，都会进行上述两个操作。当分析复杂的 Generator 函数时，牢记这两点会对分析代码逻辑很有效果。

值得注意的是，`next()` 的调用数总是会比 `yield` 多。而第一个 `next()` 总是启动 Generator，哪怕显式传入的参数也不会对 Generator 提供额外的数据。因为，这个时候并没有等待 “取回” 执行权的 `yield` 需要数据插入(代码 B 处)。

:::tip
某一层面，可以将 `yield` 视为 “运算符”，对操作数(operand)的绑定非常 “loosely”。比如：`yield a + b` 会被处理成 `yield (a + b)` 而不是 `(yield a) + b`。

另一个层面，当将 `yield` 处理成 “操作数” 时，就需要将它用括号包裹。比如：

```js
// wrong
const multiply = function * (a) {
  return y = a * yield  // Uncaught SyntaxError: Unexpected identifier
}

// right
const multiply = function * (a) {
  return y = a * (yield)
}

TODO:

- [] yield 只能用在 generator 内吗
- [] yield 在规范中的理解
```
:::

现在，回到标题 - Observer 的理解上来。**一个 Generator 在 `yield` 处暂停，直到接收到输入**。Observer 的定义如下(对于 Observer，可参考 tc39 的 [proposal-observable](https://github.com/tc39/proposal-observable))：

```ts
interface Observer {
  // 开始订阅
  start(value? : any): void,
  // 接收下一个输入
  next(value? : any) : void,
  // 结束
  complete(value? : any): void,
  // 接收到一个错误
  error(error): void
}
```

在 Generator 中，则分别是通过 `next()`、`return()` 和 `throw()` 得到实现。


### 异步编程的一些概念