# Functional JavaScript

> by Michael Fogus
>
## What is Functional Programming

Functional programming is the use of functions that transform values into units of abstraction, subsequently used to build software systems.

> 函数式编程是将**值转换为抽象单元**的一种函数使用方式，随后用来构建软件系统
> 
### 以函数为抽象单元

实现抽象的一种方式是：函数隐藏了实现细节。这种抽象函数的好处在于：

Make it run, the make it right, then make it fast

> by Kent Beck
> 
举个栗子，函数 parseInteger() 期待一个字符串作为解析输入。

```js
function parseInteger (str) {
  if (!_.isString(str)) throw new Error("Expecting a string")
  let a = parseInt(str, 10)
  if (_.isNaN(a)) {
    console.log(["Could not parse string:", str].join(' '))
    a = 0
  }
  return a
}
```
上述这个栗子，能比较完整地表达我们的意图：对传入的字符串进行解析。但是我们进一步思考，如果我们想修改输出的信息，就需要修改对应的代码行。

一个较好的方式是：将错误、信息和警告**抽象**成不同的函数：

```js
function fail (msg) {
 throw new Error (msg)
}
function warn (msg) {
  console.log(["WARNING:", msg].join(' '))
}
```

通过上述抽象函数，我们将栗子改写成：

```js
function parseInteger (str) {
  if (!_.isString(str)) fail("Expecting a string")
  let a = parseInt(str, 10)
  if (_.isNaN(a)) {
    warn(["Could note parse string:", str].join(' '))
    a = 0
  }
  return a
}
```

我们将错误和警告进行抽象化了，在调用时只需传入对应的参数，而不用考虑函数的具体实施，这就是一种数据抽象。这种抽象的好处在于，当修改进行时，我们只需要修改对应的抽象函数。

```js
function warn (msg) {
  alert(["WARNING:", msg].join(' '))
}
```

**行为包含在单一的函数中，因此一个函数可以被多个新函数提供相似或不同行为的函数所取代**。

### 以函数为行为单元

隐藏数据和行为是函数成为抽象单元的一种方式，另一种是**提供简单的方式来存储和传递基本行为的离散单元**。

下面的栗子可能不那么好。通常情况下，我们使用`[]`进行数组的索引。现在我们对这种索引方式进行*抽象*。

```js
function nth (arr, index) {
  return arr[index]
}
```

为了使得函数更为可靠，提供一个判断 `arr` 是否是数组或字符串的函数抽象。

```js
function isIndexed (data) {
  return _.isArray(data) || _.isString(data)
}
```

则 `nth()` 的实现如下：

```js
function nth (arr, index) {
  if (!_.isNumber (index)) fail("Expected a number as a index")
  if (!isIndexed (arr)) fail('Not supported on non-indexed type')
  if ((index < 0) || (index > a.length - 1))
    fail("Index value is out of bounds")
  return a[index]
}
```

----

## Why Functional Programming

The major evolution that is still going on for me is towards a more functional programming style, which involves unlearning a lot of old habits, and backing away from some OOP directions.

> 对我来说，主要的演变仍是朝着一种更为函数式的风格发展，这意味着移除很多旧的习惯，并且远离一些 OOP 的方向 -- John Carmack
> 
### Difference between Functional Programming and OOP

> 我的理解：OOP 编程范式使用封装、继承和多态三要素(使用这三者来解释 OOP 对于理解 OOP 完全没有任何帮助)。单就封装而言，指的是将一个对象*使用 class 进行包装一些属于它一类的属性和方法*(就是说，对 OOP 而言，世间万物可以抽象成一些自我属性和所能执行的操作的个体，就是实例)。
> 
未完待续

### JavaScrpt's Multiple Paradigms

JavaScript 并不是严格的 functional programming 语言，所以也支持多类编程范式。

#### Imperative programming -- 命令式编程

命令式编程是通过细致的完全的代码来实现算法的细节。

> OOP 也属于 imperative programming ？

下面是一个数瓶子的算法，采用命令式编程。

```js
let lyrics = []
for (let bottles = 99; bottles > 0; --bottles) {
 if (bottles > 1){
   lyrics.push (bottles + 'bottles of beer')
   lyrics.push ('Take One down and pass it')
 }
 else {
   lyrics.push ('No more beer!')
 }
}
```

上面就是命令式编程的一个例子，缺点很明显：**一次性操作，很难重用**。

----

## 函数是一等公民

