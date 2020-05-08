(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{204:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("这篇文章主要是 "),a("a",{attrs:{href:"https://css-tricks.com/debouncing-throttling-explained-examples/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Debouncing and Throttling Explained Through Examples"),a("OutboundLink")],1),t._v(" 的部分翻译和总结。而并非是完全的独立成果，特此声明。")]),a("p",[t._v("Debounce and throttle are two similar (but different!) techniques to control how many times we allow a function to be executed over time.")]),t._m(1),a("p",[t._v("Debounce 是将多个连续调用的组合成一个。")]),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),a("p",[t._v("实现代码如下：")]),t._m(10),t._m(11),t._m(12),t._m(13),a("p",[t._v("如果我们使用 Debounce 来处理，就会导致页面在用户停止滚动之前都没有数据展示。因此，我们需要执行函数每个一段时间去 check 用户是否到达浏览器底部。")]),a("p",[t._v("我们看一下以下的实现：")]),t._m(14),t._m(15)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"函数防抖和节流"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#函数防抖和节流","aria-hidden":"true"}},[this._v("#")]),this._v(" 函数防抖和节流")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"debounce-防抖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#debounce-防抖","aria-hidden":"true"}},[this._v("#")]),this._v(" Debounce - 防抖")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"https://res.cloudinary.com/css-tricks/image/fetch/q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2016/04/debounce.png",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("我们可以形象地使用 "),s("strong",[this._v("电梯模型")]),this._v(" 来模拟这种行为：为了节省电梯资源，当电梯门快关闭时，有人进入，电梯并不会关闭电梯门(而是再次打开)；再来一个人，亦是如此。也就是说，电梯会推迟上下运行(执行函数)，直到没有人加入(没有函数的事件发生)。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("这种场景的一种简单例子是："),a("code",[t._v("window")]),t._v(" 的 "),a("code",[t._v("resize")]),t._v(" 事件。当我们调整浏览器窗口时，会不断触发 "),a("code",[t._v("resize")]),t._v(" 事件。而很多情况下，我们只需要最后一次的 "),a("code",[t._v("resize")]),t._v(" 事件触发"),a("em",[t._v("执行函数")]),t._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("比较简单的一种实现如下：我们在 "),s("code",[this._v("delay")]),this._v(" 时间内再次触发事件，就会 clear 掉上次的执行函数。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("debounce")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("func"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" delay"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" timeout\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" context "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" args "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arguments\n    "),a("span",{attrs:{class:"token function"}},[t._v("clearTimeout")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timeout"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    timeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" func"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("apply")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" delay"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("上面的这种，我们称为 "),s("strong",[this._v("Tailing Edge")]),this._v("。也就是说，当事件不在频繁发生后，执行函数才开始执行。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("还有一种情况是，我们需要在事件频繁前，执行函数执行一次。这种就称为 "),s("strong",[this._v("Leading Edge")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"https://res.cloudinary.com/css-tricks/image/fetch/q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2016/04/debounce-leading.png",alt:""}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// Returns a function, that, as long as it continues to be invoked, will not")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// be triggered. The function will be called after it stops being called for")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// N milliseconds. If `immediate` is passed, trigger the function on the")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// leading edge, instead of the trailing.")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("debounce")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("func"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" wait"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" immediate"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" timeout"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" context "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" args "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arguments"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("later")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\ttimeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("null")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("immediate"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" func"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("apply")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" callNow "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" immediate "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("timeout"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token function"}},[t._v("clearTimeout")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timeout"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\ttimeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("later"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" wait"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callNow"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" func"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("apply")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// https://davidwalsh.name/javascript-debounce-function")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// https://gist.github.com/nmsdvid/8807205")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"throttle-节流"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#throttle-节流","aria-hidden":"true"}},[this._v("#")]),this._v(" Throttle - 节流")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Throttle 的概念和 Debounce 并不完全一致。Throttle 的含义是："),s("strong",[this._v("x milliseconds 内执行函数有且只执行一次")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Throttle 的一个应用场景是 "),s("em",[this._v("无限滚动")]),this._v("。比如，无限的瀑布流。当用户滚动页面时，需要去 check 用户离浏览器底部的距离。如果用户接近浏览器底部，我们就需要向后端请求数据。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("throttle")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" wait"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" context "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" timeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" callbackArgs "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("later")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    callback"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("apply")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callbackArgs"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    timeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("timeout"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      callbackArgs "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" arguments\n      timeout "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("later"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" wait"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("//https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"lodash-的实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lodash-的实现","aria-hidden":"true"}},[this._v("#")]),this._v(" Lodash 的实现")])}],!1,null,null,null);s.default=e.exports}}]);