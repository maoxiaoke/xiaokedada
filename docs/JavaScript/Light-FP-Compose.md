# Compose

在[范畴学基础理论-范畴的定义](./Light-FP-Categries.md#范畴的定义)小节当中，介绍了 **函数的组合** 和 **单位函数**。在此基础上，可以实现一个 `compose` 函数 和 `id` 函数。

## 实现 Compose

我们来定义一个函数，函数名就叫 `compose`。

```js
const compose = function (f, g) {
  return fucntion(x) {
    return f(g(x))
  }
}
```

其中，`f` 和 `g` 都是函数,`x` 是一个通过 “管道” 传输的值。且 `g` 将先于 `f` 执行，从而创建了一个从右到左的数据流(可以谑称“左倾主义”)。

值得注意的有两点：

1. “左倾” 很重要

2. 组合的优点在于 pointfree 的数据和可读性

`pointfree` 指的是：函数无须提及将要操作的数据是什么样的。比如：

```js
// 非 pintfree
const shout = x => exclaim()
const exclaim = x => x + '!'
const toUpperCase = x => x.toUpperCase()
```




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

## Associativity

结合率(Associativity) 是范畴需要满足的条件之一，是建立在组合的基础之上的。即满足：

```js
compose(h, compose(g,f)) == compose(compose(h,g), f)
```

## 管道