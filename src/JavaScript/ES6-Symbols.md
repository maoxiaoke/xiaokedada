# 万物皆不同 - Symbols

TODO:

- [ ] Symbols 是真的针对 *private object member* 提出的方案，还有一种说法是第三方库的冲突（增加这部分内容）。
- [ ] 对于第二种，有什么实际例子可以提供什么例子

## Symbols 是针对什么提出来的方案

即，回答为什么。

> The data type "symbol" is a primitive data type having the quality that, values of this type can be used to make object properties that are anonymous. This data type is used as the key for an object property when the property is intended to be private, for the internal use of a class or an object type. - [Symbol MDN](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)

在 Nicholas C.Zakes 的书中也表达了这样的一个观点。

> Symbols began as a way to create private object members.

在 Symbols 之前，对象的属性都可以直接访问到。为了构建私有属性，开发者通常在属性名前加 `_` 来约定该属性为对象私有。但是，我们仍然可以访问到该属性或者修改属性值。

Symbols 改变了这一切。

```js
let firstName = Symbol('xiaoke')
let person = {
    [firstName]: 'xiaoke' // 可写的 firstName symbol 属性
}
// 或者，使用 Object.defineProperties
let lastName = Symbol('mao')
Object.defineProperties(person, {
    [lastName]: {
        value: 'mao',
        writable: 'false'
    }
}) // 只读的 lastName symbol 属性
```

Symbols 的另一个用处是提供了一些 `well-known Symbol` 来实现 JavaScript 的一些协议。比如通过 `Symbol.iterator` 实现了 *iterator protocol*（我们之后学习的很多内容，都有 Symbol 的身影）。

## Symbol 属性的匿名性

正因为 Symbol 属性是匿名的。诸如 `for...in`、`Object.keys`、`Object.getOwnPropertyNames` 都无法得到 symbol 定义的属性名。

+ `for...in` 会遍历对象自身和原型链上的可枚举属性
+ `Object.keys` 只遍历对象自身的可枚举属性
+ `Object.getOwnPropertyNames` 遍历对象自身的所有属性

```js
for (let key in person) {
    console.log(key) // undefined
}
console.log(Object.keys(person)) // []
console.log(Object.getOwnPropertyNames(person)) // []
```

当然，`JSON.stringify()` 也对 Symbol 属性一无所知。

```js
console.log(JSON.stringify(person)) // "{}"
```

Instead，ES6 提供了 `Object.getOwnPropertySymbols()` 来取得 Symbol 属性。

```js
let symbols = Object.getOwnPropertySymbols(person)
console.log(symbols[0]) // "Symbol(xiaoke)"
person[symbols[0]] = 'yuer'
console.log(person[symbols[0]]) // 'yuer'
```

::: warning
很好奇是不是，本来希望通过 Symbol 给对象提供私有属性。但 `Object.getOwnPropertySymbols()` 又提供了我们访问 Symbol 属性的能力，不解。
:::

## Symbol 的特异性

在我们的所有 `Primitive types` 中，Symbol 的设计有着非常明显的刻意性。比如，得到一个 Symbol实例，`Symbol('xxx')` 是正确的，而 `new Symbol('xxx')` 则是错误的。

```js
let xiaoke = Symbol('xiaoke') // right

let xiaoke = new Symbol('xiaoke') // Uncaught TypeError: Symbol is not a constructor
```

在比如，如果我们想对 Symbol 进行强制的类型转换，这亦是不可能的。

```js
let xiaoke = Symbol('xiaoke')
    xiaokedada = xiaoke + 'dada' // Uncaught TypeError: Cannot convert a Symbol value to a string
```

::: warning
又有了一个好奇点对不对，当我们：

```js
console.log(xiaoke) // "Symbol(xiaoke)"
```

这是因为我们有一个内部抽象方法 `toString()` 和 `String()` 的效果一样。

```js
xiaoke.toString() // "Symbol(xiaoke)"
String('xiaoke') // "Symbol(xiaoke)"
```

如果是一个 *简单对象* 在进行强制类型转换的时候，会强制对 *简单对象* 进行 `toString()`：

```js
let obj = {}
let te = obj + 'dada' // "[object Object]dada"
```
但是到了 Symbol 这，它偏不。这是不是完全可以说明在设计 Symbol 时的刻意性。

:::

也就是说，对于 Symbol 而言：**一个 Symbol 的实例赋值给一个 L-value， 然后用来表明它的特异性，无他**。

