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

返回一个常数的函数是常见的，也是非常有用的，几乎成了函数式编程的一种模式。

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

###  为何追求 “纯”

#### 可测试性

由于 “纯” 函数式 “无副作用” 的，它的执行结果就是返回值，影响返回值的唯一因素就是函数参数。对于单元测试的程序员来说，这简直就是福音呀：在测试函数的时候，只需关心参数的一些边界值就行，也不必关系函数的调用顺序，不用费心设置函数依赖的一些外部值。

#### 并行

并行遇到函数式编程，就像 “鱼儿遇见水”。并行编程是函数式编程发挥其最大实力的领域。因为在函数式编程中，所有的函数都是纯函数，不需要访问共享的内存，也不会因为副作用而进入竞争态(Race Condition)。

#### 易于重构

如果在一个函数依赖众多的外部变量，我相信这个函数会像 “shit” 一样让你不想去碰它。但纯函数不一样，由于它只依赖传给它的函数参数，你会更加大胆、有自信地重构或重新组织它内部的代码。

另一个减轻重构难度的优势在于纯函数的 *引用透明性*，只要保证相同的输入输出，就可以完全用另一个想等的函数或函数结果替换它，而不改变整个的程序的行为。

## Reference

[1] Guttag, John V. (18 January 2013). Introduction to Computation and Programming Using Python (Spring 2013 ed.). Cambridge, Massachusetts: The MIT Press. ISBN 9780262519632.

## Ramda 和 函数

在函数式编程中，函数是第一要义。从命令式到声明式的跨越，意味着从告诉电脑 「How To Do」到「What I Want」的转变。而这一秘诀，是因为 “函数” 抽象了行为，因此我们可以不去了解其内部到底做了什么，只需要知道其为我们提供了什么能力，并且保证自己是 “纯” 的。

举例来说，算术运算。在函数式编程的世界中，一般不会直接去操纵 `+`、`-`、`*` 和 `/` 这四个算术符号，是因为直接操纵太过死板了。在 Ramda 中，有 `add`、`subtract`、`multiply` 和 `divide` 相对应的函数提供调用。比较下面的代码：

```ts
const evenNumber = [2, 4, 6]
const oddNumber = [1, 3, 5]

map(number => 2 + number)(evenNumber)
map(number => 2 + number)(oddNumber)

const calcTwo = add(2)
map(calcTwo)(evenNumber)
map(calcTwo)(oddNumber)
```

是的，函数复用。相比于重新创建一个匿名的 `number => 2 + number` 函数，我们的函数版本复用了 `calcTwo` 这个函数。此外，在[函数组合](./Light-FP-Compose.md)中，函数版本的 `add` 比 `+` 有更大的优势。

在上面的例子中，我们用到了进行了[柯里化](./Light-FP-Currying.md)版本的 `map` 函数，不过介绍柯里化并不是这一节的重点，我们会在后面提到它。

总而言之，请记住这句话：**函数贯穿始终**。

#### 算术 (Math)

1. `add` 对应于 `+` 运算
2. `subtract` 对应于 `-` 运算
3. `multiply` 对应于 `*` 运算
4. `divide` 对应于 `/` 运算

此外，Ramda 还提供取模运算 `mathMod`、平均数 `meanMath`、取负 `meanMath` 等辅助函数。简单地，我们来做一个 `(2 * 3 + 1)^2` 简单算术。

```ts
const square = x => x * x

const doArithmetic = compose(
  square,
  add(1),
  multiply
)

doArithmetic(2, 3)
```

5. 由于 `add(1)` 和 `subtract(1)` 是一个常见的操作，因此 Ramda 提供了 `inc` 和 `dec` 函数与其对应。

#### 逻辑 (Logic)

1. `both` 和 `either` 可以接收两个函数作为参数，替代运算符 `&&` 和 `||`
2. `complement` 可以接收一个函数作为参数，替代运算符 `!`

举例，若在某国可以驾驶的年龄段的是 [18, 60)，那么他的年龄必须大于或等于 18，小于 60。

```ts
const isOver18 = gte(__, 18)
const isOldEnough = lt(__, 60)

const canDrive = both(isOver18, isOldEnough)
canDrive(16) // false
canDrive(20) // true
```

3. 此外，原始值(Primitive Value)的比较，分别有 `add`、`or`、`not` 分别对应。
4. 一个常见 JavaScript 写法中，`||` 可用于取默认值，`&&` 可用于进行短路运算。Ramda 提供 `defaultTo` 来提供默认值的行为，并且规避 *为 0 时的异常行为*。

