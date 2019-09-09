# 函数基础

## 抽象 和 组合 (Abstration & Composition)

在编程领域中，函数的作用举足轻重。[Michael Fogus](http://blog.fogus.me/) 在 [Functional JavaScript](https://www.amazon.com/Functional-JavaScript-Introducing-Programming-Underscore-js/dp/1449360726/?tag=fogus-20) 描述了函数在 FP 领域的两个重要性：

1. 以函数为抽象单元 (抽象)
2. 以函数为行为单元 (组合)

在介绍章节 [理解编程]() 中其实谈到由于我们大脑的缺陷，在处理问题时，会逻辑性地将信息进行结构化地分解并重新组合。也就是分解成小问题，再组合起来解决大问题。而我们将实现细节分解到小问题的这种行为，便是一种 **抽象行为**(Abstration Behavior)。

> The essence of abstractions is preserving information that is relevant in a given context, and forgetting information that is irrelevant in that context. -- John V. Guttag

**抽象行为** 是通过忽略某一问题具体实现细节，归纳这一类问题的共同特征或属性的过程。<del>Generalization，一般化</del>

抽象在软件世界无处不在。在 JavaScript 中，主要体现在以下结构中：

+ 算法
+ 数据结构
+ 模块
+ 类
+ 函数

<del>函数是实现抽象的一个方式：**隐藏了实现细节**。这似乎是函数固有的一种属性（天然的本份），毋庸置疑。

有了函数之后，函数与函数之间的调用可以构建起整个软件工程。从某个角度来说，**函数并不特殊**，如果可以像对待其他数据类型一样对待函数 —  当做参数传递，当做函数返回值返回，又或者赋值给其他变量… ，这样才能发挥函数作为行为单元的真正威力。</del>

<del>如果一个函数可以当做参数传递、又或者作为返回值返回，就称为 “高阶函数”（Higher-Order Function）</del>。

## 一等公民身份

高阶函数是建立在函数是 “一等公民”（First-Class）的基础之上的。“一等公民” 的含义是：**和其他数据类型没啥不同**。函数的 “一等公民” 身份是重要的。

比如，为了能让函数得到 *延迟* 执行，人们往往会这样写：

```typescript
const sayHi = (name: string): string => `Say Hi, ${name}`

// 为延迟执行 sayHi
const wrappedSayHi = (name: string): string => sayHi(name)
```

仅仅是为了能够延迟执行函数，就用函数 `wrappedSayHi`   把 `sayHi` 包裹起来，这是多么愚蠢的写法。如果函数是 “一等公民”，下面这样写就足够了：

```typescript
const sayHi = (name: string): string => `Say Hi, ${name}`

// 这样才算好的
const wrappedSayHi = sayHi
```

## 高阶函数

由于函数是 “一等公民”，因此可以将函数作为参数传递、或者作为函数返回值返回。如此，一个函数可以称为 “高阶函数”（First-Order Function），则需满足：

1. 是 “一等公民”
2. 以函数作为参数
3. 或者返回函数

> 我们应该从函数的 “一等公民” 的角度来理解高阶函数，即相对于 First-Order 函数 - 无法接收函数作为参数，也无法返回函数，亦不能将函数赋值给变量。从 “阶” 的角度来理解的高阶函数是片面的，比如将 `Foo(1)(2)` 才理解为高阶函数。

### 以函数作为参数

首先，先实现一个 `repeat` 函数，接受一个数字和一个值。

```typescript
function repeat<T> (times: number, value: T): T[] {
  return [...new Array(times)].map(() => value)
}
repeat(4, 'oops')
// ["oops", "oops", "oops", "oops"]
```

函数使用 `Array.prototype.map`函数将 `value` 重复了 `times` 次。说实话，上述`repeat` 函数的实现 *并没有* 很大的可取之处。实际上，**抽象度** 太低。稍微改动一下：

```typescript
function repeat (times: number, fun: () => T): T[] {
  return [...new Array(times)].map(fun)
}
repeat(4, () => 'oops')
// ["oops", "oops", "oops", "oops"]
```

在这个版本中，`repeat` 函数接收一个函数，随之华丽变身 “高阶函数”。在有些人看来，这多此一举，接下来我会试着解释一下。

#### 使用函数，而不是值

还记得编程的要义吗？—— 以函数为行为单元。在  `repeat` 的这个例子中，宁愿让函数  `() =>'oops'` 重复多次，也不应该让值重复多次。<del>为什么如此说呢？因为改变一个值比改变一个函数要容易得多。</del>

这就是我所强调的，在 FP 领域中需要将编程的思维从值转换为函数，函数才是我们操纵的对象。值只是像水流一样在函数中变换、传递。只要能有一个达到目的的函数，程序的最终输出也就可预测了。

在 FP 编程领域，只有在 “函数构成的软件大厦” 完成之后，才会关心值；而在那之前，我们的重点都应该放在函数身上，因为函数才应该是软件行为的最小单元。之后会提到 pointfree、柯里化等概念，都会试图将我们从目光从值转移到函数身上来。

<del>我们并不需要关心值，函数才是操纵的最小单位元。</del>

### 以函数作为返回值

返回一个常数的函数是常见的，也是非常有用的，几乎成了

函数式编程的一种模式。

```typescript
const always: <T> (value: T) => () => T  = (value) => () => value
```

上面这个例子中，`always` 返回一个函数，进而使自己成为 “高阶函数”。用此函数替换`()=>'oops'` 会简洁一些：

```typescript
repeat(4, always('oops'))
```



#### 闭包

##  纯函数

### 代数中的函数

在编程的真实中，函数内部会处理一些行为操作，或执行一系列步骤，或转换 IO 数据。

不过首先，让我们考虑一下代数中函数的行为。按照 G. Cantor 的想法，由一些确定的且相互区别的对象(Object)汇集而组成的一个整体，称为集合。组成该集合的对象称为它的元素，描述为 `𝑎 ∈ A`，其中 `𝑎` 是集合 `A` 中的元素。

集合间的关系可以描述为：

<p style="text-align: center">𝑓 : A → B</p>

`𝑓` 表示集合 A 到集合 B 的函数。

举例： 𝑓(x) = 2x (x ∈ R)，则表示实数集到实数集的一个映射关系。即对于实数集的任意元素 x，存在函数关系 𝑓 将其映射到另一实数集的元素。

我们可以观察到以下特征：

1. 函数是输入 x 到输出 𝑓(x) 的一个 mapping 关系。
2. 对于任意一个输入 x, 可以完全用输出 𝑓(x) 完全替代，这称为 Referential Transparency。

### 纯函数的 Mapping 关系

纯函数（Pure Function）和代数学中的函数行为一致。纯函数有以下 “优良品质”：

1. 函数结果 **只** 依赖函数参数
2. **无法** 改变外部世界状态

换句话说，**相同的输入，永远得到相同的结果**，这是纯函数 **幂等性**（Idempotence）；第二句话的意思是说，纯函数没有可观察到的 **副作用**。**幂等性** 和 **无副作用**，这是纯函数的核心价值点。

来看一个有副作用的函数例子，计算一个平面圆的面积：

```typescript
window.PI = 3.14
const areaOfCircle = (radius: number): number => PI * Math.sqrt(radius)

window.PI = 100
console.log(areaOfCircle(5))
// Whoops
// 2,500
```

将一个变量挂载到 `window` 上这是很多库常见的做法，但是这些值很容易被更改。当这些值被 “秘密地” 被更改后，你会发现这是一件多么让人恼火的事，因为函数的结果取决于 *系统状态*（System State）。因此，一方面我们不愿意值被秘密地被更改，希望操作之后值还是 “原来的值”，这就是数据的 *不可变性*（Immutable）；另一方面，我们希望函数不依赖函数外部的可变量，仅仅通过函数参数来预测函数行为，这一点，也称为 *引用透明性*（Referential Transparency）—— 实际上，我更愿意用 “依赖透明性” 这个词。

将上面的例子改写成 “纯” 一点的函数：

```typescript
function areaOfCircle (radius: number): number {
  const PI = 3.14
  return PI * Math.sqrt(radius)
}
```

这个例子足够简单，“不纯” 相比 “纯” 危害似乎没有很严重。但是我必须在此申明，**这种依赖状态是影响系统复杂度的祸首**。接下来，会告诉你 FP 追求 “纯” 函数是值得的。

###  “纯” 的理由

#### 可测试性

由于 “纯” 函数式 “无副作用” 的，它的执行结果就是返回值，影响返回值的唯一因素就是函数参数。对于单元测试的程序员来说，这简直就是福音呀：在测试函数的时候，只需关心参数的一些边界值就行，也不必关系函数的调用顺序，不用费心设置函数依赖的一些外部值。

#### 容易调试

TODO:

#### 并行

并行遇到 FP，就像 “鱼儿遇见水”。

#### 易于重构

如果在一个函数依赖众多的外部变量，我相信这个函数会像 “shit” 一样让你不想去碰它。但纯函数不一样，由于它只依赖传给它的函数参数，你会更加大胆、有自信地重构或重新组织它内部的代码。

## Reference

[1] Guttag, John V. (18 January 2013). Introduction to Computation and Programming Using Python (Spring 2013 ed.). Cambridge, Massachusetts: The MIT Press. ISBN 9780262519632.