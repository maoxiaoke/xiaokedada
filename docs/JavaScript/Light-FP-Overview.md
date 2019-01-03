# Light-FP 概念篇

tips:

1. 抛开 js 的 `map` 和 `reduce` 来看 FP，只用其表达意义。

## FP versus OOP and Others

1. 与 Imperative programming 的区别

IP: 命令电脑「要做什么」

FP: 通过函数描述问题「是什么」

举个 Haskell 的例子：

```haskell
factorial :: Integer -> Integer
factorial n = product [1..n]
```

描述问题是什么：阶乘就是 1 到 n 的乘积，即数学定义。

## Type Signatures - 类型签名

- Hindley-Milner 类型签名

1. 什么是类型
2. 类型有什么用
3. [Hindley-Milner 类型签名是什么](https://www.zybuluo.com/darwin-yuan/note/424724)
4. HM 签名如何表达
5. JS 类型库 - [TypeScript](https://ts.xcatliu.com/)

## Container - 容器

1. 什么是容器
2. 容器有什么用
3. ramda 是怎么实现容器的

## functor

1. 什么是 functor
2. functor 和 容器的关系
3. 有哪些常用的 functor
  - Maybe
  - Either
  - IO

4. Map 方法、Maybe 方法、Map 的 parametricity 性
5. 什么是 lift

## Monad

1. 什么是 Monad

## Monoid

[wike](https://en.wikipedia.org/wiki/Monoid)

Monoid 可理解为具有单位元的半群(semigroup)。定义如下：

假设 S 是一个集合(Set)，存在二元运算 *，S * S -> S，则满足：

1. Associativity

集合 S 内的元素 a, b 和 c，有 (a * b) * c = a * (b * c)

2. Identity element

集合 S 内存在元素 e，对于集合内的任何元素 a，有 e * a = a * e = a

### 作用

+ 范畴论中的 object
+ 无限状态机应用到的概念

## Lazy

为甚可以 Lazy 求值：因为函数是 pure 的，任何东西都具有 referential transparency。这位 Lazy 提供了条件。我调用一个函数，我可以确定他不会乱来。

## Referential Transparency