一等的意思就是 “something is just a value”。即在 JavaScript 中，函数类似于值。可以保存在变量中，作为数组的一个元素，作为对象的方法，可随时被创建，能够被当做参数传递，或者返回。

```js
let firstClass = function() { return 'yuer' }
let firstClassArray = ['xiaoke', function() { return 'yuer'}]
let firstClassObj = { name: 'xiaoke', fun: function() { return 'yuer'}}
42 + (function() { return 42}) // 利用 IIFE 
function weridAdd(n, f) { return n + f() }
function foo () {
  return function () {
    return 42
  }
}
```

### Applicative Programming

Applicative Programming 的定义：**函数 A 作为参数提供给函数 B 调用**。这是函数式编程处理函数的一个非常窄的方面，`map`、`reduce` 和 `filter` 便是三个非常典型的例子。

#### 集合中心化编程 Collection-Centric Programming

三个典型例子的典型特点是，**接收一个数组集合**。但这对**键/值对集合**仍然适用。函数式编程对这类操作集合中元素的任务非常有用。

### 高阶函数 -- High Order Functions

满足以下条件之一的函数，即为“高阶函数”的定义：

- 以一个函数作为参数
- 返回一个函数作为结果

在涉及到高阶函数的时候，需要提到一个老生常谈的概念 -- 闭包。闭包和一等公民函数是齐头并进的，**虽然不支持一等公民函数身份的语言也支持闭包**(这里请举出具体例子！)。但因为有了一等公民函数，所以闭包在 JavaScript 简直无处不在。

> 此书的作者是这样定义闭包的：In a sentence, a closure is a function that captures the external bindings (i.e., not its own arguments) contained in the scope in which it was defined for later use (even after that scope has completed). -- 不强调说法的正确性，闭包是一个函数的说法也值得讨论。

在下面这个例子中，返回一个函数作为结果

```js
function makeAdder (CAPTURED) {
  return function (free) {
    return free + CAPTURED
  }
}
let add10 = makeAdder(10)
let add10(5) // 15
```

一个函数包含内部函数，则内部函数都可以访问外部函数定义的变量，并进行捕获，甚至通过 `return` 来逃脱外部函数，这些变量，称之为“free variables”；访问、捕获或帮助自由变量逃脱的函数，就称之为“捕获函数”(例子中，即匿名函数)； 存在于函数内部，但不是局部声明的变量，称之为“capture variables”(比如传入的 CAPTURED )。

一个问题是，捕获变量通常是**暴露**在外的，从而较大的风险。

```js
function showObj (obj) {
  return function() {  // 这种为了返回闭包而另外包裹一层，是否值得考虑？
    return obj   
  }
}
let o = { name: 'yuer' }
let showo = showObj (o)
showo() // { name: 'yuer' }
o.newProperty = 'age'
showo() // { name: 'yuer', newProperty: 'age' }
```

为了尽可能地减少暴露捕获变量的风险，通常使用以下的方式，将捕获的变量作为私有变量。

```js
let privateCap = (function() {
  let PRIVATE = 0
  return {
    inc: function (n) {
      return PRIVATE + n
    },
    dec: function (n) {
      return PRIVATE - n
    }
  }
})
```

#### 接收函数作为参数的高阶函数

典型的 `map`、`reduce` 和 `filter` 都可以接收一个函数作为参数。让我们再深入思考一下。

*使用函数，而不是值* - 函数是 Functional Programming 的精髓，所以这句话有一定意义。

比如，我们设计一个将一个值复制多次的函数：

```js
function repeat (times, value) {
  return _.map(_.range(times), () => value)
}
```

上面的这个例子中，我们遍历数组中的元素，并传递被复制的值。这个例子中，是以 *值* 为主导的设计。**一个函数将一个值重复多次是可以的，但是重复计算次数的函数则更好。**

```js
function repeatedly (times, fun) {
  return _.map(_.range(times), fun)
}
repeatedly(5, () => 'a')
repeatedly(4, () => Math.floor(Math.random()* 10) + 1)
```

`repeatedly()` 的长处在于：除了可以将一个值复制多次，还扩展了其他无限可能。

#### 返回其他函数的高阶函数

一个非常简单的例子：

```js
function always (value) {
  return function () {
    return value
  }
}
```

这几乎成了函数式编程的一种范式(pattern) -- 返回一个固定的常量。但需要注意的是，返回其他函数的高阶函数通常和闭包揉和在一起，闭包返回的函数是独一的，内部闭包的捕获也是唯一的。

```js
let f = always(function(){})
f() === f() // true

let g = always(function(){})
f() === g() //false
```

