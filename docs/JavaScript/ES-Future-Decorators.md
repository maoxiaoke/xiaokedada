# Decorators

目前(2019年)，Decorators 还处于 [ECMAScript Stage2](https://github.com/tc39/proposal-decorators) 阶段。

但是由于 TypeScript，得以广泛使用到它。TypeScript 在这里有介绍 - [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)。

TODo:

- 多个装饰器如何应用

## 语法糖

在目前的方案中，Decorators 仍是一种语法糖的存在。其原理主要是两点：**高阶函数** 和 **属性描述符**。

由于 JavaScript 存在高阶函数，所以可以对函数的功能进行增强。比如：

```js
const logName = name => name
function nameDecorator (wrappedFun) {
  return (...args) => {
    console.log('This is a high order functino example!')
    return wrappedFun.apply(this, args)
  }
}

const logNameWithDecorator = nameDecorator(logName)
logNameWithDecorator('xiaoke')
// This is a high order functino example!
// 'xiaoke'
```

[属性描述符](./Property-Descriptors.md)(Property Descriptors)可以加强对象进行一些控制。比如：

```js
const person = {
  name: 'xiaoke'
}
Object.defineProperty(person, 'name', {
  value: 'mao xiaoke',
  wirtable: false
})
console.log(person.name)
person.name = 'yuer'
console.log(person.name)
// 'mao xiaoke'
// 'mao xiaoke'
```

## Decorator 应用于 Class

Decorator 最常见的应用便是应用于 Class。其中包含三类：**Method Decorators**、**Class Docorators**、**Property Decorators** 和 **Parameter Decorators**。

### Method Decorators

Method Decorators 可以维持，也可以修改、替换一个**类的方法定**义。当调用 decorator 函数时，会传递三个参数：

+ target：静态成员的类构造函数、或者实例成员的类原型
+ name: 类成员的名称
+ descripter: 类成员的属性描述符

举例，@log 描述器的一个简单实现(以 TS 举例)，用以补充 log message。

```ts
function log (target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      console.log('my name is ')
      return original.apply(this, args)
    }
  }
}

class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  @log
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}

const xiaoke = new User('mao', 'xiaoke')
console.log(xiaoke.getName())
// my name is
// mao xiaoke
```

由于高阶函数的原因，JavaScript Decorators 还可以接收参数。比如 @log 接收一个 message 参数：

```ts
function log (message) {
  return (target, name, descriptor) => {
    const original = descriptor.value
    if (typeof original === 'function') {
      descriptor.value = function (...args) {
        console.log(message)
        return original.apply(this, args)
      }
    }
  }
}

class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  @log('hello world')
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}

const xiaoke = new User('mao', 'xiaoke')
console.log(xiaoke.getName())
// hello world
// mao xiaoke
```

### Class Decorators

Class Decorators 应用于**类的构造函数**，用来维持、修改或替换类的定义。因此，Class Decorators 接收一个参数：

+ 类的构造函数

Class Decorators 可以返回 **undefined** 或者 **返回新的构造函数**。不过，**最好非常小心，不要改动原有的原型链**。

下面的例子，会修改 Class 的定义。

```ts
function sealed (constructor) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}
```

下面这个例子，会 override 原有的构造函数。

```ts
function loginStatus <T extends {new(...args:any[]):{}}>(User:T) {
  return class extends User {
    isLoggedIn
    constructor (...args) {
      super(...args)
      this.isLoggedIn = false
    }
    setLoggedIn () {
      this.isLoggedIn = true
    }
  }
}

@loginStatus
class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
}

const user = new User('mao', 'xiaoke')
// class_1 {firstName: "mao", lastName: "xiaoke", isLoggedIn: false}
user.setLoggedIn()
console.log(user)
// class_1 {firstName: "mao", lastName: "xiaoke", isLoggedIn: true}
```

可以看到，Decorators 返回个匿名的类，实现类的继承。

TODO：实际的应用场景在哪里？

### Property Decorators

ES6 的 Class 设计中，[Prototype 中有数据属性被认为是 anti-pattern](./ES6-Class.md)。因此类中并没有数据属性。在 TypeScript 中：

```ts
class User () {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = frist
    this.lastName = last
  }
  get fullName () {
    return this.firstName + ' ' + this.lastName
  }

  User.prototype
  // { constructor: f User(firstName, lastName), getFullName: f getFullName }
```

上面的例子清晰可见，数据属性不存在类中，而在类实例中。目前 [proposal-decorators](https://github.com/tc39/proposal-decorators) 还处于 stage-2 阶段，所以可以持续关注 Property Decorators 的进展，或者是 Babel/TypeScript 有一些什么好的实践。

### Parameter Decorators

Parameter Decorators 用在参数声明前。比如：

```ts
class User () {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = frist
    this.lastName = last
  }

  greeting (@required greetings: string) {
    return 'Hello' + ' ' + greetings
  }
```

同 Property Decorators，我们应当持续关注其进展。

## 编译后的代码

我们说， JavaScript Decorators 是高阶函数的功劳。用 tsc(TypeScript 的编译指令) 编译下面的 Method Decorators。

```ts
function log (target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      console.log('my name is ')
      return original.apply(this, args)
    }
  }
}

class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  @log
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}
```

编译的结果如下：

```js
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function log(target, name, descriptor) {
    var original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('my name is ');
            return original.apply(this, args);
        };
    }
}
var User = /** @class */ (function () {
    function User(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    User.prototype.getName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    __decorate([
        log
    ], User.prototype, "getName", null);
    return User;
}());
```

可见，装饰器是通过 *属性描述符* 修改 `User.prototype` 中的属性值。而 *Property Decorators* 和 *Parameter Decorators* 不存在于类的 prototype 中，需要采取其他额外的方式来处理。

## Reference

1. [JavaScript Decorators: What They Are and When to Use Them](https://www.sitepoint.com/javascript-decorators-what-they-are/)

2. [proposal-decorators](https://github.com/tc39/proposal-decorators)
3. [A minimal guide to ECMAScript Decorators](https://itnext.io/a-minimal-guide-to-ecmascript-decorators-55b70338215e)