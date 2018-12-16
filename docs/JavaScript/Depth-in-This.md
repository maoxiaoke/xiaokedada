# this 的挑战

TODO:

- [ ] why this

## Overview

JavaScript 颇让费解的东西 this 为何出现呢，机制是 **提供更优雅的方式来隐式地“传递”一个对象引用**。

每个函数在被调用时都会自动取得两个特殊的变量: this 和 arguments。需要说明的是，this 不是编写时绑定，而是 **运行时** 绑定。它依赖于函数调用的上下文条件。this 绑定与函数声明的位置没有任何关系，而与函数被调用的方式紧密相连。

首先，提到台面上来。**this 是一个完全根据调用点(call-site)来为函数调用建立绑定。**

> 这句话不太好理解

决定 this 的指向有四种规则。

## 默认绑定

这种 this 规则是在没有其他规则适用情况下的默认规则。

最常见的情况就是： 独立函数调用。

```js
function foo() {
    console.log( this.a ); // 2
}
var a = 2;
foo(); //函数的调用点
```

foo() 被一个直白的，毫无修饰的函数引用(即 foo，对于命名函数来讲，它就是一个引用)调用的，所以 this 指向全局对象(Global)。

> 如果 strict mode 在这里生效，那么对于*默认绑定*来说全局对象是不合法的，所以 this 将被设置为 undefined。

## 隐式绑定

第二种规则是考虑**调用点是否有一个上下文对象(context object)**。

```js
function foo() {
    console.log( this.a ); // 2
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 调用点
```

foo() 被声明然后作为引用属性添加到 obj。调用点使用 obj 这个上下文(环境) 来调用 foo() 函数，可以说 obj 对象在函数被调用的时间点上“拥有”或“包含”这个函数引用。所以，obj 就是 foo() 调用的 this。

**敲黑板，划重点了**

### 绑定丢失

