# TypeScript 通识

TypeScript 是为 JavaScript 提供的静态类型系统。

- 类型是什么？
- 类型包含什么？

下面一点值得提到：JavaScript 即是 TypeScript。

## Declaration Spaces

在 TypeScript 中有两类声明空间：变量声明空间 和 类型声明空间。

1. 类型声明空间

类型声明空间是用来包含「可作为type Annotation (类型注解)」 的容器。

```ts
class Foo {}
interface Bar {}
type Bas = {}
```

+ `type` 是类型别名。
+ `Foo`、`Bar` 和 `Bas` 即能用来当做 type Annotation。
+ 注意，不是说 Interface Bar {} 是合并了多个 type Annotation 的 type Annotation，所以它是一个声明空间。

2. 变量声明空间

变量声明空间是用来包含「可作为变量」的容器。

```ts
class Foo {}
const val = 123
```

+ `class` 既可以作为类型声明空间，又可作为变量声明空间。

!!理解声明空间的意义在于，类型和变量不能交叉使用，但类型也和变量极为相似。

## type Annotation

即 :TypeAnnotation 语法，如下。type Annotation 就是类型声明。

```ts
const max: number = 123
interface Foo {
}
const obj: Foo = {}
```

### Inline Type Annotation

和 Interface 不同，有点类似 Interface 的 “语法糖”。可以省去对类型进行命名的麻烦。

```ts
let person: {
  name: string;
  age: number
}
person = {
  name: 'xiake',
  age: 18
}
```

## Generics

泛型是类型的 “类型”。我们用 `<>` 来告诉你，这是一个泛型。Generics 的意义在于 “为函数参数和函数返回值，类实例成员和类方法” 之间提供约束。

identity 是函数式编程中常见的一个函数。你给它什么，它就给你吐出什么。

```ts
function identity<T>(arg: T): T {
  return arg
}
```

1. 泛型用在接口中

上面的函数我们也可以这样写：

```ts
interface IIdentity<T> {
  (arg: T): T
}
const identity: IIdentity = arg => arg
```

2. 泛型约束

就好比变量会在编译时才知道具体的值，泛型也是在编译时才知道具体的类型。可是，诸如 number 类型没有 `length` 属性，这个时候需要进行泛型约束。

```ts
interface ILength {
  length: number
}
function identityLen<T extends ILength>(arg: T): number {
  return arg.length
}
```

这种情况下，泛型就不能应用于任何类型了。

```ts
identityLen(3) // error
identityLen({ length: 10, value: 3})
identityLen([1, 2, 4])
```

3. 数组泛型

```ts
function reverseArr<T>(arg: T[]): T[] {
  return arg.revrese()
}
```

## Index Type

我们通常有这样的场景，我们的项只属于某个接口中定义的声明。比如 pluck 函数：选取对象的子集。

```ts
function pluck<T, K extends keyof T> (O: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}
```

1. keyof

keyof，即 index type query operator。对于任何类型 `T`, `key of T` 是 `T` 上已知的公有属性名的联合。

```ts
interface IPerson {
  name: string;
  age: number
}
let UPersonProps: keyof IPerson // 'name' | 'age'
```

2. Indexed Access Operator

T[K]，即 indexed access operator。这意味着 `person['name']` 具有类型 `IPerson['name']`，在例子中就和 string 类型等价。也就是说，只有当返回 `T[K]` 的结果时，编译器会实例化真实的类型。

## Mapped Types

Mapped Types，即类型生产类型。这赋予 TypeScript 非常强大的生命力。

