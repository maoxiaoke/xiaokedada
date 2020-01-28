# Do's and Don's of Typescript

1. Object \ object \ {}

2. 泛型 & any

## Names

1. 类型名使用名词或名词短语
2. Mapped Type 使用动词或动词短语

## Format

1. 类型前包含空格

```ts
const foo: string = 'hello'
```

2. 使用分号

```ts
interface Person {
  name: string;
  age: number;
}
```

## Function

1. 尽量不要使用 interface 定义函数类型

```ts
// Bad
interface Sum {
  (x: number, y: number): number;
}
const sum: Sum = (x, y) => x + y

// May be more acceptable
const sum: (x: number, y: number) => number = (x, y) => x + y;
```

2. 为了清晰地表达函数定义，可以将参数格式化分行

```js
// Bad
const foo = (value: Record<'code' | 'token', string>, error: Error) => {
  // do something
}

// May be more acceptable
const foo = (
  value: Record<'code' | 'token', string>,
  error: Error,
) => {
  // do somethings
}
```

## Interface

1. 接口命名使用 `PascalCase`
2. 接口名前不加前缀 `I`

  注：在接口命名加上前缀 `I` 没有特别的用处。

3. 接口成员声明顺序
  (1) readonly 属性
  (2) 必选属性
  (3) 可选属性
  (4) 函数定义
  (5) index signature

```ts
interface Props {
  readonly name: string;
  age: number;
  height?: number;
  setAge: (age: number) => void;
  [prop: string]: any;
}
```

4. 对象字面量初始化时金添加属性初始化

```ts
interface Person {
  name: string;
  age: number;
}

// Harmful
const me = {} as any
me.name = 'defaultName'
me.age = 18

// More acceptable
const me = {
  name: 'defaultName',
  age: 18,
}

// An alternative
const me = {} as Person
```

## Generics

1. 尽可能为泛型提供约束

## Type Annotations

1. 让编译器自动推断类型

```ts
const foo = 'hello'
```

## 项目实践

**基本原则：足够就好，而非越具体越好。**

1. 不复杂、不复用的类型不过度封装

```ts
// Bad
interface Value {
  code: string;
  token: string;
}

const foo = (value: Value, error: Error) => {
  // do something
}

// May be more acceptable
const foo = (
  value: Record<'code' | 'token', string>,
  error: Error,
) => {
  // do somethings
}
```

2. 尽量单文件能包含自身需要的所有类型

3. 统一对外导出类型与实现

```ts
// Bad
import defaultExport from './components/Counter'
import { exportInterface } from './components/Counter/types'

// Mab be more acceptable
import defaultExport, { exportInterface } from './components/Counter'
```

4. 不要导出类型，除非类型在其他模块使用到


## 附录

### `Object`、`{}` 和 `object` 三种类型的区别



### extends vs & vs implements

[Difference between extending and intersecting interfaces in TypeScript?](https://stackoverflow.com/questions/52681316/difference-between-extending-and-intersecting-interfaces-in-typescript)

### Object.keys

## Utility Types

1. `Primitive`

[utility-types](https://github.com/piotrwitek/utility-types#valuestypet)

[Flow Utility Types](https://github.com/piotrwitek/utility-types#valuestypet)

[TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypet)

## TypeScript Evolution

###  Basic Types

1. `--strictNullChecks` 约束

在版本 [2.0] 引入了 `--strictNullChecks` 这条规则。在这条规则下，值 `null` 和 值 `undefined` 只能赋值其本身的 `null`、`undefined` 和 `any` 类型(一个特例是，值 `undefined` 可赋值 `void` 类型)。

禁用这条规则后，`null` 和 `undefined` 类型是其他类型的 *子类型*。这意味着，值 `null` 和 `undefined` 可以赋值给 `number`、`boolean` 等类型的变量。

`--strictNullChecks` 约束可在 `tsconfig.json` 中开启(或关闭)。

```ts
// Compiled with --strictNullChecks
const x: number = null; // Error
const y: null = null; // Ok
const z: void = undefined; // Ok
```

> 问题：为何，值 `undefined` 可赋值 `void` 类型

2. `Object`、`{}` 和 `object` 的区别

`Object` 是官方使用 interface 定义的一个类型(不属于基本类型的范畴)，定义了 `Object.prototype` 的所有方法(我们知道，所有的对象都继承自 `Object.prototype`)。[如下]()：

```ts
interface Object {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
}
```

在 `--strictNullChecks` 约束下，所有的 Primitive 值和 Non-Primitive 值都可以赋值给 `Object`。

```ts
type Is = String extends Object ? String : Object
// type Is = String
```

`object` 类型是版本 [2.2] 引入的用于标记 Non-Promitive 值的 **基本类型**。

```ts
const obj: object = 'xiaoke'
// Error: Type '"xiaoke"' is not assignable to type 'object'.(2322)
```

`{}` 类型，表示一个对象没有任何成员，但可以使用 `Object` 类型定义的所有方法。`{}` 类型 和 `Object` 类型表现一致，可以认为两者是等价的。

```ts
let obj: {}   // `let obj = {}`
obj = { name: 'xiaoke' }

obj.name
// Error: Property 'test' does not exist on type '{}'.(2339)

obj.toString()
```

3. 认识 `any`、`never`、`void`、`unkonwn` 等基础类型

`any` 类型的变量可以被其他任意类型的值赋值(`--strictNullChecks` 约束下, 值 `undefined` 和 值 `null` 仍可以赋值给 `any` 类型的变量)。*我们理解为，`any` 类型是TypeScript 类型系统的「逃离舱」*

```ts
const x: any = null; // Ok
const y: any = 2; // Ok
```

`never` 类型表示 *永远不会出现的值的类型*。这个类型有以下特点：

+ `never` 类型是任意类型的 **子类型**。

## ts 模块系统


## 问题

1. Function default params & generics

有一个函数：

```ts
function test<T = object, U> (a: string, b: T): Promise<U> {
  //
}
```

比如 b 的类型是 object，但是如果不传的话。希望 b 默认是一个空对象，空对象会被 typescript 推断为 `{}` 类型。但是 Primitive Value 和 Non-Primitive Value 都可以赋值给 `{}` 类型。暂时目测可能比较好的方式是：

```ts
function test<T = object, U> (a: string, b = {} as T): Promise<U> {
  //
}
···

2. 声明文件

场景一：第三方库不存在声明文件
场景二：第三方库的声明文件有问题，或者不准确

https://ts.xcatliu.com/basics/declaration-files#zai-npm-bao-huo-umd-ku-zhong-kuo-zhan-quan-ju-bian-liang

