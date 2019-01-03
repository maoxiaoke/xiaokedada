(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{193:function(t,s,n){"use strict";n.r(s);var e=n(0),a=Object(e.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),n("ul",[n("li",[n("a",{attrs:{href:"https://stackoverflow.com/questions/23392111/console-log-async-or-sync#",target:"_blank",rel:"noopener noreferrer"}},[t._v("console.log() async or sync?"),n("OutboundLink")],1)]),n("li",[n("a",{attrs:{href:"https://hackernoon.com/please-stop-using-console-log-its-broken-b5d7d396cf15",target:"_blank",rel:"noopener noreferrer"}},[t._v("Please stop using console.log(), it’s broken…"),n("OutboundLink")],1)]),n("li",[n("a",{attrs:{href:"https://stackoverflow.com/questions/4057440/is-chromes-javascript-console-lazy-about-evaluating-arrays",target:"_blank",rel:"noopener noreferrer"}},[t._v("Is Chrome's JavaScript console lazy about evaluating arrays?"),n("OutboundLink")],1)])]),n("p",[t._v("我来引用这么一句话：")]),t._m(6),t._m(7),t._m(8),n("p",[t._v("如下图所示：")]),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"你看到的-javascript，并不是真实的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#你看到的-javascript，并不是真实的","aria-hidden":"true"}},[this._v("#")]),this._v(" 你看到的 JavaScript，并不是真实的")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"console-log-是-async-的吗？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#console-log-是-async-的吗？","aria-hidden":"true"}},[this._v("#")]),this._v(" console.log 是 Async 的吗？")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("之前在调试程序，遇到了 "),s("code",[this._v("console.log")]),this._v(" 的问题，差点颠覆我的认知观。大概是如下的一段程序：")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" printLogo "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" order\n  console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'printLogo---'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" printLogo"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),n("span",{attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" _data "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    printLogo\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'_data---'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" _data"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),n("span",{attrs:{class:"token comment"}},[t._v("// { printLogo: false }")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("我们知道，JavaScript 是一门单线程的、运行至完成的语言，怎么可能会出现这种情况呢。这不禁让我怀疑 "),s("code",[this._v("console.log")]),this._v(" 是异步的可能性。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("所以，我 Google 了 "),s("code",[this._v("console.log async")]),this._v(" 的关键词。得到这些结果：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Calling console.log when the console is not yet active only results in a reference to the object being queued, not the output the console will contain.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("他们通常称这种行为为 "),s("strong",[this._v("lazy evaluation")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("所以当我们在 Chrome 的控制台打印对象时，"),s("code",[this._v("console.log")]),this._v(" 保存的是 "),s("em",[this._v("对象的引用")]),this._v("。当我们点击"),s("em",[this._v("展开")]),this._v("时，Chrome 重新取得引用地址内的内容呈现给用户。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/console.jpg",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("当我们第一次打印的时候，控制台显示 "),s("code",[this._v("{}")]),this._v("，当点击 "),s("em",[this._v("展开")]),this._v(" 时，里面却有内容 "),s("code",[this._v("{ foo: 'bar' }")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("但由于 "),s("code",[this._v("console.log")]),this._v(" 的实现并没有官方规范，所以在 "),s("code",[this._v("firefox")]),this._v(" 或者 "),s("code",[this._v("ie")]),this._v(" 中可能会得到不同的结果，这都不必惊慌。")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("p",[t._v("所以，有时候 "),n("code",[t._v("console.log")]),t._v(" 并不可靠。所以在目前，使用 "),n("code",[t._v("console.log")]),t._v(" 来调试代码并非是非常好的方式，而是使用"),n("strong",[t._v("断点")]),t._v("的调试方式。但有些时候，受限于环境等因素影响，除了 "),n("code",[t._v("console.log")]),t._v(" 之外，没有其他更好的方式，可以采用以下处理：")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token constant"}},[t._v("JSON")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("stringify")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])}],!1,null,null,null);s.default=a.exports}}]);