[lib.d.ts](#lib.d.ts) 提供了一些 Mapped Types 的介绍。

## Union Type

联合类型用 `|` 作为标记。

```ts
function handleCommand (command: string[] | string): void {
  // ...
}
```

## Literal Types

字符串字面量类型(String Literal Types) 可以为 JavaScript 变量提供一个准确的值。比如用于 `switch` 的值，比如方向只有 'North'、'East'、'South'、'West' 四个取值。

```ts
// Inline Type Annotation 的方式
let cardinalDirection: 'North' | 'East' | 'South' | 'West'
cardinalDirection = 'East'

// type 的方式
type ICardinalDirection = 'North' | 'East' | 'South' | 'West'
const cardinalDirection = 'East'
```

同理，也有提供 Number 和 Boolean 的 Literal Types 支持。

```ts
type num = 1 | 3 | 5
```

## Null 类型

## Type Alias

类型别名用 `type` 标记。

```ts
type TStrOrNum = string | number
```

## Interface

Interface 是为我们的代码或第三方代码定义 “契约”。Interface 能够描述 JavaScript 中对象拥有的各种各样的外形。

1. 为函数定义契约

```ts
interface ICounter {
  (start: number): string
}
const counter: ICounter = (ar): string => {
  // ...
}
```

2. 为对象方法定义契约

```ts
interface ICounter {
  interval: number;
  reset(): void
}
const counter: ICounter {
  interval: 2,
  reset () {
    //...
  }
}
```

4. 可选参数

```ts
interface ICounter {
  interval?: number
}
```

5. 只读属性

```ts
interface ICounter {
  readonly interval: number
}
```

6. Index Signature

第一类是 number 类型的索引签名。

```ts
interface ICounter {
  [index: number]: string
}
const counter: ICounter = ['xiaoke', 'yuer']
```

第二类是 string 类型的索引签名。明确表明可以使用额外的属性。

```ts
interface IPerson {
  name: string;
  [perosn: string]: any;
}
const person: IPerson = {
  name: 'xiaoke',
  age: 14
}
```

7. class Types - 为 Class 定义契约

implements 意味着，你可以在接口中描述方法，在类中实现它(明确地强制一个类去复合某种契约)。

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

8. 通过 extends 继承接口

```ts
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
const obj = <Square> {}
square.color = "blue"
square.sideLength = 10
```

## 为函数定义类型

1. 具名函数

```ts
function add (x: number, y: number): number {
  return x + y
}
```

2. 匿名函数

```ts
const add: (x: number, y: number) => number = (a: number, b: number): number => a + b
```

3. 类型推断

```ts
const add: (x: number, y: number) => number = (a, b) => a + b
```

## Type Assertion

TypeScript 允许你覆盖它的推断，并且以自己的方式分析它，这种机制就是 类型断言。

1. `<foo>` 的方式

```ts
const foo: any
const bar = <string>foo // bar 现在的类型是 'string' 了
```

+ 但是这种用法在 JSX 的类型断言中，存在歧义。比如 `const foo = <string>bar;</string>;`

2. `as` 的方式

```ts
const foo: any
const bar = foo as string
```

## module

默认情况下，在一个 `.ts` 文件中的代码都属于全局命名空间。

```ts
// test.ts
const foo = 123
```

但任何包含 top-level import 和 export 的文件都会当做一个模块(这一点 TypeScript 和 ECMAScipt 2015 一致)。

### 模块路径

和往常一样，TypeScript 提供相对模块路径和动态模块路径两种引入方式，采用 place 的查找策略。

+ 如果 `place` 是一个文件，nice。
+ 否则，如果 `place` 是一个文件夹，并且存在 `index.ts` 文件，nice。
+ 否则，如果 `place` 是一个文件夹，并且存在一个 `package.json` 文件，并且该文件指定了类型文件的存在(通过 `typing` 字段)，nice。
+ 否则，如果 `place` 是一个文件夹，并且存在一个 `package.json` 文件，并且该文件指定了入口(main 字段)文件的存在，也是 ok 的。

### 引入第三方库

1. 第三方库提供 TypeScript 支持

从上面可以了解到，如果引入的第三方库提供了 TypeScript 支持(通过查看其目录下的 `package.json` 文件的 `typing` 字段)，我们就想往常一样引入就可以了。

比如，`vuex-class` 库，其 `package.json` 的内容有。

```json
{
  ...
  "typings": "lib/index.d.ts",
  ...
}
```

2. 使用 @type

有些库本身不提供 TypeScript 支持。因此出现了这样的一个叫 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 的库，为常见的库提供类型定义。

比如，引入 `ramda` 函数库。

```bash
-> npm install -s ramda
-> npm install -s @types/ramda
```

3. 为自定义的库写声明文件

无可避免的，会有一些无人维护其类型定义的库。比如一个叫 `foo` 的模块。

```ts
// globals.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

当然，最便捷的就是。

```ts
// globals.d.ts
declare module 'foo'
```

如何高质量的书写类型定义，官方文档提供了[详细的介绍](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)。

## namespace

额，下面的代码在 JavaScript 是种普遍的方式。

```ts
(function(obj) {
  obj.foo = 123;
})(obj || (obj = {}));
```

我们可以通过 `obj.foo` 获取到 `foo` 属性。现在，我们通常通过 `export` 和 `import` 来实现这点。但 TypeScript 通过 namespace 来支持这种方式。

namespace 有点类似于一个全局对象。

```ts
// Utility.ts
namespace Utility {
  export function log(msg) {
    // ...
  }
  export function error(msg) {
    // ...
  }
}

// usage.ts
/// <reference path="Utility.ts" />
Utility.log()
```

+ 推荐使用一个 namespace 模块，用来快速移植旧的代码
+ 模块里不要使用命名空间

## Ambient Declarations

在 TypeScript 中，是无法使用未被声明的变量。Ambient Declarations(环境声明) 允许你安全地使用第三方库。

通常，会使用 `.d.ts` 后缀的文件来保存这些声明(比如，命名为 `global.d.ts` 或 `vendor.d.ts`)。如果一个文件的扩展名为 `.d.ts`，这意味着每个 top-level 的声明必须以 `declare` 关键字作为前缀。

`declare` 关键字来告诉 TypeScript，我们正在表述一个在其他地方已经存在的代码(模块或变量)。

## 引入第三方库

我们来结合 `declare` 和 `module` 或 `namespace` 来对第三方库进行声明。

1. 声明一个全局模块

这可以用来解决查找模块路径的问题

```ts
declare module '@napos/melody-os'
```

2. lib.d.ts

安装 TypeScript 是，会顺带 `lib.d.ts` 等声明文件。此文件包含了 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

```ts
const foo = 123
const bar = foo.toString()
```

上述代码运行正常，就是因为 `lib.d.ts` 为所有 JavaScript 对象定义 `toString()` 方法。

`lib.d.ts` 的内容主要有一些变量声明。示例：

```ts
// 全局变量 window 被定义为
declare var window: Window
// Window 接口被定义为
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
  animationStartTime: number;
  applicationCache: ApplicationCache;
  clientInformation: Navigator;
  closed: boolean;
  crypto: Crypto;
  // so on and so forth...
}
```

3. Declaration Merging

在 TypeScript 中，接口是开放的。这意味着当你想使用不存在的成员时，你仅仅是需要添加它们至 lib.d.ts 中的接口声明中，即 Declaration Merging(声明合并)。

推荐创建一个 `globals.d.ts` 的文件。举例。

(1) 添加至 Window 接口

```ts
interface Window {
  $ENV: string
}
```

(2) 添加至 Math 接口

Math 在 `lib.d.ts` 声明如下：

```ts
// 全局变量 Math 被定义为
declare var Math: Math
// 接口 Math 被定义为
interface Math {
  E: number;
  LN10: number;
  // others ...
}
```

通过 Declaration Merging 在 Math 全局变量上添加你需要的属性，直接把它添加至 Math 的全局接口上即可。

```ts
interface Math {
  seedrandom(seed?: string): void;
}
```

## declare global

前文中提到过: 任何包含 top-level import 和 export 的文件都会当做一个模块。因此，在模块内部添加声明到全局作用域可以使用 `declare global`。[参考](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

```ts
export class Observable<T> {
  // ... still no implementation ...
}
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}
Array.prototype.toObservable = function () {
  // ...
}
```

## lib.d.ts

我们可能好奇，为啥 JavaScript 官方的一些 api，不需要我们写类型声明。这是因为 TypeScript 已经为我们定义好了。所有的内容都放在 [lib.d.ts](https://github.com/Microsoft/TypeScript/tree/master/lib) 中了。

我们首先看一下 [lib.es2015.core.d.ts](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es2015.core.d.ts)，这个文件包含了 ES6 的一些核心 api 的声明。

举例说明：

```ts
interface Math {
  /**
  * Returns the number of leading zero bits in the 32-bit binary representation of a number.
  * @param x A numeric expression.
  */
  clz32(x: number): number;

