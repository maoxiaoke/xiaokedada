(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{197:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("在"),a("router-link",{attrs:{to:"./Light-FP-Categries.html#范畴的定义"}},[t._v("范畴学基础理论-范畴的定义")]),t._v("小节当中，介绍了 "),a("strong",[t._v("函数的组合")]),t._v(" 和 "),a("strong",[t._v("单位函数")]),t._v("。在此基础上，可以实现一个 "),a("code",[t._v("compose")]),t._v(" 函数 和 "),a("code",[t._v("id")]),t._v(" 函数。")],1),t._m(1),t._m(2),t._m(3),t._m(4),a("p",[t._v("值得注意的有两点：")]),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),t._m(10),t._m(11),t._m(12),a("p",[t._v("表示为：")]),t._m(13),t._m(14),a("p",[t._v("结合率(Associativity) 是范畴需要满足的条件之一，是建立在组合的基础之上的。即满足：")]),t._m(15),t._m(16)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"compose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#compose","aria-hidden":"true"}},[this._v("#")]),this._v(" Compose")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"实现-compose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现-compose","aria-hidden":"true"}},[this._v("#")]),this._v(" 实现 Compose")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("我们来定义一个函数，函数名就叫 "),s("code",[this._v("compose")]),this._v("。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("compose")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" g"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("fucntion")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("f")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("g")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("其中，"),a("code",[t._v("f")]),t._v(" 和 "),a("code",[t._v("g")]),t._v(" 都是函数,"),a("code",[t._v("x")]),t._v(" 是一个通过 “管道” 传输的值。且 "),a("code",[t._v("g")]),t._v(" 将先于 "),a("code",[t._v("f")]),t._v(" 执行，从而创建了一个从右到左的数据流(可以谑称“左倾主义”)。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[s("p",[this._v("“左倾” 很重要")])]),s("li",[s("p",[this._v("组合的优点在于 pointfree 的数据和可读性")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("pointfree")]),this._v(" 指的是：函数无须提及将要操作的数据是什么样的。比如：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// 非 pintfree")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("shout")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("exclaim")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("exclaim")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'!'")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("toUpperCase")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" x"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("toUpperCase")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"实现-id"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现-id","aria-hidden":"true"}},[this._v("#")]),this._v(" 实现 Id")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("id")]),this._v(" 是一个实用的函数。即，这个函数接受什么输入然后原封不动地返回这个输入。实现非常简单：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("id")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" x\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("id")]),this._v(" 函数可以作为组合操作的 “单位元”。即：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticStyle:{"text-align":"center"}},[this._v("𝑓∘1"),s("sub",[this._v("A")]),this._v(" = 𝑓 = 1"),s("sub",[this._v("B")]),this._v("∘𝑓")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" f"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" id"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" f\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"associativity"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#associativity","aria-hidden":"true"}},[this._v("#")]),this._v(" Associativity")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("h"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("g"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("f"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("compose")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("h"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("g"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" f"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"管道"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#管道","aria-hidden":"true"}},[this._v("#")]),this._v(" 管道")])}],!1,null,null,null);s.default=e.exports}}]);