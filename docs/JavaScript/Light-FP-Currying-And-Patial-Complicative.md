# Currying 和 Partial Complicative

## 什么是柯里化函数

柯里化函数(Curried Functions)**为它的每个逻辑参数返回一个函数**。

```ts
const add = a => b => a + b
const addTwo = add(2)
addTwo(3) // 5
addTwo(6) // 8
```

可以看出，在实现柯里化的过程中，高阶函数(和闭包)发挥着非常重要的作用。`add` 函数接受 `2` 为参数后，返回函数 `addTwo`，在完成所有剩余的参数之后，输出结果。

## 简单的数学角度

德国数学家 [Gottlob Frege](https://en.wikipedia.org/wiki/Gottlob_Frege) 表示「为函数提供单一参数就足够了」。他认为可以将具有多个参数的函数转换为接收一个参数的函数链，而这一过程就是 *柯里化*。

例如，给定两个参数函数 `⨍(𝑥, 𝑦)`。构造一个函数 `ℎ𝑥`，给定参数 `𝑦`，返回 `⨍(𝑥, 𝑦)`。即

<p style="text-align: center">ℎ𝑥(𝑦) = ⨍(𝑥, 𝑦)</p>

符号 `⟼` 来抽象 **将参数映射到结果** 这一行为。则上式可表示为:

<p style="text-align: center">ℎ(𝑥) = 𝑦 ⟼ ⨍(𝑥, 𝑦)</p>

相似地，函数 `ℎ` 可以描述为：

<p style="text-align: center">ℎ = 𝑥 ⟼ (𝑦 ⟼ ⨍(𝑥, 𝑦))</p>

可以从上面的代数转换过程看出，对于给定函数 `⨍`, 柯里化过程构造了一个新函数 `ℎ` 并返回一个与 `⨍` 相关的函数。即：

<p style="text-align: center">ℎ = curry(⨍)</p>

## “左倾” 还是 “右倾”

向左柯里化(Right to Left Currying) 称为 *左倾*，是指 **从右向左** 消耗函数参数；*右倾* 反之。比如

## 将多参数函数转换为柯里化函数

除了手动实现柯里化函数，我们还可以将接收多个参数的函数转换为柯里化函数，即实现一个 `curry` 函数。根据公式 `ℎ = curry(⨍)`，可以确定的是：**`curry` 是一个高阶函数，接受一个函数作为参数，并返回一个只接收一个参数的函数**。简单的 *一元* `curry` 函数实现如下：

```ts
function curry1(fn) {
  return function (arg) {
    return fun(arg)
  }
}
```

同理，还可以简单地实现一个柯里化两个参数的 *二元* `curry` 函数。需要注意的是，这里讨论的 *多元* 柯里化函数是 “左倾” 的。

```ts
function curry2(fn) {
  return function (secondArg) {
    return function (firstArg) {
      return fn(firstArg, secondArg)
    }
  }
}
```

## 柯里化和抽象

使用柯里化技术可以很好地进行代码抽象。以两数之和的加法函数为例：

```ts
const normalAdd = (a, b) => a + b
const curryAdd = a => b => a + b

const normalIncrement = a => a + 1
const increment = curryAdd(1)
const addTwo = curryAdd(2)

[1, 2, 3].map(increment) // [2, 3, 4]
```

通过柯里化，可以从抽象函数中创建一个更为 *具体*(特例化) 的函数，比如 `increment`，更具体地将数字 `+1` 的行为抽象出来了。

当我们使用柯里化的时候，能体味到函数式编程的真正乐趣，即 **处处是函数**。为一个 *多元* 柯里化函数提供一个参数，其结果仍是一个函数。

## 柯里化和高阶函数

对一般的 `map`、`reduce` 和 `filter` 等高阶函数进行柯里化，能得到描述更为良好的函数式 api，特例化的高阶函数能够更好地被复用。

```ts
const map = fn => mappable => mappable.map(fn)
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const filter = fn => filterable => filterable.filter(fn)

const double = n => n * 2
const doubleAll = map(double)
doubleAll([1, 2, 3]) // [2, 4, 6]

const get = id => obj => obj[id]
const getId = get('id')
const getIds = map(getId)
getIds([{ id: 'x', name: 'xiaoke' }, { id: 'xx', name: 'yuer' }]) // ["x", "xx"]

const equal = base => a => base === a
const equalStringTrue = equal('true')
const filterStringTrue = filter(equalStringTrue)
filterStringTwo([true, 'true', 'false']) // ["true"]
```

高级函数在被柯里化之后，能够快速地组装成可用于复用的、抽象粒度更小的函数。想象一下，就如同玩 “乐高” 玩具，这些抽象粒度更小的函数，就是一块块 “积木”。软件的大厦，就是通过一个个函数拼装组合起来的。

## 柯里化和组合

<!-- ## 柯里化和 point-free -->

函数通过柯里化，能更好地进行函数组合。[这里](./Light-FP-Compose.md) 介绍了函数组合。我们通过管道 (Pipeine) 来描述 data 在各个函数节点的转化。比如下面的这个例子，在候选人中找到排在队首的人名，并将其大写。

```ts
const data = ['xiaoke', 'yuer']
const head = d => d[0]
const toUpperCase = x => x.toUpperCase()
const loudHead = compose(
  toUpperCase,
  head
)
loudHead(data)
```

假设有一个 `trace` 函数，来追踪 data 的变换过程。作为比较，会首先设计一个普通的接收两个参数的 `trace` 函数。

```ts
const trace = (label, value) => {
  console.log(`${ label }: ${ value }`)
  return value
}
```

`trace` 接收两个参数，在没有进行柯里化的前提下，我们不得不这样处理它：

```ts
const loudHeadAndTrace = compose(
  val => trace('After toUpperCase', val)
  toUpperCase,
  val => trace('After head', val),
  head
)
loudHead(data)
```

从这里可以看到，`trace` 函数的调用破坏了 point-free 的原则。接下来，我们看下柯里化的 `trace` 版本。

```ts
const trace = label => value => {
  console.log(`${ label }: ${ value }`)
  return value
}

const loudHeadAndTrace = compose(
  trace('After toUpperCase')
  toUpperCase,
  trace('After head'),
  head
)
loudHead(data)
```

通过 Partial Complicative，

<!-- :::warn
需要提到的是，`trace` 并不是一个纯函数。`console.log`
::: -->

<!-- 通过柯里化，可以构建只接收一个参数的函数，提供了很好的函数一致性。保持函数行为的一致性，意味着简单的函数更易复用，更易于函数组合。 -->

## 惰性计算


## 部分应用

## Reference

1. [Why Curry Helps](https://hughfdjackson.com/javascript/why-curry-helps/)