最开始的这个简单例子完美地解释了上面这句话：

```js
let firstName = Symbol('xiaoke')
let person = {
    [firstName]: 'xiaoke' // 可写的 firstName symbol 属性
}
```

为了构建一个对象的私有属性，我们用 `Symbol('xiaoke')` 返回一个实例赋值给 `firstName`，并作为对象 `person` 的一个属性。也就是说，`Symbol('xiaoke')` 为对象 `person` 构建了一个独一无二的属性。

## Symbol 的额外参数

构造函数 `Symbol` 可以接收一个额外的参数，用来描述这个 Symbol 实例。这个额外的参数没有很多设计上的函数，其目的只是便于 Symbol 的调试。

## Symbol 的分类

根据 Symbol 的不同用处，可以将 Symbol 分为 Local Symbols、Global Symbol Registry 和 *Well-Known* Symbols。

### Local Symbols

我们在上面提到的大部分内容，都属于 Local Symbols。使用 `Symbol` 构造函数进行构造。

```js
let xiaoke = Symbol('xiaoke)
```

### Global Symbol Registry 和 Sharing Symbols

这种类型的 Symbols 是通过 `Symbol.for()` 来构造的。因为有些开发环境下，symbol 需要在多个 realm 共享，比如 iframe、web worker 都有自己的全局对象。Global Symbol Registry 使得生成的 Symbol 可以在多个 realm 共享。


`Symbol.for()` 首先会查询该 symbol 是否在 Global Symbol Registry 注册，如果存在，会直接使用该 symbol；否则，注册该 symbol。

```js
let xiaoke = Symbol('xiaoke')
let xiaokedada = Symbol('xiaoke')

xiaoke === xiaokedada // false

let xiaoke = Symbol.for('xiaoke')
let xiaokedada = Symbol.for('xiaoke')

xiaoke === xiaokedada // true
```

::: tip
`Symbol.keyFor()` 用来取回 Global Symbol Registry 中注册的 symbol，如果 Global Symbol Registry 没有注册，则返回 `undefined`。

```js
console.log('Symbol.keyFor(xiaokedada)') // "xiaoke"
```

:::

### Well-Known Symbols

ES6 还实现了一些内置的用于实现某些语言特性，而非提供给开发者使用的 Symbols。通过这些 *钩子*, 开发者扩展或者自定义一些语法规则。

有这么一些：

+ `Symbol.hasInstance` - 用于 instanceof 的实现
+ `Symbol.isConcatSpreadable`
+ `Symbol.iterator` 返回一个 iterator
+ `Symbol.match`、`Symbol.replace`、`Symbol.search`、`Symbol.split` - 用于 String 的 match/replace/search/split 操作。
+ `Symbol.species`
+ `Symbol.toPrimitive` - 用于对象返回 primitive 值
+ `Symbol.toStringTag` - 用于 `Object.prototype.toSting` 返回对于对象的描述
+ `Symbol.unscopables`

举些例子：`Symbol.hasInstance` 和 `Symbol.isConcatSpreadable`。

**`Symbol.hasInstance`**

ES6 重新定义了 `instanceof`。

```js
obj instanceof Array

// 等价于
Array[Symbol.hasInstance](obj)
```

比如：

```js
function CreateObj () {
    // ...
}
let obj = new CreateObj()
console.log(obj instanceof CreateObj) // true

Object.defineProperty(CreateObj, Symbol.hasInstance, {
    value: function(v) {
        return false
    }
});

console.log(obj instanceof CreateObj) // false
```

**`Symbol.isConcatSpreadable`**

Symbol.isConcatSpreadable 用于判定当使用 `Array.prototype.concat()` 方法时，对象是否会被 flattened 成数组元素。默认为 `true`。

```js
let alpha = ['a', 'b', 'c'],
    numeric = [1, 2, 3]
let alphaNumeric = alpha.concat(numeric) // ['a', 'b', 'c', 1, 2, 3]

// 使用 Symbol.isConcatSpreadable
numeric[Symbol.isConcatSpreadable] = false
alphaNumeric = alpha.concat(numeric) // ['a', 'b', 'c', [1, 2, 3] ]
```

另一个使用场景是我们可以利用 Symbol.isConcatSpreadable 对类数组的对象使用 `Array.prototype.concat()` 方法。

```js
let x = [1, 2, 3]

let fakeArray = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: 'hello',
  1: 'world'
}
x.concat(fakeArray) // [1, 2, 3, "hello", "world"]

```