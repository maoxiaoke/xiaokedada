# JavaScript Promise 迷你书（中译本）

思考一个问题：Promise 适合什么、不适合什么？Promise 是万能的吗？

## 规范中心

1. [ECMAScript 6 Promises]()
2. [Promises/A+](https://promisesaplus.com/)
3. [w3ctag/promises-guide](https://github.com/w3ctag/promises-guide)

## 什么是 Promise

Promise 是抽象异步处理对象以及对其进行各种操作的组件。

Promise 最初被提出是 `E` 语言。

Node.js 中回调函数的一个例子：

```js
getAsync('fileA', function(error, result){
  if (error) {
    throw error
  }
  // Do something
})
```

这是一种错误先行的策略。

但是作者认为: 这个写法虽然很明了，但这仅仅是一个编码规约而已，即使采用其他的方法也不会出错。 而 Promise 则是把类似的异步处理对象和处理规则进行规范化，并按照采用统一的接口来编写，而采取规定方法之外的写法都会出错。

---

## Promise API

### Constructor - 实例化

```js
let promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后调用 resolve 或 reject
})
```

### Instance Method

#### then()

```js
promise.then(onFulfilled, onRejected)
```

`resolve`(成功)时：

  回调函数 `onFulfilled` 会被调用

`reject`(失败时)：

  回调函数 `onRejected` 会被调用

promise chain 传递参数，例子：

```js
let promise = Promise.resolve(1)
promise
  .then(val => val + 1)
  .then(val => val * 2)
  .then(val => {
    console.log(val) })
  .catch(e => {
    console.log(e)
  })
```

`return` 的值可以是字符串或者数值类型，对象或者 promise。

> `return` 的值会由 `Promise.resolve(返回值)` 进行一层包装处理，因此不管回调函数中会返回一个什么样的值，最终 then 的结果都是返回一个新创建的 promise 对象。

#### catch()

`catch()` 方法只是 `promise.then(undefined, onRejected)` 的一个别名而已。

:::warning
**每次调用 `then` 和 `catch` 都会返回一个新创建的 promise 对象**
:::

### Static Method

#### Promise.resolve()

一般情况下我们可以使用 new Promise() 来创建 promise 对象，还可以使用 `Promise.resolve()` 和 `Promise.reject()`。

比如： `Promise.resolve(42)`，可以认为是以下代码的语法糖：

```js
new Promise((resolve, rejecte) => {
  resolve(42)
})
```

`Promise.resolve()` 方法的另一个作用是将 [`thenable`](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md#thenable-duck-typing) 对象转换为 promise 对象。

> 这种将 thenable 对象转换为 promise 对象的机制要求 thenable 对象所拥有的 then 方法应该和 promise 所拥有的 then 方法具有同样的功能和处理过程。

比如 [`jQuery.ajax()`](https://api.jquery.com/jQuery.ajax/) 的返回值是 [`jqXHR Object`](http://api.jquery.com/jQuery.ajax/#jqXHR) 对象，这个对象具有 `.then` 方法。这个 `thenable` 可以使用 `Promise.resolve()` 来转换为一个 promise 对象。

```js
let promise = Promise.resolve($.ajax('/json/comment.json'))
```

> 应当注意的是，即使有一个对象具有 `then` 方法，也不一定就能作为 Promises 对象使用。

::: tip
简单总结一下的话，可以认为它的作用就是将传递给它的参数 Fulfilled 到 promise 对象后并返回这个 promise 对象。
:::

#### Promise.reject()

`Promise.reject()` 正好是 `Promise.resolve()` 的对立。在编写测试代码或者进行 debug 的时候，也许用得上。

#### Promise.all()

`Promise.all` 接收一个 promise 对象的数组作为参数，当这个数组里所有 promise 对象全部变为 Fulfilled 或 Rejected 状态的时候，它才会调用 `.then` 方法。

#### Promise.race()

与 `Promise.all` 相对的是，`Promise.race` Fulfilled 或 Rejected，才会进行后面的处理。

::: warning
需要注意的是，`Promise.race` 在第一个 promise 对象变成 Fulfilled 时候，并不会取消其他 promise 对象的执行。理解起来也很简单，当 promise 的状态从 Pending 开始转化时，最终会进入 Fulfilled 或 Rejected 的状态之一。

所以得到 Promise 一个不适用的场景：不适用于状态可能会固定不变的处理。
:::


---

## Promise 的状态


用 `new Promise` 实例化的 `promise` 对象有以下三个状态：

+ "has-resolution" - Fulfilled

完成状态，此时会调用 `onFulfilled`

+ "has-rejection" - Rejected

拒绝状态，此时会调用 `onRejected`

+ "unresolved" - Pending

promise 对象刚被创建后的初始化状态

> 左侧是 ES6 Promises 规范中的术语，右侧则是 Promises/A+ 中描述状态的术语

对于状态的解释主要有以下几点：

1. promise 对象的状态，从 Pending 装换为 Fullfilled 或 Rejected 对象的状态之后就不会再发生变化 - **完成即不变**
2. 由于第一点，所以 `then()` 后执行的函数可以肯定地说只会被调用一次
3. Fulfilled 和 Rejected 这两个中的任一状态都可以表示 Settled。

---

## Promise 的异步性

`then` 中指定的方法调用都是异步进行的。

可能存有疑惑的时，当 `Promise.resove(value)` 等方法解析“立即值”的时，`Promise` 对象能立即进入 Fullfilled 状态或 Rejected 状态，那为啥 `then` 里指定的方法不是同步调用的呢？

这其实是 `Promise` 的一个设计规范 - 解决异步同步调用同时存在所产生的混乱问题。

```js
function onReady(fn) {
  const readyState = document.readyState;
  if (readyState === 'interactive' || readyState === 'complete') {
    fn()
  } else {
    window.addEventListener('DOMContentLoaded', fn) }
}
onReady(function () {
  console.log('DOM fully loaded and parsed')
})
console.log('==Starting==');
```

上面这个函数，根据 DOM 是否装载完毕来决定是否对回调函数进行同步还是异步调用，这就造成同步异步产生混乱的问题。

为此，我们可以采用 `setTimeout(fn(), 0)` 进行 **同步异步化**。

```js
function onReady(fn) {
  const readyState = document.readyState;
  if (readyState === 'interactive' || readyState === 'complete') {
    setTimeout(fn(), 0)
  } else {
    window.addEventListener('DOMContentLoaded', fn) }
}
onReady(function () {
  console.log('DOM fully loaded and parsed')
})
console.log('==Starting==');
```

---

## then 或 catch

在[前面](#catch())我们提到过：

> `catch()` 方法只是 `promise.then(undefined, onRejected)` 的一个别名而已。

所以，对于错误处理，我们可以采用两种方式：

1. `promise.then(onFulfilled, onRejected)` 指定对错误函数的处理
2. 使用 `promise.catch()`

下面是两者的异同：

```js
function throwError (val) {
  throw new Error(val)
}

// then 方式
Promise.resolve(42).then(throwError, () => {
  console.log('then 方式')
})
// error: Uncaught (in promise) Error: 42 at throwError (<anonymous>:2:9)

// catch 方式
Promise.resolve(42).then(throwError).catch(() => { console.log('catch 方式')
})
// 'catch 方式'
```

也就是说，当使用 `then`方式 捕获错误的时候，**实际上不能捕获第一个参数 `onFulfilled` 指定的函数**，它针对的是自身的 promise 对象或者之前的 promise 对象。

而 `catch` 方式，则遵循了 `throwError` -> `onRejected` 的方式。

所以，`catch` 方式是最佳实践。

下面都是[我](https://github.com/maoxiaoke) 加的内容。

## 返回 Promise 的函数

比如下面的这个函数：

```js
function aPromise () {
  return Promise.resolve(1)
  .then(res => {                      // Task 1
    return 2
  })
  .catch(e => { console.error(e)})   // Catch 2
}
let bPromise = aPromise()
aPromise().then(res => { console.log (res)}).catch(e => { console.error(e.message)})
```

`aPromise()` 返回的一个 Promise，对于 `bPromise` 而言，是函数 `aPromise()` 最终的 `resolve` 或 `reject` 的值(即 Task 1 的完成值)。

在标识一个 Promise 时，通常是一个这样的方式：

```
[[PromiseStatus]]: "resolved"
[[PromiseValue]]: undefined
```

即两个内部属性 `[PromiseStatus]]` 和 `[[PromiseValue]]`。对于每个 Promise 的分析都可以采用这样的结构方式。上例的 `bPromise` 的 `[[PromiseStatus]]` 应该是 `"resolved"`，而 `[[PromiseValue]]` 是 `2`。

对于很多类似的问题，都可以采用这种思考方式。

## catch() 之后的 then()

一般来说，我们将 `catch()` 放在 `then()` 链的最后，以便 *捕获链上的任何错误*。

但是仍可以有 `then().catch().then().catch()` 这样的链方式。

```js
function aPromise () {
  return Promise.resolve(1)
  .then(res => {
    throw 'error'
  })                        // Task 1
  .catch(e => { console.error(e)}) // Catch 1
  .then(() => { Promise.resolve(2)})  // Task 2
  .catch(e => { console.error(e)})  // Catch 2
}
```

执行顺序是，就算 Catch 1 捕获到 Task 1 的错误，Task 2 仍然执行。Catch 2 只能捕获 Task 2 的错误；Task 1 的错误由 Catch 1 捕获。


## 使用 reduce() 顺序执行 promise

`Array.prototype.reduce()` 是一个非常函数化的方法，其语义化为：通过在循环时将结果存储在累加器(accumulator)中，从而把一堆东西减少(reduce)为一个。

比如，有一批挨个处理的数据，当其顺序执行到最后一个都返回 Fulfilled 时，执行成功；其中有一个返回 Rejected 时， 执行失败。

```js
let tasks = [1,2,3]

function methodThatReturnsAPromise () {
    return Promise.resolve(true)
}
tasks.reduce((previousPromise, nextID) => {
  return previousPromise.then(() => {
    return methodThatReturnsAPromise(nextID);
  });
}, Promise.resolve());
```

倘若使用 `async/await` 语法。可以更为直接一点：

```js
let tasks = [1,2,3]
tasks.reduce(async (previousPromise, nextID) => {
  await previousPromise
  return methodThatReturnsAPromise(nextID);
}, Promise.resolve())
```

::: warning
相较于 `Promise.all([ task1, task2, task3 ])`，两者是有区别的。
+ 其一，`Promise.all([ task1, task2, task3 ])` 是同时开始，并行执行的。而采用 `reduce()` 方法的是顺序执行的。
+ 其二，`Promise.all([ task1, task2, task3 ])` 适合 tasks 长度短且 task 不相似的情况。
:::

我们还可以思考一下变种：

```js
let tasks = [1,2,3]
let promise = Promise.resolve();
for (const nextID of tasks) {
  promise = promise.then(() => methodThatReturnsAPromise(nextID));
}
```

实际上这种方式并不能达到我们的要求，因为 `for...in` 总是同步进行的。实际上上述代码的运行情况如下：

```js
let tasks = [1,2,3]
let promise = Promise.resolve()

// loop 1
promise = promise.then(() => methodThatReturnsAPromise(1))
// loop 2
promise = promise.then(() => methodThatReturnsAPromise(2))
// loop 3
promise = promise.then(() => methodThatReturnsAPromise(3))
```

如果你对[轮询机制](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) 比较了解的话，最终的结果应该是最后完成的 resolve 或 reject。

对于上述的变种，如下：

```js
async function handleSequencePromise () {
  for (const nextID of tasks) {
    try {
      await promiseReturningMethod(nextID)
    } catch () {
      return
    }
  }
}
```

## new Promise (reslove) 和 Promise.reslove() 的区别

正如在上面提到的。我们可以认为 `Promise.resolve(42)`，是下列代码的语法糖：

```js
new Promise((resolve, reject) => {
  resolve(42)
})

```

但两者表达试图表达的含义并非一致。

`Promise.resolve()` 创建的是一个已经 resolved 的 promise，而 `new Promise(resolve)` 除了可以创建已经 resolved 或 rejected 的 promise (如果是这类情况，实际上跟 Promise.resolve() 和 Promise.reject() 的表现并无二致)，还可以创建处于 Pending 状态的 promise (这一点才是 new Promise(reslove) 真正发挥实力的地方)。

下面的例子中，会使用 `setTimeout()` 来模拟一个异步函数。

```js
function delay (ms) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('DONE') }, ms)
  })
}
const x = delay(10000)
/*
在 10s 之前， `x` 的状态为：
[[PromiseStatus]]: "pending"
[[PromiseValue]]: undefined

10s 之后，`x` 的状态为：
[[PromiseStatus]]: "resolved"
[[PromiseValue]]: "DONE"
*/
```

## Promise 和差错控制

### 基于 Promise 的函数不该 throw 异常

我们知道，`throw` 是 JavaScript 主动抛出异常的一种方式。比如，我们用在 Promise 当中：

```js
// 使用 `throw` 抛出错误
Promise.resolve()
.then(() => {
  throw new Error('error')
})
.catch(e => console.log(e))
// "error"

// 使用 reject 方式
Promise.resolve()
.then(() => {
  Promise.reject('error')
})
.catch(e => console.log(e))
// "error"
```

看上去两者似乎表现一致，但 `throw` 是**同步**抛出错误，最终被 catch 捕获；而 `reject` 是将该 Promise 的 `[[PromiseStatus]]` 置为 `rejected`，是一种异步行为。


为什么用 `reject` 而不是 `throw` ?

## resolve 是什么

## Promise 结合 setTimeout()

## 返回 Promise 链的函数

如何？？？

文章有参考：

+ [Why Using reduce() to Sequentially Resolve Promises Works](https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/)
+ [Back to Basics: Running Promises in Serial with Array.reduce()](https://decembersoft.com/posts/promises-in-serial-with-array-reduce/)
+ [promise-reduce的一个库](https://github.com/yoshuawuyts/promise-reduce/blob/master/index.js#L21:42)

TODO:

- [] Difference between returning a promise vs returning undefined inside a promise
- [] JavaScript Promises - reject vs. throw
- [] new Promise 没有 return，却有返回
- [] try...catch/ 差错控制