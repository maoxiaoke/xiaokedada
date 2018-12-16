# 近似 Class 的操作

TODO:

- [ ] this.xxx 要在 super() 之前
- [ ] class 的新提案 1. # 2. 成员函数表达式
- [ ] this/Person/constructor
- [ ] constructor 可以是 static 吗

## Overview

下面是一个最简单的 superClass `Person` 和 class `Empolyee`：

```js
class Person {
  constructor(name) {
    this.name = name
  }
  static create (...args) {
    return new this (...args)
  }
  toString () {
    return `${ this.name }`
  }
}

class Employee extends Person {
  constructor(name, title) {
    super(name)
    this.title = title
  }
  toString() {
    return `${ super.toString() } - ${ this.title }`
  }
}
```

### Class 的类型

常说 Class 只是 *语法糖* 而已，「不是什么大不了的东西」。举证如下：

```js
typeof Person // 'function'
```

>「没什么大不了的东西」似乎看上去是这样，但我往往不敢这么描述。如果某些看上去很简单的东西，How about diving deeper?

### Can't invoke via a function call

Class 可以通过 `new` 关键字进行实例化，但无法直接进行函数调用。也就是说，虽然 `typeof Person` 的结果是 `function`，但是我们没有办法像使用函数一样调用它。这是因为 ES6 的函数有一个内部的 `[[call]]` 状态，在[标准中将 Class 作为函数调用](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist)被禁止了(并不意味着以后不会放开这个限制)。

```js
Person()  // TypeError: Classes can’t be function-called
```

### Class 声明存在暂时性死区

也就是说，“Class 声明不会被 hoisted”。有以下原因：

1. 和引入 `let`、`const` 保持一致的理论。

2. 另外是因为 `extends` 语句的限制。这个我们会稍后讨论。

### this 不能用在 super 之前

新的提案会改变这种策略。

### Class 内只有方法，没有数据属性

这样处理的用意在：Prototype 有数据属性被认为是 anti-pattern。因此，所有的数据属性声明都可以放在 `constructor` 内。

```js
class Person {
  constructor(name) {
    this.name = name
  }
  toString () {
    return `${ this.name }`
  }
}
```

## 面向对象编程的理论

什么是 Object Oriented Programming(OOP)？有些人可能会回答：封装(Encapsulation)、继承(Inheritance) 和 多态(Polymorphism)。emmm, that's right. But What does it means?

Class 描述了一种代码的组织方式，是软件对真实世界的一种建模，即 **对象以及操作对象的行为组装在一起**<sup>1</sup>。意思是说，OOP 关注的是对象(数据)的一系列操作<sup>2</sup>，而非逻辑。

### 实例化

Class 只是一个 “蓝图”，是描述一个 **对象应该是什么样子**。而真正进行逻辑操作和交互的数据，需要进行 Class 的 **实例化**。

Class 的 *实例*(Instance)，就是 Class 中描述的所有特性的一份 **拷贝**。

### 构造函数

凭空实例化一个 Class 是存在于想象中的。Class 的实例需要 *构造函数*(Constructor) 进行构造，这个方法的任务就是 *初始化* 实例需要的所有状态。

### 继承

继承有点类似于基因的遗传 - 父母的基因特性会遗传给孩子。但这并不意味着孩子的特性完全复制父母的特性。**相对于父类来说，子类是一个独立且完全不同的 Class**。子类会包含父类行为的原始副本，但也可以重写所有继承的行为或定义新行为。

此外，有一点需要强调的是：子类也是 Class，而不是父类的实例。

## JavaScript 面向对象编程理论