使用返回其他函数的高阶函数的一个用处在于：**传入高阶函数的参数可以用来配置返回的函数**。我们最开始的那个例子。

```js
let add100 = makeAdder(100)
add100(50)
```

> 传入的值 `100` 可以用来*配置*返回的函数 `add100`

---

## 将函数和函数组合起来

将函数和函数组合起来的精髓在于：: using existing parts in well-known ways to build up new behaviors that can later serve as behaviors themselves.(以一种众所周知的方式使用已经存在的部分来建立新的行为，并能在之后亦能作为行为所服务)

> 有点难懂？我们先来介绍将函数和函数组合起来的一种方法 - 柯里化

### 柯里化 -- Currying

柯里化 - **为函数接收的每一个参数返回一个函数**

对于传统的写法，函数 `fun(a,b,c)` 会全部接受所有参数。然而，柯里化会逐个为 a, b 和 c 返回一个函数。

![currying](http://p3puylt4n.bkt.clouddn.com/currying.png)

和之前提到的 *配置* 函数非常类似，柯里化逐个进行配置函数，直到每个参数都覆盖到。

#### 向左柯里化还是向右柯里化

```js
function leftCurryDiv (n) {
  return function (d) {
    return n / d
  }
}

function rightCurryDiv (d) {
  return function (n) {
    return n / d
  }
}
```

目前的建议是使用向左柯里化，即右边的参数逐个往左边进行。有一个比较重要的原因是 JavaScript 不对函数参数的数目进行限制。这对于从左往右的 partial application (部分编程) 是有关系的。

#### 自动柯里化参数

前面 `leftCurryDiv()` 和 `rightCurryDiv()` 的例子都需要手动进行柯里化。我们来建立这样的一个函数：

```js
function curry (fun) {
  return function (arg) {
    return fun(arg)
  }
}
```

> 函数接收一个函数作为参数，并返回一个接收一个参数的函数。

在 JavaScript 中，这样的函数非常有用。我们举一个例子：

```js
['11', '11', '11', '11'].map(parseInt)
// [ 11, NaN, 3, 4 ]
```

结果是不是和我们的预期不一致？原因呢，这是因为 `Array.prototype.map()` 接收三个参数，分别是(当前值, [index], [数组本身])。恰巧的是，`parseInt()` 接收第二个可选参数作为解析的基数。

我们借助 `curry()` 函数来限定每次调用 `parseInt()` 只接受一个参数。

```js
['11', '11', '11', '11'].map(curry(parseInt))
```

> 像 `curry()` 可以显式地控制函数被调用时，修正(或忽略)用于特例化的可选参数，从而通过柯里化将参数明确下来。

比如，我们还可以使用柯里化来确定两个参数：

```js
function curry2 (fun) {
  return function (secondArg) {
    return function (firstArg) {
      return fun(firstArg, secondArg)
    }
  }
}
```

> 注意，这个例子我们使用的向左柯里化

用这个例子来定义我们的除法函数。

```js
function div(n, b) { return n / b }
let div10 = curry2(div)(10)
div10(50)  // 5
```

由此可以看到，柯里化可以指定 JavaScript 的行为，并将现有函数的行为*组合*为函数。

另外，使用柯里化比较容易产生流利的函数 API，其中一条通用的规则是：API 是否要利用函数高阶函数？如果答案是肯定的，那么至少有一个参数的柯里化是合适的。

### Partial Application

柯里化是逐次返回返回消耗的参数的函数，直至参数耗尽。而 Partial Application 指的是**函数已经部分执行，等待接收剩余的参数之后会立即执行**。

比如下面这个例子，部分应用一个已知的参数。

```js
function partialOne(fun, arg1) {
  return function (/* args */) {
    let args = construct(arg1, arguments) // construct 接收一个参数和数组，并将元素放置在数组的前面
    return fun.apply(fun, args)
  }
}
let over10PartOne = partialOne(div, 10)
over10PartOne(2)
```

部分应用两个已知的参数。

```js
function partialTwo (fun, arg1, arg2) {
  return function (/* args */) {
    let args = construct(arg1, arguments)
    return fun.apply(fun, args)
  }
}
let over10PartTwo = partialTwo(div, 10, 2)
over10PartTwo()  // 5
```

----

## 函数式编程的难兄难弟 -- Recursion

递归是一类自吸收(self-absorbed)函数(自己调用自己)。递归和 Function Programming 有着千丝万缕的关系。主要表现在：

- Recursive solutions involve the use of a single abstraction applied to subsets of a common problem - 使用单抽象的方式应用于一个问题的子集
- Recursion can hide mutable state - 能够隐藏易变(能够被修改)的状态
- Recursion is one way to implement laziness and infinitely large structures -实现惰性和无限大结构的一种方式

> 有些难懂是不是！！！

我们来举个例子说明如何实现一个递归函数。定义一个函数，返回数组的长度。递归的想法是：

- 如果数组为空，返回 0 (这是递归终止条件)
- 用数组剩余的元素调用该函数，结果 +1

```js
function myLength (arr) {
  if (_.isEmpty(arr)) { return 0 }
  else {
    return 1 + myLength(_.drop(arr))
  }
}
```

递归的精髓在于：值是基于问题的子集逐次建立的。另外需要强调的一点是：**递归不能改变传递给他们的参数**

---

## Purity, Immutability, and Policies for Change

函数式编程不仅仅只关心编程，也思考如何尽量降低软件复杂性。而降低软件复杂性的一种方式就是**减少或者消除程序中的状态变化**。

### Purity -- 纯度

我们先来看一个不纯的函数，利用 `_.random()` 来生成一个一定长度的随机小写 ASCII 字符串和数字。

```js
let rand = partialOne(_.random, 1) // 创建一个大于0的伪随机数

function randString(len) {
  let ascii = repeatly(len, partial(rand, 26))
  return ascii.map(n => n.toString(36)).join('')
}
randString(1)  // 可能是 "f"
```

接下来，我们来看一下 pure function 的定义：

- 结果只能从他的参数的值计算而来
- 不能依赖能被外部操作改变的数据
- 不能改变外部数据的状态

那我们来看 `randString()` 这个例子，违反了第一条规则。最后返回的结果的计算当中，没有使用任何参数；也违反了第二条规则，因为它的结果完全依赖于外部提供的随机数生成器。

> 我们常用的 `map()`、`reduce()` 是纯函数的典型例子。

JavaScript 的 `Math.rand()` 方法从设计上就是*不纯*的，因此任何使用该函数的函数也都是不纯的，此外比如还有 `Date.now()`、`console.log`、`this` 和全局变量等。因为 JavaScript 到处传递着对象的引用，因此每一个接收对象和数组作为参数的函数都可能是不纯的。在 JavaScript 的世界中，完全纯的函数可能是不存在的，但也完全不必如此。

但是，我们可以**尽可能地使得函数更纯**。也就是 Separating the Pure from the Impure。

比如我们将 `randString()` 划分为两个函数：一个随机生成字符，一个拼装字符串。

```js
function generateRandomCharacter() {
  return rand(26).toSting(36)
}
function generateString(charGen, len) {
  return repeatedly (len, charGen).join('')
}
let composedRandomString = partialOne(generateRandomCharacter, generateString)

composedRandomString(10)
```

如何，便把所有纯的部分(即 `generateString()`)封装在函数内。

#### 纯函数的优点

我们有一个定义如下：当一个函数的返回值只依赖它的参数时，被称为具有 *referential transparency*。

在这里，我们将谈一下纯函数的好处。之前我们定义了一个 `nth()` 的函数，借此我们来定义一个 `second()` 函数来返回数组的第二个元素。

```js
function second () {
  return nth(a, 1)
}
```

`nth()` 是一个纯函数(完全满足纯函数的定义)，唯一的依赖就只有数组参数。

```js
nth([1,2,3,4],1) // 2
```
这段代码无论运行多少次，只要 `nth()` 接收数组`[1,2,3,4]` 和数字 `1`，总是返回结果 `2`。通常，`nth()` 也永远不会修改传给它的数组。

当你知道纯函数的这种性质后，替换掉纯函数就不会影响到其他的外部状态的变化。比如，我们可以直接替换掉 `nth()` 函数，而保持功能完全一致，这简直是轻而易举。

```js
function second () {
  return a[1]
}
```

#### 纯度和幂等性

幂等性(Idempotence)指的是：将函数执行无数次，和执行一次的效果相同。优点类似于下面这个结构：

```js
fun(arg) = _.compose(fun, fun)(arg)
```

以上面的 `second()` 函数为例，假设 `let a = [1, [10,20,30],3]`，运行一次得到的结果是数组`[10,20,30]`，运行两次的结果是值`20`，这就说明，函数 `second()` 并不是幂等的。

### Immutability -- 不变性

JavaScript 中很少有默认不变的数据类型，字符串是其中一类。

```js
let s = 'iloveyuer'
s.toUpperCase()
s // 'iloveyuer'
```