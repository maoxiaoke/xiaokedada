# JavaScript 模块化的发展进程

JavaScript 是一门缺陷语言。不过可喜的是，有些缺点处于改进当中，有些还在将错就错。

幸运的是，JavaScript 模块化的发展似乎都在处于一个进步的过程；为了支持 JavaScript 的模块化编程，ECMA 提出了 ES6 Module 方案。

Notes:

1. 了解什么是模块化编程、价值和方式
2. 介绍 JavaScript 模块化的发展，产生原因、Pros and Cons
3. AMD、CMD、CommonJS 的实现

## 模块化编程

广义上来说，模块化思想是一种结构化思维。在 [编程的本质](../JavaScript/Light-FP-01-Overview.md) 其实提到了这一点：将信息进行结构化的分解并重新复合，是对人类思维缺陷的一种妥协。

> 大脑不擅长处理无规律的信息

更戏谑的一种说法是，

> 把所有的代码写到一个文件里会让我疯掉的。

模块化是面对 *复杂度* 的 **一个** 解决方案。*代码复杂度* 可以从下面两点评估：

+ 各部分之间的相互融合
+ 代码实现复杂、难以理解、难调试、难扩展

通过模块化编程，可以做到：

1. 隐藏(hide)难以理解的、逻辑复杂的代码
2. 关注点分离(separation of concerns)、可复用(reuseful)、好管理(manageable)

模块化编程是好的，但代价也是昂贵的。在编码的过程中，需要分散精力思考此处是否需要抽出一个模块、如何设计良好的 API (这是非常重要的，设计糟糕的 API 是恶魔)、关注点的界限如何判定等等。

It's pretty hard!!!

好吧，接下来换一个角度来思考下一个问题：**模块化是大脑面对复杂度的最佳解决方案吗**。很多场景下，我们理想当然地(被迫 or 主动)采用模块化编程(Take It For Granted)，有没有其他方式来 escape 它吗？结构化是一种理想的思维方式吗？

I don't konw.

## IIFE

通过 IIFE 和 闭包，可以对外暴露一个绑定在 window 的对象，进而最小化地减少污染全局作用域 (global namespace)。

### IIFE 和 闭包

下面的代码是一个基于 IIFE 方式的一个 `myMath` 模块的设计方式。

```js
(function (global) {
  global.myMath = global.myMath || {}
  global.myMath.sum = sum

  function sum (...values) {
    return values.reduce((a, b) => a + b, 0)
  }
})(window)
```

基于这种方式，可以将每个 IIFE 模块隔离在给自 `.js` 文件中；也可以将多个 IIFE 模块存放在一个 `.js` 文件中。

### 处理模块依赖

但是无论如何，这种方式都需要开发者手动控制模块依赖，以防 `undefined` 错误。

比如，另一个 IIFE 函数存放了一个称为 `checkType` 模块，`myMath` 模块依赖该模块。

```js
// checkType 模块需要在 myMath 模块之前运行
(function (global) {
  global.checkType = global.checkType || {}
  global.checkType.type = type

  function type (value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }
})(window);  // 分号是必须的

// myMath module
(function (global, $) {
  global.myMath = global.myMath || {}
  global.myMath.sum = sum

  function sum (...values) {
    const areAllNumbers = values.every(a => $.type(a) === 'Number')
    return areAllNumbers ? values.reduce((a, b) => a + b, 0) : new Error('numbers are required!')
  }
})(window, window.checkType)
```

可以看到，如果模块处于单个 js 文件内，需要手动调整的模块的运行顺序以建立正确的 *依赖图*(dependency graph) 或 *依赖树*(dependency tree)；如果模块分割在多个 js 文件中，js 文件需要按照依赖关系加载，如下：

```html
<script src="./check-type.js"></script>
<script src="./my-math.js"></script>
```

::: warning
[automatic semicolon insertion ](http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/) 需要添加到每个 IIFE 函数的末尾。
:::

### 槽点

采用 IIFE 的方案的模块化是一个很大的进步，但离一个 *好* 的模块化方案还很远，主要在于：

+ 缺乏有效的依赖管理
+ 最小化地减少污染全局空间，but 还是严重地污染了全局空间，这不可接受

<del> 但是，IIFE 为后续的模块化工作提供了很多的思路。</del>

## CommonJS Modules (2009)

### CommonJS 的兴起