可能 [Brendan Eich](https://brendaneich.com/) 都没想到 JavaScript 面向对象的设计会演变成现在这样。en~~~，我的意思是：`[[Prototype]]` 或许是实现 OOP(Object Oriented Programming) 的一种方式，但官方(社区)无时无刻不在模仿传统 Class 的 OOP 设计不禁让人诧异。接下来就知道，`[[Prototype]]` 和 Class 的表现完全不一样！！！

### 传统的 Class 是复制的，[[Prototype]] 是关联的

在传统的 Class 理论中，Class 和 Instance 是 “蓝图” 和 “建筑” 的关系，多个实例就是多份 Class 所描述的特性的拷贝。从内存的角度而言，Class 声明只是存在于代码段(Text Segment)的一段特性描述代码，只有在实例化的时候才会被动态分配到 Heap 或 Stack。

但 `[[Prototype]]` 并不是这样。我们无法创建 “Class” 的多个 “实例”，只能创建多个 “多个对象”。两个对象之间通过 `[[Prototype]]` 进行关联，实际上我们并没有任何 “拷贝” 操作。

### JavaScript 的 “Class” 和 “继承” 只是一种对象关联

在 JavaScript 中描述 “Class” 本身就是个错误的叙述(是的，只有 `[[Prototype]]`，没有 Class)，所以我添上了 `“”` 来作为一种注解。

为什么会这样说？我们来看一个案例(ES5 的方式)：

```js
function Person (name) {
  this.name = name
}
Person.prototype.toString = function () {
  return `${ this.name }`
}
const me = new Person('xiaoke')
```

我们将分析 `me`、`Person` 和 `Person.prototype` 的关系图。

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/prototype.png?raw=true)

可以看到， `桥接` 了 “构造函数” (`Person()`) 和 “实例” (`me`) 的实际上是`Person.prototype`。也就是说，“实例” 和 “构造函数” 之间没有任何 **直接联系** (当然，你完全可以反问到：`me` 的 `constructor` 指向了 `Person()` 呀，这个稍后解释)。`Person.prototype` 作为一个 “代理人” 将两者联系到了一起。

是的，`[[Prototype]]` “建造” 了这一切(注意：不是 `prototype`)。*几乎* 所有的对象在创建时都会携带一个 `[[Prototype]]` 的内部属性。这个属性的值实际上是另一个对象的引用，这是一种 **关联关系**，而非 “拷贝” 关系。

对上图三个内部 `[[Prototype]]` 的解释：

+ 构造函数(当然，函数也是对象)的 `[[Prototype]]` 是 `Function.prototype` 的引用，因为 JavaScript 中所有的函数都是由 `Function()` “构造” 的。

+ 对象 `Person.prototype` 的 `[[Prototype]]` 是 `Object.prototype` 的引用。`Object.prototype` 是所有对象(当然，函数也是对象) 的 “终点”。

+ 对象 `me` 的 `[[Prototype]]` 是 `Person.prototype` 的引用，而这是通过关键词 `new` 实现的。

最后，让我们思考一个问题：`Function.prototype` 的内部 `[[Prototype]]` 指向何处？

en~~~，应该很简单。`Object.prototype` 是所有对象的 “终点”。

### new、constructor、实例等概念隐藏了 [[Prototype]] 的真实

在知道 JavaScript 真正的 OOP 方式是通过 “对象关联” 而非 Class 中描述的所有特性的 “拷贝”。我们不禁要思考：是什么导致 JavaScript 的 OOP 朝着 “模拟” Class 进行发展的。

结论是：函数的 `prototype`。所有的函数都默认拥有一个名为 `prototype` 的属性，指向 `函数.prototype`，同时在 “prototype chain” 中占据一个位置。

有哪些模糊了 JavaScript 的 OOP 的真实呢？

1. “构造” 函数的首字母大写命名

很多规范都鼓励我们采用 *大驼峰*(Upper Camel Case) 的方式命名 “构造” 函数，从而营造出 “类” 的感觉。“构造” 函数和其他函数并没有什么不同，“构造” 函数也没有构造 “实例”。

2. `new` 和 “构造” 函数

```js
function Person () { }
const me = new Person ()
```

上面的代码中，看到了关键字 `new`，另外我们看上去是代码执行了 “类的构造函数”。在传统的面向 Class 语言中，两者紧密结合。

似乎，我们通过这两者 “构建了 Class 的实例”。这种曲解的理解是不对的，`new` 只是 **间接** 地建立了两个对象的 **关系**。只有 `new` 调用的函数，我们才亲切地成为 “构造函数”。就是说，`new` 割断了对象原本的 *关联关系*(一般情况下，是 `Object.prototype`)，建立了于另一个对象 `构造函数.prototype` 的 *关联关系*。

我们摘录 `new` 四个步骤：

+ 一个全新的对象被构建
+ 这个新构建的对象会被接入原型链
+ 新构建的对象被设置为函数调用的 this 绑定
+ 除非函数返回一个它自己的其他对象，否则这个被 new 调用的函数将自动返回这个新构建的对象

还要一种直接建立两个对象之间的联系的方式是：`Object.create()`。

3. “虚假” 的 constructor

