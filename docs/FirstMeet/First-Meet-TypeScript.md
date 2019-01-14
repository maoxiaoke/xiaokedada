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
let person = {
  name: string,
  age: number
}
person = {
  name: 'xiake',
  age: 18
}
```

### Generics

泛型是类型的 “类型”。我们用 `<>` 来告诉你，这是一个泛型。

```ts
function reverse<T> (items: T[]): T[] {
  //...
}
```

### Union Type

联合类型用 `|` 作为标记。

```ts
function handleCommand (command: string[] | string): void {
  // ...
}
```

### Type Alias

类型别名用 `type` 标记。

```ts
type TStrOrNum = string | number
```

### Interface

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

6. 索引签名

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

### 为函数定义类型

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

## tsconfig.json

tsconfig.json 文件指定用来编译这个项目的根文件和编译选项。编译选项可以参考[Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