随着 Node.js 的兴起，为了解决规范无法为 Server 端提供一致性的 API 的问题，由[Kevin Dangoor](https://github.com/dangoor) 发起了一个 [ServerJS](https://serverjs.io/) 项目。后来更名为 [CommonJS](http://www.commonjs.org/)，旨在为服务端、客户端、沙箱环境提供全方位的可互操作的(interoperable) 的 API，包括<sup>1</sup>：

+ 模块系统
+ 二进制字符串和缓冲区
+ 文件系统接口
+ Socket 流
+ 本地和远程的包和包管理
+ ...

之后，还发布了和模块系统有关的 [Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1) 规范、和系统接口有关的 [System/1.0](http://wiki.commonjs.org/wiki/System/1.0) 和 单元测试有关的 [Unit Testing/1.0](http://wiki.commonjs.org/wiki/Unit_Testing/1.0) 规范。

对于这段历史，墙裂推荐 [CommonJS effort sets JavaScript on path for world domination](https://arstechnica.com/information-technology/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/) 这篇 CommonJS 的推广文章。

虽然 CommonJS 很有雄心抱负，但由于 Node.js 采用了 CommonJS 的 [Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1) 规范，所以使得 CommonJS 的模块系统规范更广为人知。

### 设计 Module Format

<del>...</del>

### CommonJS Modules/1.1 Format

[Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1) 介绍了 CommonJS Modules/1.1 的 Format，引用如下：

+ **Module Context**

1. 在模块中，有个函数，函数名为 `require`
  + `require` 函数接收一个 *module identifier*。
  + `require` 函数返回 *外部模块* 导出的 API。
  + 如果存在循环依赖，...
  + 如果外部模块无法返回，`require` 函数抛错
  + `require` 函数可能会有一个表示为顶层 *模块* 对象 `main` 属性，该属性只读且无法删除；如果该属性已经提供了，则必须和主程序的的 *模块* 对象完全一致。
  + `require` 函数可以有一个 `paths` 属性。该属性是一个具有优先顺序的 *路径字符串* 的数组。
    1. ....
    2. ...
2. 在模块中，有一个对象 `exports`，模块在执行过程中为其添加导出 API
  + 模块**必须使用** `exports` 对象作为唯一导出方式
3. 在模块中，**必须有**一个对象 `module`
  + `module` 对象必须有一个只读的、不可删除的 `id` 属性，`id` 属性值即为顶层模块 *id*(标记)。
  + `module` 对象可能会有一个 `uri` 属性。

+ **Module Identifiers**

1. 模块标识符是由 `/` 分隔 *名称* 的字符串
2. *名称* 必须是 camelCase 标识符， `./` 或 `../`
3. 模块标识符不必有文件类型后缀，比如 `.js`
4. 模块标识符可以是 *相对* 或 *顶层*。如果第一个 *名称* 是 `.` 或 `..`，则这是个 *相对模块标识符*
5. *顶层标识符* 是通过 conceptual module name space root 解析
6. *相对标识符* 是相对于调用 `require` 的模块来解析的

### 在 Node.js 的实现

在 [Appendix](#Appendix) 强调了一点，CommonJS Modules/1.1 只是 module format，因此它又有很多[实现](https://en.wikipedia.org/wiki/CommonJS)。

Node.js 中的 [module](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js) 实现了 CommonJS Modules/1.1 format。具体细节不在此处讨论，主要了解 Node.js 如何处理模块(在 Node.js 模块系统中，每个文件会被处理成单个的模块)并如何通过 `require` 函数加载。

通过 [VSCODE](https://code.visualstudio.com/) 断点调试，初步理清 Node.js 的加载策略。测试代码如下：

```js
// sum.js
module.exports = exports = (...values) => values.reduce((a, b) => a + b, 0)

// index.js
const sum = require('./sum')
console.log(sum(1,2,3))
```

1. 通过 index.js 模块的 require 函数加载 './sum.js'

```js
// Invoke with makeRequireFunction(module) where |module| is the Module object
// to use as the context for the require() function.
function makeRequireFunction(mod) {
  const Module = mod.constructor;

  function require(path) {
    try {
      exports.requireDepth += 1;
      return mod.require(path); // 通过 index.js 模块的 require 加载 './sum.js'
    } finally {
      exports.requireDepth -= 1;
    }
  }
...
```

然后深入 `mod.require()` 函数，这个函数会加载 `./sum.js` 模块，并返回 `./sum.js` 模块的 `exports` 属性。

2. 加载模块

```js
// Loads a module at the given file path. Returns that module's
// `exports` property.
Module.prototype.require = function(id) {
  if (typeof id !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('id', 'string', id);
  }
  if (id === '') {
    throw new ERR_INVALID_ARG_VALUE('id', id,
                                    'must be a non-empty string');
  }
  return Module._load(id, this, /* isMain */ false);
};
```

继续深入 `Module._load()`。

3. 处理模块加载

```js
// Check the cache for the requested file.
// 1. If a module already exists in the cache: return its exports object.
// 2. If the module is native: call `NativeModule.require()` with the
//    filename and return the result.
// 3. Otherwise, create a new module for the file and save it to the cache.
//    Then have it load  the file contents before returning its exports
//    object.
Module._load = function(request, parent, isMain) {
  if (parent) {
    debug('Module._load REQUEST %s parent: %s', request, parent.id);
  }

  // 获取模块文件名
  var filename = Module._resolveFilename(request, parent, isMain);

  // 处理缓存模块
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }

  // 处理 native 模块
  if (NativeModule.nonInternalExists(filename)) {
    debug('load native module %s', request);
    return NativeModule.require(filename);
  }

  // Don't call updateChildren(), Module constructor already does.
  // 处理第三方模块
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = '.';
  }

  Module._cache[filename] = module;

  // 加载第三方模块
  tryModuleLoad(module, filename);

  return module.exports;
};
```

这里可以看到 Node.js (1) 如何解析文件路径；(2) 模块的缓存策略；(3) 如何加载 native 模块；(4) 如何加载第三方模块。

这里我们更关心如何加载第三方模块，因此我们深入到 `tryModuleLoad(module, filename);` 函数内部，一探究竟。

4. 将控制权转交给 ‘./sum.js’ 模块处理加载内容

```js
// loader.js
function tryModuleLoad(module, filename) {
  var threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
    }
  }
}
...

// loader.js
// Given a file name, pass it to the proper extension handler.
Module.prototype.load = function(filename) {
  debug('load %j for module %j', filename, this.id);

  assert(!this.loaded);
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  var extension = path.extname(filename) || '.js';
  if (!Module._extensions[extension]) extension = '.js';

  // 传递给 extension 处理器处理 .js/.json/.node 文件
  Module._extensions[extension](this, filename);
  this.loaded = true;

  // 实验性质的模块额外处理
  if (experimentalModules) {
    if (asyncESM === undefined) lazyLoadESM();
    const ESMLoader = asyncESM.ESMLoader;
    const url = getURLFromFilePath(filename);
    const urlString = `${url}`;
    const exports = this.exports;
    if (ESMLoader.moduleMap.has(urlString) !== true) {
      ESMLoader.moduleMap.set(
        urlString,
        new ModuleJob(ESMLoader, url, async () => {
          const ctx = createDynamicModule(
            ['default'], url);
          ctx.reflect.exports.default.set(exports);
          return ctx;
        })
      );
    } else {
      const job = ESMLoader.moduleMap.get(urlString);
      if (job.reflect)
        job.reflect.exports.default.set(exports);
    }
  }
};
```

对于 `.js` 文件，Node.js 会读取文件内容，并编译内容。

```js
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};
```

接下来就是很有意思的内容，Node.js 是如何处理编译文件内容呢？

5. 包裹编译内容

```js
// Run the file contents in the correct scope or sandbox. Expose
// the correct helper variables (require, module, exports) to
// the file.
// Returns exception, if any.
Module.prototype._compile = function(content, filename) {

  content = stripShebang(content);

  // create wrapper function
  var wrapper = Module.wrap(content);

  var compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true
  });

  var inspectorWrapper = null;
  if (process._breakFirstLine && process._eval == null) {
    if (!resolvedArgv) {
      // we enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
      } else {
        resolvedArgv = 'repl';
      }
    }

    // Set breakpoint on module start
    if (filename === resolvedArgv) {
      delete process._breakFirstLine;
      inspectorWrapper = process.binding('inspector').callAndPauseOnStart;
    }
  }
  var dirname = path.dirname(filename);
  var require = makeRequireFunction(this);
  var depth = requireDepth;
  if (depth === 0) stat.cache = new Map();
  var result;
  if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, this.exports, this.exports,
                              require, this, filename, dirname);
  } else {
    result = compiledWrapper.call(this.exports, this.exports, require, this,
                                  filename, dirname);
  }
  if (depth === 0) stat.cache = null;
  return result;
};
```

这是个模块编译的核心内容，在 `var wrapper = Module.wrap(content);` 中，文件内容会被函数包裹起来，形成 *闭包*。

```js
Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
```

也就是说，'./sum.js' 中的代码在编译时(真正执行之前)会被 `(function (exports, require, module, __filename, __dirname)` 包装。

```js
(function (exports, require, module, __filename, __dirname) { module.exports = exports = (...values) => values.reduce((a, b) => a + b, 0)
});
```

就这样，模块就可以避免污染全局命名空间；紧接着通过 *sandbox* 运行环境运行代码，返回导出的 API。即下面的这几行代码：

```js
...
result = compiledWrapper.call(this.exports, this.exports, require, this,
                              filename, dirname);
...
```

简而言之，`require()` 函数内部 *类似于* 有一个 IIFE 函数立即执行，返回 `exports`([官网有个简易版的实例](https://nodejs.org/docs/latest/api/modules.html#modules_exports_shortcut))。

TODO:

- [ ] 依赖管理

### CommonJS Module 的浏览器实现

[browserify](http://browserify.org/) 是实现 CommonJS Module Format 的一个浏览器的模块打包器(不仅仅是一个 format loader)。它会将所有的模块聚合成一个大的 IIFE 函数，使其能够在浏览器中运行。为使一个 Loader 支持浏览器，实现 loader 的库应当考虑如何 **打包** 各个模块(打包器)。

测试用例如下：

```js
// ./index.js
const R = require('./sum')

module.exports = exports = R

// ./sum.js
module.exports = exports = (...values) => values.reduce((a, b) => a + b, 0)
```

打包出来的结果如下：

```js
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const R = require('./sum')

module.exports = exports = R
},{"./sum":2}],2:[function(require,module,exports){
module.exports = exports = (...values) => values.reduce((a, b) => a + b, 0)
},{}]},{},[1]);
```

初看下来，实际上 browserify 的 *打包* 和 *依赖管理* 于 [webpack](./Webpack-Operating-Principle.md) 很相似。

### 缺陷

从 Node.js 的实现上分析，CommonJS Module 较好地解决了依赖管理和命名空间的问题，是一次巨大的进步。但它还缺乏：

1. 异步加载模块的机制。

从代码上看，`require()` 是一个典型的同步操作。这是合理的，作为服务端运行环境，模块要么加载成功，要么加载失败退出应用。

2. 无法在浏览器端运行

browserify 作为一个支持 CommonJS Module 的打包器，会将所有的模块打包成一个文件，所有的模块一次性打包完毕。

## Appendix

### Format 和 Loader

在理解 CommonJS/AMD/CMD 之前，还需要了解 **module format** 和 **module loader**<sup>2</sup>。

+ Module format 是一种语法，或者说规范，需要 loader 来 interpret
+ Module loader 是用来 interpret format 的工具(一般都是第三方的)

### Modularity is expensive

[A Brief History of Modularity | JSConf EU 2017](https://www.youtube.com/watch?v=vypCsVm5z28) 是一段很有意思的视频。

### Node.js support ES Module

在 Node.js 的 [Module](https://github.com/nodejs/node/tree/master/lib/internal/modules) 模块中，可以看到 `v.12` 版本开始提供对 ES Module 的支持。

可以通过 [The new ECMAScript module support in Node.js 12](http://2ality.com/2019/04/nodejs-esm-impl.html) 这篇文章了解一下。

### browserify 支持 umd 打包

使用 `--standalone` 支持 browserify 将模块打包成 UMD。使用命令：

```bash
$ browserify index.js --s R
```

可以将模块暴露为一个名为 `R` 的全局变量。

参考 [Browserify - How to call function bundled in a file generated through browserify in browser](https://stackoverflow.com/questions/23296094/browserify-how-to-call-function-bundled-in-a-file-generated-through-browserify)

## Reference

1. [CommonJS effort sets JavaScript on path for world domination](https://arstechnica.com/information-technology/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/)

2. [Basics of Modular JavaScrip](https://medium.com/@crohacz_86666/basics-of-modular-javascript-2395c82dd93a)