回顾上面的 `[[Prototype]]`、`prototype` 和 `constructor` 指向问题。几乎每个对象(当然，函数也是对象) 都有一个 `.constructor` 属性。令人费解的是，`me.constructor` 和 `Fun.prototype.constructor` 同时指向了 “构造” 函数 `Person`。

```js
me.constructor === Person
Fun.prototype.constructor === Person
```

这看上去像是一种误导，`me.constructor` 只是通过默认的 `[[Prototype]]` “委托” 指向了 `Person`，和 “构造” 并无关系(即，“虚假” 的关系)。

试着，举个例子。ES6 之前，我们的写法是这样的：

```js
function Person (name) {
  this.name = name
}
Person.prototype.toString = function () {
  return `${ this.name }`
}
const me = new Person('xiaoke')
```

那么，既然是 `Person.prototype` 是对象，是不是可以采用对象字面量的写法呢。

```js
function Person (name) {
  this.name = name
}
Person.prototype = {
  toString: function () {
    return `${ this.name }`
  }
}
const me = new Person('xiaoke')
```

第一眼看上去似乎完全一致，但实际上存在一定的副作用。

```js
me.constructor === Person // false
me.constructor === Object // true
```

如果认为 `constructor` 是 `由...构造` 的话。`a.constructor` 应该是 `Person` 的引用，而非 `Object`。这是怎么回事？

这是因为 `a` 并没有 `constructor` 属性，所以它委托原型链上的 `Person.prototype`；但是，由于是字面量的写法，所以 `Person.prototype` 也没有 `constructor` 属性；继续向上委托，交给顶端的 `Object.prototype`；这个对象有 `constructor` 属性，而且是内置的 `Object`。

所以，为了得到正确的结果。我们需要手动 “委托” 一下。

```js
function Person (name) {
  this.name = name
}
Person.prototype = {
  constructor: Person,
  toString: function () {
    return `${ this.name }`
  }
}
const me = new Person('xiaoke')
```

这种方式似乎也有点问题。因为 `.constructor` 属性是不可枚举的，所以我们需要多做一些工作。

```js
function Person (name) {
  this.name = name
}
Person.prototype = {
  toString: function () {
    return `${ this.name }`
  }
}
Object.defineProperty(Foo.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Person
})
const me = new Person('xiaoke')
```

4. ES6 中 Class 关键词将这一行为推向深渊

ES6 中通过 `class` 关键字将这一行为推向了深渊。我们会毫不犹豫地将 ES6 Class 的行为和传统的 Class 行为联系到一起，无法窥探到 JavaScript OOP 的本质。

### me 和 Person.prototype 是一种 “委托” 的关联关系

“委托” 是一种模拟 “原型链” 工作原理的说法。

```js
me.toString()
```

当 `toString()` 不直接存在于 `me` 中，就会将 `toSting()` “委托” 给 `me` 关联的 `Person.prototype`；如果还没有，就还会沿着 “原型链” 继续向上查找；如果找不到，则抛出一个 `TypeError` 类型的错误。

但是，试图覆盖某个属性或方法时，情况要稍微复杂一点：

```js
me.title = 'JavaScript Developer'
```

1. 如果在 “原型链” 上存在 `title` 的一个可读的(`writable: true`)属性，就会直接在 `me` 中添加(或替换)一个 `title` 属性，“屏蔽” 之前的属性；

2. 如果在 “原型链” 上存在 `title` 的一个只读的(`writable: false`)属性，无法修改已有属性或在 `me` 上添加(或替换) `title` 属性；

3. 如果在 “原型链” 上存在 `title` 属性，并且它是一个 `setter`，则只会调用这个 `setter`。

### 继承

## ES6 Class

接下来的部分将抛开 “真实的 Class 理论”，而挖掘 ES6 中 Class 的实现 - 一种 “近似” 的 Class 实现。

ES6 Class 内部只有方法，例子如下：

```js
class Person {
  constructor(name) {
    this.name = name
  }
  static create (...args) {
    return new this (...args)
  }
  toString () {
    return `${ this.name }`
  }
  get name() {
    return this.name
  }
  set name(anotherName) {
    this.name = anotherName
  }
}
```

从方法的功能上，可以将 ES6 Class 的所有方法划分为三类：`constructor`、`static` 和 `prototype`。

同时，`static` 和 `prototype` 类别中又支持 Gettet、Setter、Computed 方法、Gengerator 等写法。

