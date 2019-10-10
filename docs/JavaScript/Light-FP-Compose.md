# 函数组合

在[范畴学基础理论-范畴的定义](./Light-FP-Categries.md#范畴的定义)小节当中，介绍了 **函数组合** 的概念。在此基础上，我们将实现 `compose` 函数。

## 二元 Compose

根据概念，组合接收两个函数作为参数，并返回一个接收参数的函数，定义为 `compose` 如下：

```ts
const compose = (f, g) => x => f(g(x))
```

其中，`f` 和 `g` 都是函数，`x` 是一个通过 “管道” 传输的值。且 `g` 将先于 `f` 执行，从而创建了一个从右到左的数据流(可以谑称“左倾”)。

值得注意的有两点：

1. “左倾” 很重要

2. 组合的优点在于 pointfree 的数据和可读性

`pointfree` 指的是：**函数无须提及将要操作的数据是什么样的**。

## 组合提高可读性

组合就是对数学公式 `(𝑔∘𝑓)(𝑎) = 𝑔(𝑓(𝑎)) 𝑎 ∈ A.` 的一个描述，相比于等式右侧的 “函数嵌套” 方式，函数组合显然提供了更好的代码可读性。

```ts
const g = n => n + 1
const f = n => n * 2

// 函数嵌套方式
g(f(2)) // 5

// 函数组合方式
compose(g, f)(2) // 5
```

## pointfree 和 data-last style

## 结合率(Associativity)

结合率(Associativity) 是范畴需要满足的条件之一，是建立在组合的基础之上的。即存在：

```js
compose(h, compose(g,f)) == compose(compose(h,g), f)
```

这一特性意味着，不管你把 `g` 和 `f` 分为一组，还是将 `h` 和 `g` 分成一组，对最终的结果都不会产生影响。再往深层思考一点，也就是：

<p style="text-align: center">ℎ∘𝑔∘𝑓 = (ℎ∘𝑔)∘𝑓 = ℎ∘(𝑔∘𝑓)</p>

为此，可以构建这样的组合函数，可以给它传入任意多的函数。

```ts
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
```

在这其中，`reduceRight` 处理参数的方式与一般的 `reduce` 相反，即 “左倾”，从右至左的方式。

// TODO: compose 的好的例子

## 管道(Pipeline) 的概念

在 Unix-like 操作系统中，管道是通过消息传递实现 inter-process communication 的一种机制。通过 “链式模型” 来串接不同的程序或不同的组件。[Pipeline (Unix)](https://en.wikipedia.org/wiki/Pipeline_(Unix))

## 实现 Id

`id` 是一个实用的函数。即，这个函数接受什么输入然后原封不动地返回这个输入。实现非常简单：

```js
const id = x => x
```

`id` 函数可以作为组合操作的 “单位元”。即：

<p style="text-align: center">𝑓∘1<sub>A</sub> = 𝑓 = 1<sub>B</sub>∘𝑓</p>

表示为：

```js
compose(id, f) == compose(f, id) = f
```

## Reference

## Compose with Ramda

**警告️⚠️**: 这部分不会严格遵从 Ramda 的实现方式，有些可能会简化逻辑，从而降低函数健壮性。请谨慎用于生产。

1. reduceRight
2. compose
3. pipe