  /**
    * Returns the result of 32-bit multiplication of two numbers.
    * @param x First number
    * @param y Second number
    */
  imul(x: number, y: number): number;
}
```

接下来的重点是看一下 TypeScript 官方提供的一些工具泛型(即，Mapped Types) 或 类型。

### Partial

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

这里有三个关键点：

+ `in` 关键字
+ `keyof` 关键字，即 index type query operator
+ `T[P]`，即 indexed access operator

那么，这个 Mapped Types 的意思就很明确了：使类型 `T` 中的属性变为可选(optional)。用法如下：

```ts
interface IPerson {
  name: string,
  age: number
}
type TPersonPartial = Partial<IPerson>

const personPartial: TPersonPartial = {
  name: 'xiaoke'  // 不会报错
}
```

举例： 比如用在 JavaScript 的 merge 操作

```js
const merge = (person: IPerson, patch: Partial<IPerson>) {
  return { ...person, ...patch }
}
```

### Readonly

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
```

同理，很好理解：使类型 `T` 中的属性变为可选(readonly)。

### Required

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Required<T> = {
    [P in keyof T]-?: T[P]
}
```

比较有意思的点在于 `-?` 标记，作用和 `?` 相反：使类型 `T` 中的属性变为必选(required)。

### Pick

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

`keyof` 配合 `extends` 的效果就是：从 `T` 中取出一系列 `K` 的属性。用法如下：

```ts
interface IPerson {
  name: string,
  age: number
}