### constructor

当然，ES6 Class 的实例化也是通过 `constructor()` 来实现的。该方法是内部方法 `[[Construct]]` 的一个实现。每个 Class 都有一个 `constructor()` 方法。不显式指定，则默认为：

```js
class A {
  constructor() {}
}
class B extends A {
  constructor() {
    super()
  }
}
```

### static

ES6 Class 可以为所有的方法和 Getter/Setter 使用 static 属性。static 方法属于 Class 本身，其实例不可用。

那么，问题是：Class 中的 static 方法有什么存在的价值呢<sup>3</sup>？

1. 很多实用的工具类函数，可以被定义成 static

比如，一个名为 `MyMath` 的 Class，倘若 `MyMath` 对象对外提供一个 `random()` 的工具方法，定义为 static 方法会比普通的成员方法使用上更为简单，也不会担心会被子类重写。

```js
class MyMath {
  static random() {
    return Math.random()
  }
}
```

2. 返回 Class 的实例

不管是为了向下兼容还是其他，我们可以通过定义 static 方法来返回我们的 Class 实例。比如：

```js
class Person {
  constructor (name) {
    this.name = name
  }
  static create(name) {
    return new this(name)
  }
  static get defaultPerson () {
    return new this('xiaoke')
  }
}
```

再例如 `Promise.resolve()` 返回了一个 Promise。

#### 不推荐的 static 方法定义方式

还记得吗，Class 就是一个 `function`。我们还可以通过下面的方式来添加一个 static 方法：

```js
class Person {
  constructor (name) {
    this.name = name
  }
}
Person.create = function (name) { new Person('name') }
```

但是这种做法并不推荐。

### prototype

以下面这个例子而言：`toString()` 就是 `Person.prototype` 上的方法。这些方法一般可以被实例继承。

```js
class Person {
  constructor(name) {
    this.name = name
  }
  toString () {
    return `${ this.name }`
  }
}
```

### Getter 和 Setter

```js
class Person {
  constructor(name) {
    this.name = name
  }
  get personName () {
    return this.name
  }
  set personName (name) {
    this.name = name
  }
}
```

## Class 单例模式

单例(singleton)是设计模式<sup>4</sup>中常见的一种，是说 **确保只存在唯一一个 Class 实例**。这是一种较易实现的模式，但下面的方式是有缺陷的<sup>5</sup>。

```js
export default singleton = new class {
  constructor(name) { this.name = name }
  get personName() { return this.name }
}('xiaoke')
```

因为无法 **确保** 只存在唯一一个 Class 实例。这是因为我们可以很容易地使用 `constructor()` 来创建 Class 的另一个实例。

```js
const anotherInstance = new singleton.constructor('yuer') // oh, no~~~
```

不过这也提醒我们应该在 `constuctor()` 做点什么来防止这种行为。我们可以定义一个变量来存储这个实例，当再次调用构造函数是，如果实例存在，则返回这个实例；否则，创建一个实例<sup>6</sup>。

```js
let instance = null
export default class Singleton {
  constructor (name) {
    if (instance) {
      return instance
    }
    this.name = "name"
    this.instance = this
  }
}

// ES Next
export default class Singleton {
  static instance
  constructor (name) {
    if (instance) {
      return instance
    }
    this.name = name
    this.instance = this
  }
}
```

### 我们真的需要吗

疑问发人深省！！！一个简单的字面量 Object 是不是就可以满足要求？JavaScript 是不是原生就支持单例模式？那为何我们还需要多此一举？

```js
export default {
  name: 'xiaoke',
  get Name() {
    return this.name
  }
}
```

## Class 的批评

虽然有近似 Class 的语法，但是 JavaScript 的这个近似 Class 的表象之下，其实和真实的 Class 完全不一样。

1. syntax 和 semantics 的分离

## Reference

[1] https://searchmicroservices.techtarget.com/definition/object-oriented-programming-OOP

[2] https://stackoverflow.com/questions/2078978/functional-programming-vs-object-oriented-programming

[3] https://www.reddit.com/r/javascript/comments/58yvgk/what_is_the_point_of_static_methods_in_classes/

[4] Design Patterns - Elements of Reusable Object-Oriented Softwave

[5] https://stackoverflow.com/questions/38739499/anonymous-class-instance-is-it-a-bad-idea

[6] http://adambien.blog/roller/abien/entry/singleton_pattern_in_es6_and
