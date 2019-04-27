# 从打包结果看 webpack 依赖管理

先姑且揣测我的理解是正确的。我曾经困扰于 webpack 是如何进行依赖管理的，为了达到这一目的，项目中的 module 只有 `.js` 这一种类型。

## 项目目录

项目目录如下：

```bash
.
├── dist
│   ├── bundle.js
│   └── bundle.js.map
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── another-module.js
│   ├── index.js
│   └── style.css
├── util
│   ├── is-number.js
│   ├── math.js
│   ├── not-use.js
│   └── type.js
└── webpack.config.js
```

`webpack.config.js` 文件的设置如下：

```js
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new BundleAnalyzerPlugin()],
  devtool: 'source-map'
}
```

:::tip
如果你不知道 webpack-bundle-analyzer 这个 plugin，或许可以从 [Webpack 可视化工具](./Webpack-With-Tool.md) 得到一点想法。
:::

几点说明如下：

1. 为了关闭代码压缩, 项目设置为 development mode；
2. 只有一个 entry，一个 output。

## 文件内容

+ 入口文件，`index.js` 依赖了 `./util/math.js` 模块。

```js
// index.js
import { add } from '../util/math'
console.log(add(3, 6))
```

+ `math.js` 模块依赖了 `./util/type.js` 和 `./util/is-number.js` 模块

```js
// util/math.js
import { isNumber } from './is-number'
import { type } from './type'
export const add = function (a, b) {
  if (isNumber(a) && isNumber(b)) {
    return a + b
  }
  if (type(a) === 'String' || type(b) === 'String') {
    return parseFloat(a) + parseFloat(b)
  }
  return new Error('a or b is not a number')
}
```

+ `is-number.js` 模块依赖了 `./util/type.js` 模块。

```js
// util/is-number.js
import { type } from './type'
export const isNumber = value => type(value) === 'Number'
```

+ `type.js` 模块什么也没有依赖

```js
// util/type.js
export const type = value => Object.prototype.toString.call(value).slice(8, -1)
```

+ `not-use.js` 是一个没有被其他任何模块 import 的模块

```js
export const notUse = () => undefined
```

dependency graph 如下面：

![dependency graph](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/dependency-graphic.jpg?raw=true)


## 打包出来的结果

想一想我们之前对一个构建工具的[产品角度](./First-Meet-Webpack.md)：工具如何建立 dependency graph，也就是说工具如何让各个模块按照开发者编排的顺序执行。

```js
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/math */ "./util/math.js");

console.log(Object(_util_math__WEBPACK_IMPORTED_MODULE_0__["add"])(3, 6))

/***/ }),

/***/ "./util/is-number.js":
/*!***************************!*\
  !*** ./util/is-number.js ***!
  \***************************/
/*! exports provided: isNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type */ "./util/type.js");

const isNumber = value => Object(_type__WEBPACK_IMPORTED_MODULE_0__["type"])(value) === 'Number'

/***/ }),

/***/ "./util/math.js":
/*!**********************!*\
  !*** ./util/math.js ***!
  \**********************/
/*! exports provided: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony import */ var _is_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-number */ "./util/is-number.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./util/type.js");


const add = function (a, b) {
  if (Object(_is_number__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(a) && Object(_is_number__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(b)) {
    return a + b
  }
  if (Object(_type__WEBPACK_IMPORTED_MODULE_1__["type"])(a) === 'String' || Object(_type__WEBPACK_IMPORTED_MODULE_1__["type"])(b) === 'String') {
    return parseFloat(a) + parseFloat(b)
  }
  return new Error('a or b is not a number')
}

/***/ }),

/***/ "./util/type.js":
/*!**********************!*\
  !*** ./util/type.js ***!
  \**********************/
/*! exports provided: type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
const type = value => Object.prototype.toString.call(value).slice(8, -1)

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
```

### 一个巨大的 IIFE

打包后的结果是一个 IIFE 函数，这个函数接收一个对象。这个对象的 key 值是各个被 import 的模块和入口模块的相对路径，value 值是一个函数(之后我们会看清这个函数的内部)。

这个 IIFE 最终返回一个执行函数 `__webpack_require__`，

### 函数 __webpack_require__

在 IIFE 内部有一个加载函数 `__webpack_require__`。略过其他干扰信息，我们看下函数内部：

```js
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
```

函数接受一个 moduleId，这个值即 imported 的模块的路径。闭包变量 `installedModules` 用于储存模块，(1) 如果模块已经加载，直接返回 `installedModules[moduleId].exports`；(2) 否则，储存这个模块，然后执行这个模块方法：

```js
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
```

最开始的 `module.exports` 是个空对象，是 *模块导出的引用*。上面的模块执行函数，有三个参数 `module`、`module.exports` 和 `__webpack_require__`。可以想到这个函数的目的是：导出这个模块的 *导出内容*，并加载其他模块。

最后，将模块标记为已加载(`module.l = true`)，并返回导出内容。

通过上面的代码分析，可以看出：

+ 在 webpack 中，每个模块只加载一次
+ 只要有一个入口模块，其余模块就能够依次循环导出