当一个 隐式绑定丢失了它的绑定，这通常意味着它会退回到 默认绑定。

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数引用！
var a = "oops, global"; // `a` 也是一个全局对象的属性
bar(); // "oops, global"
```

尽管 bar 似乎是 obj.foo 的引用，但实际上它只是另一个 foo 本身的引用而已。**起作用的调用点是 bar()**，一个直白，毫无修饰的调用。所以，默认绑定适用在这里。

更意外的一种方式是当我们考虑**传递一个回调函数**时:

```js
function foo() {
 console.log( this.a );
}
function doFoo(fn) {
    // `fn` 只不过 `foo` 的另一个引用
    fn(); // <-- 调用点!
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // `a` 也是一个全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

和上面的例子一致，fn 不过是 foo 的另一个引用，所以结果和上面的例子一样。


## 显式绑定

如果你想强制一个函数调用使用某个特定对象作为 this 绑定，具体地说，函数拥有 `call()` 和 `apply()` 方法，它们提供一些特殊的功能。你创建的所有函数，都可以访问 call() 和 apply()。

这些工具接收的第一个参数都是一个用于 this 的对象，之后使用这个指定的 this 来调用函数。

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
foo.call( obj ); // 2
```

但是，单独依靠 显式绑定 并不能解决函数“丢失”自己原本的 this 绑定的这个问题。

> ??? why??

我们还是用一个回调函数来讨论一下:

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // `a` 也是一个全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
```

在我们的函数调用点处产生了 隐式丢失 的情况。如果此处我们使用显式绑定 `call()`。

```js
setTimeout( obj.foo.call(obj), 100 ); //throw new TypeError('"callback" argument must be a function');
```

报错的信息是*回调参数必须是一个函数*。所以我们改成这样就顺利通过了。

```js
setTimeout( function () {
    obj.foo.call(obj);
}, 100 ); // "oops, global"
```

### Hard Binding

Hard binding 是 明确绑定 的一个变种。

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
var bar = function() {
    foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
```

> `bar` 将 `foo` 的 `this` 在函数内部强制绑定到 `obj`。之后，无论怎样调用函数 `bar()`，它总是手动使用 obj 调用 foo。这种绑定态度明确又坚定，所以称之为 hard binding。

hard binding 的用法一：为所有传入的参数和传出的的返回值创建一个通道

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}
var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments );
};
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

hard binding 的用法二：创建一个可复用的帮助函数

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}
// 简单的 `bind` 帮助函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    };
}
var obj = {
    a: 2
};
var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

正因为 harding 是一个如此常用的模式，ES5 将它作为内建工具提供: `Function.prototype.bind`。

比如上面的例子。

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}
var obj = {
    a: 2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

在比如我们 隐式丢失 的那个例子:

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // `a` 也是一个全局对象的属性
setTimeout( obj.foo.bind(obj), 100 ); // "oops, global"
```

## new 绑定

这是最后一种 this 绑定规则。在 JavaScript 中，“构造器”仅仅是一个函数，也叫做构造函数。不依附于类，也不初始化一个类，甚至都不是一种特殊的函数种类。本质是一般的函数，只是被使用 `new` 来调用时改变了行为。

在函数前面加入 new 调用时，会自动完成下面的事情:

+ 一个全新的对象被构建
+ 这个新构建的对象会被接入原型链
+ 新构建的对象被设置为函数调用的 this 绑定
+ 除非函数返回一个它自己的其他对象，否则这个被 new 调用的函数将自动返回这个新构建的对象

```js
function foo(a) {
    this.a = a;
}
var bar = new foo( 2 );
console.log( bar.a ); // 2
```

## 四种规则的顺序

1. 函数是通过 new 被调用的吗(new 绑定)？如果是，this 就是新构建的对象。
```js
var bar = new Foo()
```
2. 函数是通过 call 或 apply 被调用(显式绑定)，甚至是隐藏在 bind 硬绑定 之中吗？如果是，this 就是那个被明确指定的对象。
```js
var bar = foo.call( obj2 )
```
3. 函数是通过上下文对象(也称为拥有者或容器对象)被调用的吗(隐式绑定)？如果是，this 就是那个环境对象
```js
var bar = obj1.foo()
```
4. 否则，使用默认的 this(默认绑定)。如果在 strict mode 下，就是 undefined，否则是 global 对象。
```js
var bar = foo()
```

## 在闭包中使用 this

匿名函数的执行环境具有全局性，因此其 this 对象 **通常** 指向 global 对象。

```js
var a = 0;
function foo(){
    /*
    ... 这些范围内，this 指向 obj
    */
    function test(){
        console.log(this.a);
        /*
        ... 这些范围内，this 指向 global
        */
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//0
```

这种情况其实也是可以使用我们的四个规则来进行判断的，首先看我们的调用点。第一个调用点是 `obj.foo()` 这种是满足我们 隐式绑定规则的，this 指向我们的 obj。接着我们的第二个调用点是 `obj.foo()()`，这种是非常直白的函数调用，所以退回到 默认绑定，this 指向 global 对象。上面的例子和下面的写法一致，但是表意更清楚。

```js
var a = 0;
function foo(){
    /*
    ... 这些范围内，this 指向 obj
    */
    function test(){
        console.log(this.a);
        /*
        ... 这些范围内，this 指向 global
        */
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
var bar = obj.foo();
bar();
```

我们通常采用**将外部的 this 保存到一个闭包能访问的变量里**来访问该对象。

```js
var a = 0;
function foo(){
    var self = this;
    /*
    ... 这些范围内，this 指向 obj
    */
    function test(){
        console.log(self.a);
        /*
        ... 这些范围内，this 指向 global
        */
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()(); // 2
```

这似乎是不错的解决方案，但都是为了逃避 this 而非接受它。

## IIFE 中使用 this

通常说，IIFE 中的 this 指向 global 对象。下面是一个非常简单的 IIFE 函数。

```js
var name = 2;
(function () {
    var name = 3,
        self = this;
    console.log(self.name);  // 2
})();
```

但是，上述的代码和下面的代码没有任何区别:

```js
var name = 2;
function foo() {
    var name = 3,
        self = this;
    console.log(self.name);  // 2
}
foo();
```

很浅显了吧，非常直白的 默认绑定。

## 传递 null 或 undefined

如果你传递 null 或 undefined 作为 call、apply 或 bind 的 this 绑定参数，那么这些值会被忽略掉，取而代之的是 默认绑定 规则将适用于这个调用。

```js
function foo() {
    console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
```

### 什么时候需要传递 null 或 undefined

一种常见的做法是使用 `apply()` 来 “展开” 一个数组，并当做参数传入一个函数。举个例子，`Math.prototype.max` 不支持数组作为参数传入，但既然我们不关心 `this` 的话，将 `null` 作为一个占位符可能是个不错的选择。

```js
const numbers = [5, 6, 2, 3, 7]
Math.max.apply(null, numbers)

// ES6
Math.max(...numbers)
```

在 ES6 中可以使用 spread(`...`) 运算符规避这种写法。

另外一种情况是我们使用 `bind()` 来实现函数的柯里化，可以将 `null` 作为一个占位符传递。

```js
function sum (a, b) {
    return a + b
}
const half = sum.bind(null, 2)
half(3) // 5

// 正常的 柯里化 函数
const sum = b => a => a + b
```

上面的这些做法都可能会产生副作用。比如在函数内确实使用 `this`，我们能否保证函数内的 `this` 正常使用呢。答案是否定的。更安全的做法是传入一个 “特殊” 的对象，就算是函数内的 `this` 绑定到这个对象，也不会对我们的程序产生什么可怕的破坏力。因为 `this` 的使用都会限制在这个空对象中，从而不会对全局的对象产生任何印象。

```js
// 这是我们的安全对象
const ø = Object.create(null)

const half = sum.bind(ø, 2)
```

## 不要绑得太紧

当我们使用 `bind` 进行强制 hard binding 时，这意味着无法再使用隐式绑定或显式绑定来修改 `this`。

```js
function foo() {
    return this.a
}
const objA = { a: 'a' }
const objB = { a: 'b' }
const bar = foo.bind(objA)
bar()   // 'a'

bar.call(objB)  // 'a'
```

这种行为表现得有点太过强硬了。我们可以实现一种稍微 “软” 一点的绑定。

```js
Function.prototype.softBind = function (obj, ...keys) {
    const fn = this
    const curried = keys
    const bound = function (...args) {
        return fn.apply(
            (!this || this === (window || global)) ? obj : this,
            curried.concat(args)
        )
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
}
```

看一下这个函数的功能：

```js
function foo() {
    return this.a
}
const objA = { a: 'a' }
const objB = { a: 'b' }
const bar = foo.softBind(objA)
bar()   // 'a'

bar.call(objB)  // 'b'
```

## call、apply 和 bind

`call()` 和 `apply()` 的区别不再赘述，我们这里想要关注的是 **它们的返回值**。返回值是它们与 `bind()` 函数的区别。在 MDN 中，是这样描述的:

> The result of calling the function with the specified this value and arguments. -- MDN

官方文档的描述在这里: [Function.prototype.apply](http://es5.github.io/#x15.3)

> Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and argList as the list of arguments. -- [ES5]

两者表达一个意思，就是返回 **调用函数的使用特定的 this 和参数所返回的结果**。

举个例子:

```js
function foo(b) {
    console.log(this.a,b.name); //2 'yuer'
}
var obj = {
    a: 2
};
console.log(foo.call(obj,{name:'yuer'})); //undefined
```

调用函数 `foo()` 没有返回值，所以返回的是 `undefined`。

```js
function foo(b) {
    console.log(this.a,b.name); //2 'yuer'
    return b;
}
var obj = {
    a: 2
};
console.log(foo.call(obj,{name:'yuer'})); //{ name: 'yuer' }
```

`foo()` 有返回值，所以返回 `foo()` 的返回值。

而，`bind()` 函数返回的是一个 **新的函数**。

> The bind method takes one or more arguments, thisArg and (optionally) arg1, arg2, etc, and returns a new function. -- -- [ES5]

也就是说，参数设置 `bind()` 和 `call()` 是一样的，但是，`bind()` 返回一个函数的拷贝。

```js
function foo(b) {
    console.log(this.a,b.name);
    return b;
}
var obj = {
    a: 2
};
console.log(foo.bind(obj,{name:'yuer'})); //[Function: bound foo]
```

这也就解释了我们上面提到的 *call() 和 apply() 无法解决隐式绑定丢失的问题*，就是因为要求返回的是一个函数，而 `bind()` 正好有这个功能。

## 箭头函数

ES6 的箭头函数和上述四种规则不同的是，**箭头函数从封闭它的(函数或全局)作用域采用 this 绑定。**

最常见的用法是用于回调。

```js
function foo() {
    setTimeout(() => {
        // 这里的 `this` 是词法上从 `foo()` 采用
    console.log( this.a );
    },100);
}
var obj = {
    a: 2
};
foo.call( obj ); // 2
```

箭头函数提供除了使用 `bind()` 外，另外一种在函数上来确保 this 的方式。但是这种写法和我们上面提到的 `self = this` 并无二致。也就是说，上面的代码和下面的代码效果一致:

```js
function foo() {
    var self = this;
    setTimeout(function () {
        console.log(self.a);
    },100);
}
var obj = {
    a: 2
};
foo.call( obj ); // 2
```

没啥区别，对吧。所以，总的来说，都和这四种规则分不开。

## new 的四个步骤

+ 一个全新的对象被构建
+ 这个新构建的对象会被接入原型链
+ 新构建的对象被设置为函数调用的 this 绑定
+ 除非函数返回一个它自己的其他对象，否则这个被 new 调用的函数将自动返回这个新构建的对象

这四句话看似简单，实则意义深刻。

第一句，new 出来的是一个新对象。第二句，对象被接入原型链？怎么接入，使用 `__proto__`。第三句，将对象作为构造函数调用的 this 绑定。至此，我们来模拟一下:

```js
function Fun() {
}
Fun.prototype.getName = function(){
    return this.name;
};
Fun.prototype.name = 'yuer';

function objectFac(Fun) {
    var obj = new Object();
    obj.__proto__ = Fun.prototype;
    Fun.apply(obj);
    return obj;
}
var per = objectFac(Fun);
console.log(per.name); // 'yuer'
```

这个看似不错，但是这是一种简单的使用原型来构建对象的一种方法。更一般的，我们是组合使用构造函数模式和原型模式。

```js
function Fun(name){
    this.name = name;
}
Fun.prototype = {
    constructor: Fun;
    getName: function(){
        return this.name;
    }
}
```

这种情况下，我们将 Fun 作为 arguments 的一部分来进行传递。

```js
function Fun(name){
    this.name = name;
}
Fun.prototype = {
    constructor: Fun,
    getName: function(){
    return this.name;
}
};
function objectFac() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);  // arguments 是一个类数组，所以不能直接用数组方法，但是可以借用 Array.prototype 上的方法
    //var Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments); // 可以简单地将 arguments 作为参数传递，但是没有办法使用数组方法
    return obj;
}

var per = objectFac(Fun,'yuer');
console.log(per.name);
```

上述代码实现了 new 操作符的第一、二和三步。即，创建新的对象、接入原型链、改变 this 的指向。那第四部如何理解呢？我们看一下简化例子:

```js
function Fun(name){
    this.name = name;

    return {
        who: 'xiaoke',
        what: 'love',
        how: 'yuer'
    }
}
Fun.prototype = {
    constructor: Fun,
    getName: function(){
    return this.name;
}
};

var per = new Fun('yuer');
console.log(per); // { who: 'xiaoke', what: 'love', how: 'yuer' }
console.log(name); // undefined
```

构造函数有返回值，我们只能访问返回内容中的属性。这也就是 new 操作符的第四项内容。然后我们要如何处理 objectFun() 函数呢，也就是说，我们需要判断构造函数是否有返回值，如果有，就返回构造函数的内容。

```js
function Fun(name){
    this.name = name;

    return {
        who: 'xiaoke',
        what: 'love',
        how: 'yuer'
    }
}
Fun.prototype = {
    constructor: Fun,
    getName: function(){
    return this.name;
}
};
function objectFac() {
    var obj = new Object();
    //var Constructor= Array.prototype.shift.call(arguments);
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);

    return typeof ret == 'object' ? ret : obj;
    return obj;

}

var per = objectFac(Fun,'yuer');
//var per = new Fun('yuer');
console.log(per);
```

## Reference

+ 《You Don't Know JS》
+ 《JavaScript 高级程序设计》
+ [不用call和apply方法模拟实现ES5的bind方法](https://github.com/jawil/blog/issues/16)
+ [JavaScript深入之new的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)