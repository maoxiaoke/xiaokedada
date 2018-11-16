# Generator

TODO:

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

### 异步编程的一些概念