type TPersonPartial = Pick<IPerson, 'name'>

const personPartial: TPersonPartial = {
  name: 'xiaoke'
}
```

### Omit

和 `Pick` 相反的操作，是 `Omit`。自定义 `Omit` 类型如下。

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
```

是的，我们用了 `Pick` 和 `Exclude` 类型来生成我们的 `Omit` 类型。

```ts
interface IPerson {
  name: string,
  age: number
}

type TPersonPartial = Omit<IPerson, 'name'>

const personPartial: TPersonPartial = {
  age: 18
}
```

### Record

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T
}
```

`keyof any` 有点意思，是什么呢？

```ts
const TWhatIsTheFxxk = keyof any  // string | number | symbol
```

所以含义应该是：将一系列属性 `K` 的属性值变成类型 `T`。都用法如下。

```ts
type TPerson = Record<'name' | 'age', string>
const person = {
  name: 'xiaoke',
  age: '18'
}
```

举例：在 JavaScript 枚举及其对应的映射

```ts
type TOperatingCode = 'EDIT' | 'ADD'
interface IOperatingDesc {
  name: string;
  func: () => void;
}

const operationMap: Record<TOperatingCode, IOperatingDesc> = {
  EDIT: {
    name: '编辑',
    func: edit
  },
  ADD: {
    name: '添加',
    func: add
  }
}

function add() {
  //
}

function edit () {
  //
}
```

### Exclude

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Exclude<T, U> = T extends U ? never : T
```

这里有个[新语法](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html)：`T extends U ? never : T`，这个好像是三元运算符。举例：

```ts
T extends U ? X : Y
```

如果 `T` is assignable to `U` 的话，就会返回 `X`，否则 `Y`。

那 `Exclude` 类型的含义是：从 `T` 中剔除那些可以赋值给 `U` 的类型。

### Extract

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type Extract<T, U> = T extends U ? T : never
```

和 `Exclude` 类型类型相反：从 `T` 中抽取那些可以赋值给 `U` 的类型。

### NonNullable

定义在源文件 [lib.es5.d](https://github.com/Microsoft/TypeScript/blob/master/src/lib/es5.d.ts) 中：

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

从 `T` 中剔除那些可以赋值给 `null` 和 `undefined` 类型。


## tsconfig.json

tsconfig.json 文件指定用来编译这个项目的根文件和编译选项。编译选项可以参考[Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Recap

### 简单类型的写法

```ts
const a: String = 'xiaoke'
const b: Boolean = false
const c: Number = 10
const d: null = null
const e: undefined = undefined
```

### 数组的写法

```ts
// 方式一：类型 + []
const arr: Number[] = [1, 2, 3]

// 方式二：数组泛型
const arr: Array<Number>= [1, 2, 3]

// 方式三：用索引签名
interface NumArr {
  [index: number]: number
}
const arr: NumArr = [1, 2, 3]

// 方式四：Inline Type Annotation
let arr: {
  [index: number]: number
}
arr = [1, 2, 3]
```

### 简单对象的写法

```ts
// 方式一：interface 的方式
interface IPerson {
  name: string;
  age: number;
}
const person: IPerson = {
  name: 'xiaoke',
  age: 18
}

// 方式二：Inline Type Annotation
let person: {
  name: string;
  age: number;
}
person = {
  name: 'xiaoke',
  age: 18
}
```

### 无法确定对象的属性的写法

```ts
// 利用索引签名
interface IPerson: {
  [key: string]: number | string
}
```

### 函数的写法

1. 函数声明

```ts
// 函数声明的方式
function (x: number, y: number): number {
  return x + y
}

