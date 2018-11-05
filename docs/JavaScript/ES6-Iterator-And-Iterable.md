# 迭代数据 - Iterator 和 Iterable

TODO:

- [] WeakSet 和 WeakMap 为什么不是 iterable

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
- Iterator：类似于 *指针*。是一个特殊对象，通过它可以遍历到 Iterable 的元素。(其原因便是，Iterable 的 `[Symbol.iterator]()` 方法返回该 Iterable 的一个 Iterator)。

## 可迭代数据结构(Iterable)分类

Iterable 包含以下几类：

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

## 引入 Iterable 和 Iterator 的目的


[1] http://exploringjs.com/es6/ch_iteration.html#sec_plain-objects-not-iterable