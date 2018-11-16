# 迭代协议

TODO:

- [x] WeakSet 和 WeakMap 为什么不是 iterable
- [ ] iterator 既是 iterable 的目的何在
- [ ] return / throw
- [ ] infinite sequences
- [ ] 设计模式中的 iterator 模式

## Overview

我们使用 [TypeScript](http://www.typescriptlang.org/) 来描述两者：

```ts
interface Iterable {
  [Symbol.iterator]() : Iterator
}
interface Iterator {
  next() : IteratorResult
}
interface IteratorResult {
  value: any;
  done: boolean
}
```

两者的概念解释如下：

- Iterable：一种数据结构，通过 `[Symbol.iterator]()` 可获取到其内部元素。
- Iterator：类似于 *指针*。是一个特殊对象，通过它可以遍历到 iterable 的元素。(其原因便是，iterable 的 `[Symbol.iterator]()` 方法返回该 iterable 的一个 iterator)。

## 可迭代数据结构(iterable)的分类

iterable 包含以下几类：

+ Array 和 Typed Array
+ String
+ Map
+ Set
+ arguments
+ DOM 数据结构

下面依次介绍：

### Array 和 Typed Array

在 JavaScript 中，Array 是一种特殊的对象。我们可以通过 `Array.isArray()` 来判定一个对象是不是数组。

```js
let arr = ['a', 'b']
Array.isArray(arr) // true

for (const i of arr) {
  console.log(i)
}
// 'a'
// 'b'
```

### String

String 是 JavaScript 中的一个不可变数据类型。而且我们知道，针对 String 类型的很多操作，会将其包装成 Object，这也是字符串可以成为 iterable 的一个原因。

```js
for (const i of 'abc') {
  console.log(i)
}
// 'a'
// 'b'
// 'c'
```

### Map

Map 是一系列 `[key, value]` 组合。Map 的迭代顺序是确定的，即 `[key, value]` 被添加的顺序。

```js
const m = new Map().set('a', 1).set('b', 2)
for (const i of m) {
  console.log(i)
}
// ['a', 1]
// ['b', 2]
```

WeakMap 不是 iterable。

### Set

类似 Map，Set 也是 iterable。

```js
const s = new Set().add('a').add('b')
for (const i of s) {
  console.log(i)
}
// 'a'
// 'b'
```

WeakSet 不是 iterable。

### arguments

变量 arguments 是特殊的，虽然在 ES6 中建议使用 rest 参数替代，但 arguments 也是个 iterable。

```js
function arg() {
  for (const i of arguments) {
    console.log(arguments)
  }
}
arg('a', 'b')
// 'a'
// 'b'
```

### DOM 数据结构

```js
for (const i of document.querySelectorAll('div')) {
  console.log(i)
}
```

### entries()、keys() 和 values()

并非所有的 iterable 都来自 *数据结构*。Arrays、TypedArrays、Maps 和 Sets 都有三个 ES6 方法来返回 iterable。

+ `entries()`
+ `keys()`
+ `values()`

```js
const arr = ['a', 'b', 'c']
for (const pair of arr.entries()) {
  console.log(pair)
}
/*
[0, 'a']
[1, 'b']
[2, 'c']
*/
```

ES6 还专为简单对象提供了 `Object.entries(obj)`、`Object.keys(obj)` 和 `Object.values()` 来返回 iterable。

```js
const obj = { a: '1', b: '2' }
for (const pair of Object.entries(obj)) {
  console.log(pair)
}
/*
['a', '1']
['b', '2 ']
*/
```

## 简单对象不是可迭代数据结构

### 什么是简单对象

通过字面量或 `new Object()` 构建的对象，即为 *简单对象*。

```js
const obj1 = { a: 1 }
cosnt obj2 = new Object()
```

简单对象可以使用 [lodash](https://lodash.com/) 的 [`_.isPlainObject()`](https://lodash.com/docs/4.17.10#isPlainObject) 函数来判定。亦可以使用 [Redux](https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.js) 提供的方法。但两者对简单对象的定义并非一致。

```js
// From Redux: https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.js
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export default function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
```

### 简单对象不是 iterable

在 JavaScript 中，简单对象不是 iterable。这是规范默认的一种行为，是从这个方面考虑的：

1. JavaScript 中的对象涵盖广泛，当你试图迭代一个对象的所有属性的时候，这似乎办不到。

  可以使用 `Object.getOwnPropertyNames()` 获取对象的*字符串*属性，对于 *Symbol* 属性，提供了是 `Object.getOwnPropertySymbols()`；对于是否需要迭代继承属性，这也会变成无休止的争论。

2. 如果试图迭代一个简单对象，这将分裂你的代码
  当迭代一个简单对象时，这将赋予简单对象“数据结构”的属性(也就是说将对象转变为一种数据结构)。但对象是属于 *程序级*(Program Level) 的<sup>[1]</sup>，这就会混合 Program Level 和 *数据*(Data Level)，从而割裂了你的代码。

3. 当实施 `Object.create(null)` 时
  若试图给简单对象添加 `Object.prototype[Symbol.iterator]()` 方法，对于通过 `Object.create(null)` 构建的简单对象，会被作为特例存在。

综上，当你想要将简单对象作为一类数据结构使用的话，使用 ES6 的 Map 是一种更合理的方式。

### WeakMap 和 WeakSet 不是 iterable

`WeakMap` 和 `WeakSet` 都是「弱引用」元素。你无法获知 `WeakMap` 或 `WeakSet` 的全貌。因此，也不是 iterable。

## 实施 Iteration Protocol 的操作

在 ES6 中，有些方法默认采用 *迭代协议*(即 iterator 协议和 iterable 协议的统称，Iteration protocol)。分别有：

+ `for...of`
+ `Array.from`
+ spread 运算符
+ Array 的解构
+ Maps 和 Sets 的构造函数
+ `Promise.all()`、`Promise.race()`
+ `yield*`

### for...of

```js
for (const iter of iterable) {
  ...
}
```

陷阱：`for...of` 只能迭代 iterable。

```js
const arrayLike = { length: 2, 0: 'a', 1: 'b' }
for (const iter of arrayLike) {
  ...
}
// TypeError
```

### Array.from

`Array.from` 可以从类数组和 iterable 得到一个 *浅拷贝* 数组。

```js
const arrayLike = { length: 2, 0: 'a', 1: 'b' }
Array.from(arrayLike)
// ['a', 'b']

const str = 'abc'
Array.from(str)
// ['a', 'b', 'c']
```

### spread 运算符

```js
Math.max(...[-1, 8, 3])
// 8
```

### Maps 和 Sets 的构造函数

```js
const map = new map(['a': 1], ['b': 2])
```

### Promise.all() 和 Promise.race()

若你理解 `Promise` 的话，你就应该知道 `Promise.all()` 和 `Promise.race()` 都采用了迭代协议。

### yield*

我们将在 `Generator` 一节提到这个。

## 通过 iterator 实现「非常规」的 iterable

*迭代协议* 的具体实施如下图：

![](http://p3puylt4n.bkt.clouddn.com/iteration_protocol.jpg)

可迭代数据结构(iterable)会有一个(自身的，或者继承来的)方法：`Symbol.iterator`。该方法返回一个 iterator。iterator 通过自身的 `next()` 方法迭代 iterator 的元素。

## 覆盖默认的 Symbol.iterator 方法

我们可以通过覆盖 iterable 原生的 `Symbol.iterator` 方法，来了解一下 `next()` 的工作机制。

> 「覆盖」一词并不准确。

```js
const iter = [...'xiao']
iter[Symbol.iterator] =  function () {
  let step = 0
  return {
    next() {
      const value = iter[step]
      step++
      const done = step > iter.length
      return { value, done }
    }
  }
}
```

`next()` 返回一个包含 `value` 和 `done` 两个属性的对象。

+ `value` - 当前项。若 `done` 为 `true`，当前项和之后的项会被忽略。
+ `done` - 布尔值标记，没有更多可返回的数据时返回 `true`

```js
const iterator = iter[Symbol.iterator]()
iterator.next() // { value: 'x', done: false }  (1)
iterator.next() // { value: 'i', done: false }  (2)
iterator.next() // { value: 'a', done: false }  (3)
iterator.next() // { value: 'o', done: false }  (4)
iterator.next() // { value: undefined, done: true } (5)
```

### 可以省略的 value: undefined 和 done: false

`value: undefined` 和 `done: false` 都是可以省略的，当我们看到没有返回 `value` 或 `done` 属性的情况，一定要把这一点记在心里。

```js
const iterable = {
  [Symbol.iterator]() {
    let step = 0
    return {
      next() {
        if (step <= 2) {
          step++
        }
        switch (step) {
          case 1:
            return { value: 'x' }
          case 2:
            return { done: true }
        }
      }
    }
  }
}

for (const iter of iterable) {
  console.log(iter)
}
/*
'x'
*/
```

## 既是 iterator 又是 iterable

我们可以实现一个既是 iterator 又是 iterable 的复杂对象。

```js
function iterateOver (...args) {
  let index = 0
  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      if (index < args.length) {
        return { value: args[index++] }
      } else {
        return { done: true }
      }
    }
  }
}
```

这实际上是一个非常常见的模式。ES6 很多内建的 iterator 都遵循这一模式。比如：

```js
const arr = []
const iter = arr[Symbol.iterator]()]
iter[Symbol.iterator]() === iter
/*
true
*/

iterator.__proto__.__proto__
/*
Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
*/
```

上例中，`iter` 是一个 iterator，但同时也是一个 iterable。通过其原型，赋予了其 `[Symbol.iterator]` 的能力。

### 目的何在

## 引入迭代协议的目的

在这里，我们将重新审视「引入迭代协议的目的」。首先，为了向后兼容，`forEach`、`for...in` 等迭代的方式并没有采用 ES6 的 *迭代协议*；其次，也是因为新引入了 Symbol，才让 *迭代协议* 大放异彩。

ES6 如此坚持地引入 *迭代协议*，我觉得有以下理由：

#### 从数据的角度

正如在「简单对象不是不是 iterator」的思考中，我们从 *数据* 和 *程序* 两个层次来分析这样设计的合理性：**迭代协议是从数据的角度，为数据结构提供的一种迭代方式**。

对于我们的 Iterator 接口(Interface Iterator)，其有一个 *数据源*(Data Source) 和 一个 *数据消费方*(Data Consumers)。而 *迭代协议* 便是建立在两者之间的桥梁。

![](http://p3puylt4n.bkt.clouddn.com/consumers_sources.jpg)

+ Data Source(or Data Producer) - 诸如 String、Array、Map、Set 这样的数据结构作为数据源(即 Iterable)，拥有 `[Symbol.iterator ]` 方法，供迭代协议使用。
+ Data Consumers - 诸如 `for...of`、spread operator 等 API，使用 Iterator 获取需要消费的数据。

#### 从 iterator 模式的角度看

在经典的「设计模式」<sup>2</sup>中，iterator 模式(迭代器模式) 是一种 *对象行为型模式的一种*。用来提供一种方法顺序访问一个集合对象(collections)中各个元素，而不用暴露其内部结构。

这种设计模式的关键思想是：**将对集合的迭代从集合中分离出来，并放入 iterator 对象中**。

另外，iterator 和集合是 **耦合** 的，其实现又是 **抽象** 的。表现在：

1. 为迭代不同的数据结构提供了一个统一的接口 (即，支持多态)

2. 支持对单一集合的多种迭代方式(即，实现具体子类 Iterator)

3. 在同一集合上可以有多个遍历。

ES6 中的 iterator 支持上述的 (1)、(2) 两种情况。在具体实现上，ES6 权衡了以下问题：

1. 谁来控制迭代

当由使用者来控制迭代时，该迭代器就称为 external iterator；当由迭代器控制迭代时，该迭代器称为 internal iterator。在 ES6 中，iterator 支持这两类 iterator。

```js
// internal iterator
const arr = ['a', 'b']
for (const iter of arr) {
  ...
}

// external iterator
const arr = ['a', 'b']
const iterator = arr[Symbol.iterator]()
iterator.next()
iterator.next()
iterator.next()
```

使用 external iterator 时，使用者必须主动推进迭代器的进程，显式地想迭代器请求下一个元素；而使用 internal iterator，使用者只需提供一个待执行的操作即可(比如，`for...of`)，iterator 即对集合内每个元素执行该操作。

2. 谁来定义遍历算法

集合本身可以定义迭代算法，并在遍历过程中用 iterator 存储当前迭代的状态。这样的 iterator 只是一个 cursor(游标)，仅用来指示当前的状态。使用的时候，这个 cursor 可以作为一个参数调用集合的 `next()` 方法。

iterator 本身可以定义迭代算法。这样，我们就可以满足最开始提到的两点：(1) 为迭代不同的数据结构提供了一个统一的接口；(2) 支持对单一集合的多种迭代方式。但同时，iterator 就会访问集合内的变量(有时候可能是私有的)，这样就会破坏集合的封装性。

ES6 中的 iterator 本身定义了迭代算法。

3. 迭代器的健壮性考量

在迭代一个集合元素的同时更改这个集合是危险的。如果在遍历集合的时候增加或删除聚合元素，可能会导致两次访问同一个元素或者遗漏某个元素。一个简单的临时解决方案是拷贝该集合，然后对该拷贝进行迭代，但一般来说，这样的行为代价太高。

TODO:

- [ ] ES6 如何处理以及例子？无限 sequence?

4. 空迭代器

空迭代器(NullIterator) 是一个退化的 iterator，它可以用来处理边界条件。根据定义，空迭代器总是已经完成了遍历：即，它的 `done` 值总是 `true`。

TODO:

- [ ] ES6 空迭代器的例子

在「设计模式」<sup>2</sup>还涉及到其他一些问题的权衡，这有助于我们去理解 ES6 中 *迭代协议* 的设计。「这即是万物理论」。

#### 一个 “比喻”

## 文献

[1] http://exploringjs.com/es6/ch_iteration.html#sec_plain-objects-not-iterable

[2] Design Patterns - Elements of Reusable Object-Oriented Software