```

2. 函数表达式

```ts
// 方式一：函数表达式方式
const sum: (x: number, y: number) => number = (x, y) => x + y

// 方式二：interface 的方式
interface ISum {
  (x: number, y: number): number
}
const sum: ISum = (x, y) => x + y
```

### 字符串约束的写法

有时候，我们可能需要约束某些变量只能取固定的几个值。比如创建一张卡片，我们约束卡片的类型只有 “新建”(new) 和 “更新”(update)。我们可以这样写。

```ts
// 利用字面量类型
type TCardType = 'new' | 'update'
const card: TCardType = 'new'

// 或者 enum 方式(这类方式指的再考虑下)
enum ECardType = {
  New: 'new';
  Update: 'update'
}
const card: string = ECardType.New
```

同理，可以推广到其他类型。

```ts
type INum = 1 | 3 | 5
const num: INum = 3
```

## Protips

### 使用 ReadonlyArray

### 正确使用泛型

泛型和 any 类型有那么点相似。在使用泛型的时候，首先应该思考的是：想用泛型提供怎样的约束。

比如一个函数：

```ts
function foo<T> (arg: T): void {
  // Do something
}

// 和下面相比安全性似乎并没有提升
function foo (arg: any): void {
  // Do something
}
```

即，在参数和返回值之间提供约束。

### 用 typeof 定义类型

在上面的很多例子中，我们都是先定义了类型，再定义变量。

```ts
interface IPerson {
  name: string;
  age: number;
}
const person: IPerson = {
  name: 'xiaoke',
  age: 18
}
```

有一种更为直接的方法是利用 `typeof`。

```ts
const person = {
  name: 'xiaoke',
  age: 18
}
type TPerson = typeof person
```

### Lint

目前 TypeScript Lint 的方案有两种。

1. 使用 [TSLint](https://palantir.github.io/tslint/)

2. 使用 [ESLint](https://eslint.org/) + [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

智能提示是 TypeScript 一个非常惹人喜爱的一点。对于 Visual Code，可以在 IDE 中集成 ESLint 和 TSLint 来提供智能提示的功能。分别安装 [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和 [TSLint extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)。

注意，ESLint 默认是不会检查 `.ts` 文件的，因此需要在 `setting.json` 文件中添加对 TypeScript 的支持。可以详细阅读其 readme。

```ts
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ]
}
```

而对于 TSLint，即装即用。

Q: VSCode 提供的 TSLint extension 并不支持 `vue`。对于常年使用 `vue` 的用户，可以考虑使用 [TSLint Vue](https://marketplace.visualstudio.com/items?itemName=prograhammer.tslint-vue)。这个 extension 拷贝了官方的 TSLint extension，并提供了对 `.vue` 文件的支持。[仓库地址 vscode-tslint-vue](https://github.com/prograhammer/vscode-tslint-vue)。使用方式是 disable 掉 TSLint extension，启用 TSLint Vue 即可。

### TypeScript 编译后的 JavaScript

如果你想知道你的 TypeScript 最终编译成什么样的 JavaScript 代码，有以下方法:

1. 通过 tsc 命令

首先，需要通过 `npm` 安装 `TypeScript`。

```bash
$ npm install -g typescript
```

然后，编写你的 `.ts` 文件并执行命令：

```bash
tsc yourfile.ts
```

2. 直接通过官网的 PlayGround

官方提供了 [PlayGround](http://www.typescriptlang.org/play/index.html) 可直接查看编译后的代码。

## Good example

### swap 函数

```ts
function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
```

## REFERENCE

1. [TypeScript Deep Dive](https://legacy.gitbook.com/book/basarat/typescript/details) 一本比较通俗的 JavaScript

2. [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/) 上面的中文译本

2. [Vuex and Typescript](https://codeburst.io/vuex-and-typescript-3427ba78cfa8) 将 TypeScript 和 Vuex 结合的文章

3. [VueJS Typescript with Vuex using Vue-CLI 3](https://github.com/eladcandroid/typescript-vuex-example) 引用 2 的代码实现

4. [代码检查](https://ts.xcatliu.com/engineering/lint.html) Lint 的一些内容

5. [巧用 Typescript (二)](https://zhuanlan.zhihu.com/p/64423022)