```ts
const defaultAge = defaultTo(18)
defaultAge(0) // 18
defaultAge(undefined) // 18
```

5. `&&` 提供的短路运算不过是简化了 `if...else`，同样对于 *条件判断*(Conditionals) 的函数行为，Ramda 提供 `ifElse` 来对应。该函数可以接收三个参数，分别是判断条件、判断为真的操作和判断为假的操作。举例来说，我们可爱的女孩们是“永葆青春”的。

```ts
const forever18 = ifElse(gte(__, 18), always(18), inc)
forever18(20) // 18
forever18(12) // 13
```

有点理解上的困难？让我们翻译成常规的三元运算符 `?...:...` 的写法：

```ts
const forever18 = age => age >= 18 ? 18 : age + 1
```

含义就是，判断女孩的年龄是否大于等于(Ramda 提供 `gte` 函数) 18 岁，判断为真，“永葆年轻”；判断为假，年龄则往上递增一岁。还记得上面的 `inc` 函数吗，我们用它抽象了 `+1` 这个行为。

嗯... 总结一下，在 Ramda 中，`if...else`、`?...:...` 和 `&&` 短路用法都使用 `ifElse` 函数来提供。

6. 当然，Ramda 也为 `if...else if...else...` 和 `switch` 提供 `cond` 这个函数来支持。该函数接收形如 `[predicate, transformer]` 的数组。命中数组中某项的 predicate(即返回 true)，则使用对应的 transformer 进行处理；没有任何命中，返回 undefined。

```ts
const fn = R.cond([
  [R.equals(0),   R.always('water freezes at 0°C')],
  [R.equals(100), R.always('water boils at 100°C')],
  [R.T,           temp => 'nothing special happens at ' + temp + '°C']
]);
fn(0); //=> 'water freezes at 0°C'
fn(50); //=> 'nothing special happens at 50°C'
fn(100); //=> 'water boils at 100°C'
```

#### 常量 (Constants)

同样，表达常量的这一概念也可以通过函数来抽象。我们在上面也提到了，即 `always` 函数。`always` 的实现也非常简单，即函数返回输入本身。

```ts
const always = () => value
```

`always` 非常常见，几乎成了函数式编程固定的一种模式。

#### Identity

在 [范畴学基础理论](./Light-FP-Categries.md) 一节中提到过[单位函数]() 这一概念。这是一个极为重要的概念，我们在 [函数组合](./Light-FP-Compose.md) 中也会再次介绍它。它的实现也非常简单：

```ts
const identity = id => id
```

这是一个在编程领域和很常见的概念，*返回参数本身*。比如，在页面展示一段简介文字时，可能由于字数太长，我们可能需要对字符串进行截断，使得页面不那么难看。那么，这里的逻辑是：如果字符串大于或等于某一长度，则进行截断；否则，返回字符串本身。在 [Logic](#逻辑 (Logic)) 中提到过 `ifElse` 这个函数，我们可以使用它来达到我们的目的。

```ts
const truncate = ifElse(propSatisfies(gte(__, 10), 'length'), pipe(take(10), append('...'), join('')), identity)

truncate('xiaoke')  // 'xiaoke'
```

这是一种非常普遍的场景，因此 Ramda 就提供了 `when` 和 `unless` 来简化上面的式子。

```ts
const when = ifElse(propSatisfies(gte(__, 10), 'length'), pipe(take(10), append('...'), join('')))

truncate('xiaoke')  // 'xiaoke'
```

到此，想必很多同学对于上面的例子感到无所适从。是的，处于提供最完整的函数式的例子，在这里我引入了很多其他的内容。

比如我介绍:

> `both` 和 `either` 可以接收两个函数作为参数...

我用了「可以」这个词，是因为在 Ramda 中，函数都是柯里化的。而对于柯里化的概念，会在 [Currying 和 Partial Complicative](./Light-FP-Currying-And-Patial-Complicative.md) 介绍；placeholder `__` 也会在柯里化一节介绍；`pipe` 的概念，会在 [函数组合](./Light-FP-Compose.md) 介绍；同时细心的你可能发现，我们举出的例子只有在真正需要它的时候才会将数据传入，这便是 point-free 和 data-last style，你同样可以在后面的章节发现这些概念的踪影。

你不必先去学习这些概念，因为在这里，我想强调的是在函数式编程的世界中，“函数贯穿始终”。相比于命令式编程，函数式编程更习惯将行为抽象出来。于是围绕着函数，我们又引入了高阶函数、纯函数等概念。

<!-- 下两个章节，我们会学习函数组合和柯里化。在学过这些内容之后，我们需要再回过头来 -->
