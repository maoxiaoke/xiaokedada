(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{72:function(t,s,a){"use strict";a.r(s);var n=a(0),o=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"require-和-import-的难点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#require-和-import-的难点","aria-hidden":"true"}},[t._v("#")]),t._v(" require 和 import 的难点")]),a("p",[t._v("众所周知，ES6 通过 "),a("code",[t._v("import")]),t._v(" 和 "),a("code",[t._v("export")]),t._v(" 来设计模块。但是，当你使用这两者运行于 "),a("code",[t._v("Node")]),t._v(" 时，是会报错的，原因是："),a("code",[t._v("Node")]),t._v(" 并不支持 ES6 的 "),a("code",[t._v("import")]),t._v(" 和 "),a("code",[t._v("export")]),t._v("，而是有自身的一套模块规则 -- "),a("a",{attrs:{href:"https://nodejs.org/dist/latest-v9.x/docs/api/modules.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Modules | Node.js v9.8.0 Documentation")]),t._v("。")]),a("p",[a("code",[t._v("Node")]),t._v(" 应用的是一套称为 CommonJS 的一种加载方式，使用 "),a("code",[t._v("Module.exports")]),t._v(" 和 "),a("code",[t._v("require")]),t._v(" 来实现模块地加载，CommonJS 也称为服务端的模块加载方式。")]),a("p",[t._v("那么问题就来了。")]),a("h2",{attrs:{id:"如何-node-中写-import"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何-node-中写-import","aria-hidden":"true"}},[t._v("#")]),t._v(" 如何 Node 中写 import")]),a("p",[t._v("传说(之所以说传说是因为到 v9 的版本还没支持)新的版本会支持 "),a("code",[t._v("import")]),t._v("。但目前解决的方案有两种。")]),a("ul",[a("li",[t._v("一种是通过 Babel 进行转义 -- "),a("a",{attrs:{href:"http://taobaofed.org/blog/2016/01/07/find-back-the-lost-es6-features-in-nodejs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("找回 Node.js 里面那些遗失的 ES6 特性 | Taobao FED | 淘宝前端团队")])]),a("li",[t._v("另一种是通过试验状态的 node 命令 -- "),a("a",{attrs:{href:"https://nodejs.org/api/esm.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("ECMAScript Modules | Node.js v9.8.0 Documentation")])])]),a("h2",{attrs:{id:"module-exports-和-exports-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module-exports-和-exports-的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" Module.exports 和 exports 的区别")]),a("p",[t._v("在官方的文档中，已经介绍得非常详细了 -- "),a("a",{attrs:{href:"https://nodejs.org/dist/latest-v9.x/docs/api/modules.html#modules_module_exports",target:"_blank",rel:"noopener noreferrer"}},[t._v("Modules | module exports")])]),a("p",[t._v("首先，来介绍一下 "),a("code",[t._v("Module")]),t._v("。"),a("code",[t._v("Module")]),t._v(" 在 Node 中是一个 Object，有一个 "),a("code",[t._v("exports")]),t._v(" 的属性。我们来看一个例子：")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// calculator.js")]),t._v("\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("add")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" a "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" b\n\nconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("/*\nModule {\n  id: '/Users/a123456/WebstormProjects/snippets/F-programing/calculator.js',\n  exports: { add: [Function] },\n  parent: \n   Module {\n     id: '.',\n     exports: {},\n     parent: null,\n     filename: '/Users/a123456/WebstormProjects/snippets/F-programing/call-cal.js',\n     loaded: false,\n     children: [ [Circular] ],\n     paths: \n      [ '/Users/a123456/WebstormProjects/snippets/F-programing/node_modules',\n        '/Users/a123456/WebstormProjects/snippets/node_modules',\n        '/Users/a123456/WebstormProjects/node_modules',\n        '/Users/a123456/node_modules',\n        '/Users/node_modules',\n        '/node_modules' ] },\n  filename: '/Users/a123456/WebstormProjects/snippets/F-programing/calculator.js',\n  loaded: false,\n  children: [],\n  paths: \n   [ '/Users/a123456/WebstormProjects/snippets/F-programing/node_modules',\n     '/Users/a123456/WebstormProjects/snippets/node_modules',\n     '/Users/a123456/WebstormProjects/node_modules',\n     '/Users/a123456/node_modules',\n     '/Users/node_modules',\n     '/node_modules' ] }\n*/")]),t._v("\n")])]),a("p",[t._v("我们在另一个文件 "),a("code",[t._v("callCalculator.js")]),t._v(" 引入 "),a("code",[t._v("calculator.js")]),t._v(" 模块，代码如下。打印出 "),a("code",[t._v("module")]),t._v(" 的结果，是一个再简单不过的对象。")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" usage "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./calculator.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nusage"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("add")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 3")]),t._v("\n\nconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("usage"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// { add: [function] }")]),t._v("\n")])]),a("p",[t._v("通过以上例子，想说明一下几点：")]),a("ul",[a("li",[a("code",[t._v("module")]),t._v(" 是一个表征当前模块的对象，对外部是隐藏的 ("),a("em",[t._v("阅读 calculator.js")]),t._v(")")]),a("li",[a("code",[t._v("module.exports")]),t._v(" 是 "),a("code",[t._v("require")]),t._v(" 返回对象的引用 ("),a("em",[t._v("阅读 callCalculator.js")]),t._v(")")])]),a("p",[t._v("那 "),a("code",[t._v("exports")]),t._v(" 是怎么回事呢？还不是因为懒呗，"),a("code",[t._v("exports")]),t._v(" 就是 "),a("code",[t._v("module.exports")]),t._v(" 的 "),a("em",[t._v("shortcut")]),t._v("。")]),a("blockquote",[a("p",[t._v("The exports variable is available within a module's file-level scope, and is assigned the value of module.exports before the module is evaluated. -- "),a("code",[t._v("exports")]),t._v(" 是存在于模块内，在模块开始的时候被 "),a("code",[t._v("module.exports")]),t._v(" 赋值。")])]),a("p",[t._v("有点类似于在文件开头，有以下处理：")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Module")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("...")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports\n")])]),a("p",[a("img",{attrs:{src:"https://i.stack.imgur.com/JzZkz.png",alt:""}})]),a("p",[t._v("所以以上的例子可以简写成：")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("//calculator.js")]),t._v("\nexports"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("add")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" a "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" b\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("//callCalculator.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" usage "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./calculator.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nusage"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("add")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 3")]),t._v("\nconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("usage"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// { add: [function] }")]),t._v("\n")])]),a("p",[t._v("但是，但是，但是，重点来了。"),a("strong",[t._v("如果 "),a("code",[t._v("exports")]),t._v(" 在模块中被重新赋值，"),a("code",[t._v("exports")]),t._v(" 就不在绑定到"),a("code",[t._v("module.exports")])]),t._v("，会抛出错误。")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("//calculator.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" b "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nexports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" add "),a("span",{attrs:{class:"token comment"}},[t._v("// Error")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("//callCalculator.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" usage "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./calculator.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("usage")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 3")]),t._v("\nconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("usage"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// [Function: add]")]),t._v("\n")])]),a("blockquote",[a("p",[t._v("这里 "),a("code",[t._v("module.exports")]),t._v(" 不再是一个对象，而是一个函数，所以在 "),a("code",[t._v("usage(1,2)")]),t._v(" 可以直接使用了。所以，请记住**"),a("code",[t._v("require")]),t._v(" 始终返回 "),a("code",[t._v("module.exports")]),t._v(" 而不是 "),a("code",[t._v("exports")]),t._v(" **")])]),a("p",[t._v("但有时候，我们还是想使用 "),a("code",[t._v("exports")]),t._v("，可以在最后重新让 "),a("code",[t._v("exports")]),t._v(" 指向 "),a("code",[t._v("module.exports")]),t._v("。如：")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("//calculator.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" b "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nexports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" add\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("//callCalculator.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" usage "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./calculator.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("usage")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 3")]),t._v("\nconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("usage"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// [Function: add]")]),t._v("\n")])])])}],!1,null,null,null);s.default=o.exports}}]);