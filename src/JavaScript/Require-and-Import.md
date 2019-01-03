# require 和 import 的难点

众所周知，ES6 通过 `import` 和 `export` 来设计模块。但是，当你使用这两者运行于 `Node` 时，是会报错的，原因是：`Node` 并不支持 ES6 的 `import` 和 `export`，而是有自身的一套模块规则 -- [Modules | Node.js v9.8.0 Documentation](https://nodejs.org/dist/latest-v9.x/docs/api/modules.html)。 

`Node` 应用的是一套称为 CommonJS 的一种加载方式，使用 `Module.exports` 和 `require` 来实现模块地加载，CommonJS 也称为服务端的模块加载方式。

那么问题就来了。

## 如何 Node 中写 import

传说(之所以说传说是因为到 v9 的版本还没支持)新的版本会支持 `import`。但目前解决的方案有两种。

- 一种是通过 Babel 进行转义 -- [找回 Node.js 里面那些遗失的 ES6 特性 | Taobao FED | 淘宝前端团队](http://taobaofed.org/blog/2016/01/07/find-back-the-lost-es6-features-in-nodejs/)
- 另一种是通过试验状态的 node 命令 -- [ECMAScript Modules | Node.js v9.8.0 Documentation](https://nodejs.org/api/esm.html)

## Module.exports 和 exports 的区别

在官方的文档中，已经介绍得非常详细了 -- [Modules | module exports](https://nodejs.org/dist/latest-v9.x/docs/api/modules.html#modules_module_exports)

首先，来介绍一下 `Module`。`Module` 在 Node 中是一个 Object，有一个 `exports` 的属性。我们来看一个例子：

```js
// calculator.js
module.exports.add = (a, b) => a + b

console.log(module)

/*
Module {
  id: '/Users/a123456/WebstormProjects/snippets/F-programing/calculator.js',
  exports: { add: [Function] },
  parent: 
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/a123456/WebstormProjects/snippets/F-programing/call-cal.js',
     loaded: false,
     children: [ [Circular] ],
     paths: 
      [ '/Users/a123456/WebstormProjects/snippets/F-programing/node_modules',
        '/Users/a123456/WebstormProjects/snippets/node_modules',
        '/Users/a123456/WebstormProjects/node_modules',
        '/Users/a123456/node_modules',
        '/Users/node_modules',
        '/node_modules' ] },
  filename: '/Users/a123456/WebstormProjects/snippets/F-programing/calculator.js',
  loaded: false,
  children: [],
  paths: 
   [ '/Users/a123456/WebstormProjects/snippets/F-programing/node_modules',
     '/Users/a123456/WebstormProjects/snippets/node_modules',
     '/Users/a123456/WebstormProjects/node_modules',
     '/Users/a123456/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
*/
```

我们在另一个文件 `callCalculator.js` 引入 `calculator.js` 模块，代码如下。打印出 `module` 的结果，是一个再简单不过的对象。

```js
let usage = require('./calculator.js')
usage.add(1,2) // 3

console.log(usage) // { add: [function] }
```

通过以上例子，想说明一下几点：

- `module` 是一个表征当前模块的对象，对外部是隐藏的 (*阅读 calculator.js*)
- `module.exports` 是 `require` 返回对象的引用 (*阅读 callCalculator.js*)

那 `exports` 是怎么回事呢？还不是因为懒呗，`exports` 就是 `module.exports` 的 *shortcut*。

> The exports variable is available within a module's file-level scope, and is assigned the value of module.exports before the module is evaluated. -- `exports` 是存在于模块内，在模块开始的时候被 `module.exports` 赋值。

有点类似于在文件开头，有以下处理：

```js
var module = new Module(...)
var exports = module.exports
```

![](https://i.stack.imgur.com/JzZkz.png)

所以以上的例子可以简写成：

```js
//calculator.js
exports.add = (a, b) => a + b

//callCalculator.js
let usage = require('./calculator.js')
usage.add(1,2) // 3
console.log(usage) // { add: [function] }
```

但是，但是，但是，重点来了。**如果 `exports` 在模块中被重新赋值，`exports` 就不在绑定到`module.exports`**，会抛出错误。

```js
//calculator.js
function add (a, b) { return a + b }
exports = add // Error

//callCalculator.js
let usage = require('./calculator.js')
usage(1,2) // 3
console.log(usage) // [Function: add]
```

> 这里 `module.exports` 不再是一个对象，而是一个函数，所以在 `usage(1,2)` 可以直接使用了。所以，请记住**`require` 始终返回 `module.exports` 而不是 `exports` **

但有时候，我们还是想使用 `exports`，可以在最后重新让 `exports` 指向 `module.exports`。如：

```js
//calculator.js
function add (a, b) { return a + b }
exports = module.exports = add

//callCalculator.js
let usage = require('./calculator.js')
usage(1,2) // 3
console.log(usage) // [Function: add]
```
