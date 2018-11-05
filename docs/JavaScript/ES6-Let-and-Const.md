# 最佳实践，使用 let/const

TODO:

- [ ] 函数的扩展部分也用到了 *temporal dead zone* 这部分内容，建议增加。

## 块级作用域的理解

在 JavaScript 中，很多人会把*块级作用域*和*函数作用域*分离开来。其实，块级作用域(也叫词法作用域)包含两块：

+ 其一就是函数作用域，在函数内部
+ 其二就是块，即 `{}` 中间

所以，JavaScript 引入 `let/const` 就是为了解决第二类块级作用域的问题。

## temporal dead zone

涉及到 let/const 的具体实现方面，会接触到暂时性死区 (TDZ) 这个概念。首先，把我的结论亮出来：**使用 let/const 声明的变量存在 hoisting**。

在编译器在扫描代码发现变量声明时，遇到 var 声明的变量，就将它们提升至**作用域顶部**，遇到 let/const 声明的变量则放入 TDZ 中。**TDZ 在变量声明后终结，而不是赋值后**。在块级作用域结束时，变量立刻被垃圾回收器回收。我们看下面这个例子：

```js
let x = 'outer value';
(function() {
  console.log(x); // Reference error
  let x = 'inner value';
}());
```

这里，如果 let 声明的变量不提升的话，会输出 'outer value'，但实际输出会报错。这就是说 `lex x = 'inner value'` 会被提升，但在声明前无法被访问(放入 TDZ 区域)。

```js
//console.log(aLet); //Reference error
let yuer;
console.log(yuer); // undefined
yuer = 10;
console.log(yuer); // 10
```

上面这段代码是解释 TDZ 的一个 Life cycle。

再看一个例子：

```js
let a = f();
const b = 2;
function f() { console.log (b); } //Reference error
```

> 更多的参考：[What is the temporal dead zone?](https://stackoverflow.com/questions/33198849/what-is-the-temporal-dead-zone) [TEMPORAL DEAD ZONE (TDZ) DEMYSTIFIED](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified) [ES6 In Depth: let and const](https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/) [ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth)

## 不允许重复声明

在使用 var 的时代中，我们可以写出下面的代码：

```js
var xiaoke = 2;
var xiaoke = 3;
console.log(xiaoke);// 3
```

在严格模式下，这段代码是不报错的。但是 let/const 不允许这种行为发生。也就是下面的代码都会报错。

```js
'use strict';
let xiaoke = 1;
var xiaoke = 2;
console.log(xiaoke); //SyntaxError

let love = 1;
let love = 2;
console.log(love); //SyntaxError

var yuer = 1;
let yuer = 2;
console.log(yuer); //SyntaxError
```

const 也是同理。但是注意的是，如果内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量。

```js
let count = 2;
if (condition){
    let count = 3; //对的
}
```

## const 用来声明对象

const 用来表示一个常量，一般来说，我们该为常量使用大写命名，但这适用于一些在执行前就已知的值。对于在执行期间实时计算出来的不变的值，最好使用常规命名。

需要注意的是，const 声明不允许修改绑定，但允许修改值。也就是说，对于引用类型，引用是无法修改的，但所指向的内容是可以的。

```js
'use strict';
const person = {
    name: 'yuer'
};

person.name = 'xiaoke'; // 对

/*
person = {
    name: ‘xiaoke' // SyntaxError
}*/
```

我们可以这样来验证：

```js
'use strict';
const person = {
    name: 'yuer'
};
console.log(Object.getOwnPropertyDescriptor(person,'name'));
/*
{ value: 'yuer',
  writable: true,
  enumerable: true,
  configurable: true }
*/
```

## 全局作用域使用 let/const

全局作用域内使用 let/const 和 var 的一个区别是，var 创建的变量会成为全局对象(通常是浏览器，即 window 对象)的一个属性，也意味着会可能会无意中覆盖已经存在的全局变量。

如果使用 let/const，不会自动添加为全局对象的属性。

## 可以更新的写法

### if/while/for/for...of/for...in 循环

使用 let 代替 var，这没什么好说的。

### 保护现场

在循环中使用函数，经常我们会采用 IIFE 来保护现场。

```js
for (var i = 0; i< 10; ++i){
    setTimeout((function (value) {
        return function () {
            console.log(value);
        }
    })(i),100);
}
```

有了 let/const，就不需要这么折腾了。

```js
for (let i = 0; i< 10; ++i){
    setTimeout(function () {
        console.log(i);
    },100);
}
```

### for...in/for...of 中 const 的异常表现

const 一般不会用在 for 循环中，比如：

```js
for (const i = 0; i< 10; ++i){
    //do something
}
```

i 被声明为常量，在 for 循环中会面临修改。因此会抛出错误。

但在 for...in 和 for...of 中使用不会产生错误：

```js
var obj = {
    name: 'yuer',
    age:22
};
for (const key in obj){
    console.log(key);
}
```

这是因为 for...in/for...of 中，每次迭代不会试图修改已有绑定，而是创建一个新绑定。但是如果你试图修改 key 的值，则会抛出错误：

```js
var obj = {
    name: 'yuer',
    age:22
};
for (const key in obj){
    key = Math.random().toString(); //TypeError
    console.log(key);
}
```

当然了，const 的安全性更强，所以社区的一个做法日益普及：**默认使用 const，只有确实需要改变变量的情况下使用 let**。