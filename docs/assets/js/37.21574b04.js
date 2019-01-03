(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{179:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("对路由这一块，相对来说接触的比较少。正好碰到了一个页面跳转的问题，就顺便把自己想了解的笼络了一下。")]),t._m(1),a("p",[t._v("URL 是 URI 的一个子集，具体区别参考"),a("a",{attrs:{href:"https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn",target:"_blank",rel:"noopener noreferrer"}},[t._v("What is the difference between a URI, a URL and a URN?"),a("OutboundLink")],1),t._v("。")]),a("p",[t._v("这里了解一下 URI 的一般语法：")]),t._m(2),a("p",[t._v("框图如下：")]),t._m(3),t._m(4),t._m(5),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Location#Specifications",target:"_blank",rel:"noopener noreferrer"}},[t._v("Location"),a("OutboundLink")],1),t._v(" 是，就能获取到 URI 上的所有信息。")]),t._m(6),t._m(7),t._m(8),a("p",[t._v("阅读前，请翻阅官方文档："),a("a",{attrs:{href:"https://www.w3.org/TR/html50/browsers.html#the-history-interface",target:"_blank",rel:"noopener noreferrer"}},[t._v("History Interface"),a("OutboundLink")],1)]),a("p",[t._v("History 是用来处理操纵用户浏览记录的 API。这个 API 因为也常用于页面的跳转，所以和 url 还是有一定联系的。")]),t._m(9),t._m(10),t._m(11),t._m(12),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN"),a("OutboundLink")],1),t._v(" 上提供的 popstate 事件触发条件：")]),t._m(13),a("p",[t._v("即，在同一文档的内的两个历史记录中，激活的记录改变了，该事件就会被触发。")]),t._m(14),t._m(15),t._m(16),t._m(17),a("p",[t._v("至于为什么会提供这样的得一个 state，官方的解释"),a("a",{attrs:{href:"https://www.w3.org/TR/html50/browsers.html#state-object",target:"_blank",rel:"noopener noreferrer"}},[t._v("在这里"),a("OutboundLink")],1)]),t._m(18),a("p",[t._v("简而言之，就是能够不必解析 url 就能直接获取当前记录的一个状态。")]),t._m(19),t._m(20),a("p",[t._v("两个 API 都接收三个参数：")]),t._m(21),a("p",[t._v("举个例子：")]),t._m(22),a("p",[a("code",[t._v("history.pushState()")]),t._v(" 和 "),a("code",[t._v("history.replaceState()")]),t._v(" 的一个典型应用场景是 "),a("a",{attrs:{href:"https://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[t._v("无刷新改变页面内容")]),a("OutboundLink")],1),t._v("。")]),t._m(23),a("p",[t._v("在前端的 SPA 应用中，前端路由系统通过改变 url，可以在不重新请求页面的情况下更新页面视图。")]),t._m(24),t._m(25),a("p",[t._v("首先，通过 hash，也可以在 history stack 中创建一个记录。")]),t._m(26),a("p",[t._v("值得注意的是：")]),t._m(27),t._m(28),t._m(29),t._m(30),a("p",[t._v("同时也有以下特点：")]),t._m(31),a("blockquote",[a("p",[a("a",{attrs:{href:"https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue-Router - HTML5 History Mode"),a("OutboundLink")],1)])]),a("p",[a("a",{attrs:{href:"https://router.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue-Router"),a("OutboundLink")],1),t._v(" 对上述的两种方法都做了实现。具体可参考"),a("a",{attrs:{href:"https://github.com/vuejs/vue-router",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方源代码"),a("OutboundLink")],1),t._v("，或者以下源代码分析的文章。")]),a("ul",[a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/27588422",target:"_blank",rel:"noopener noreferrer"}},[t._v("从vue-router看前端路由的两种实现"),a("OutboundLink")],1)]),a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/24574970",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-router 源码分析-history"),a("OutboundLink")],1)]),a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/24104410",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-router源码分析-整体流程"),a("OutboundLink")],1)])]),t._m(32),a("p",[t._v("文中很多内容来自 MDN 相关的解释。其中有一个例子非常好：")]),t._m(33),a("p",[t._v("部分内容来自 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/History_API",target:"_blank",rel:"noopener noreferrer"}},[t._v("Manipulating the browser history"),a("OutboundLink")],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"和-url-相关的-location-和-history"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#和-url-相关的-location-和-history","aria-hidden":"true"}},[this._v("#")]),this._v(" 和 URL 相关的 Location 和 History")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"url"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#url","aria-hidden":"true"}},[this._v("#")]),this._v(" URL")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("URI = scheme:[//authority]path[?query][#fragment]\n\n其中：\n\nauthority = [userinfo@]host[:port]\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/9/96/URI_syntax_diagram.png",alt:""}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("其中，"),a("code",[t._v("path")]),t._v("、"),a("code",[t._v("query")]),t._v(" 和 "),a("code",[t._v("fragment")]),t._v(" 值得我们思考。其中 "),a("code",[t._v("fragment")]),t._v(" 前面有个 "),a("code",[t._v("#")]),t._v("(hash)。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"location-interface"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#location-interface","aria-hidden":"true"}},[this._v("#")]),this._v(" Location Interface")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("比如："),s("code",[this._v("https://developer.mozilla.org/en-US/docs/Web/API/Location#Specifications")]),this._v("，在控制台打印的结果：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/location.jpg",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"history-interface"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history-interface","aria-hidden":"true"}},[this._v("#")]),this._v(" History Interface")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/history.jpg",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("对于浏览器的实现上，应该是是一个 "),s("strong",[this._v("栈")]),this._v("(Stack) 的结构。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("对于这个 API，需要着重强调的是 "),s("code",[this._v("pushState()")]),this._v(" 和 "),s("code",[this._v("replaceState()")]),this._v(" 这两个方法。然而，这两个方法又和 "),s("code",[this._v("popstate")]),this._v(" 事件息息相关。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"popstate-事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#popstate-事件","aria-hidden":"true"}},[this._v("#")]),this._v(" popstate 事件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("A popstate event is dispatched to the window each time "),s("strong",[this._v("the active history entry changes")]),this._v(" between two history entries for "),s("strong",[this._v("the same document")]),this._v(".")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),a("p",[t._v("很多文章中说，点击浏览器的 "),a("em",[t._v("前进")]),t._v(" 和 "),a("em",[t._v("后退")]),t._v(" 按钮，就会触发 "),a("code",[t._v("popstate")]),t._v(" 事件，实际上不严谨的。如果不是在同一个 document 内进行的跳转，是不会触发这个事件的。\n比如，我们用下面的代码监听 popstate 事件：")]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("onpopstate")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"location: "')]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('", state: "')]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("stringify")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("当我们在浏览器的地址栏输入一个另一个页面的 url(这两个页面不同属于一个 document)，然后使用 "),a("em",[t._v("后退")]),t._v(" 按钮，并不能触发该事件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#state","aria-hidden":"true"}},[this._v("#")]),this._v(" state")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("当监听了 "),a("code",[t._v("popstate")]),t._v(" 事件触发后，可以获取到当前激活历史记录的 "),a("code",[t._v("state")]),t._v("(即 "),a("code",[t._v("event.state")]),t._v(")。这个状态实际上是传入 "),a("code",[t._v("history.pushState()")]),t._v(" 或 "),a("code",[t._v("history.replaceState()")]),t._v(" 的第一个参数的一份拷贝。此外，都为 "),a("code",[t._v("null")]),t._v("。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[a("code",[t._v("state")]),t._v(" 可以是任何可序列化的对象。设计的目的，实际上就是状态标记，标记当前激活的历史记录的状态。尤其是当我们调用 "),a("code",[t._v("history.pushState()")]),t._v(" 或 "),a("code",[t._v("history.replaceState()")]),t._v(" 时，并不会触发 "),a("code",[t._v("popstate")]),t._v(" 事件。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("State objects are intended to be used for two main purposes: first, storing a preparsed description of the state in the URL so that in the simple case an author doesn't have to do the parsing (though one would still need the parsing for handling URLs passed around by users, so it's only a minor optimization), and second, so that the author can store state that one wouldn't store in the URL because it only applies to the current Document instance and it would have to be reconstructed if a new Document were opened.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"history-pushstate-history-replacestate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history-pushstate-history-replacestate","aria-hidden":"true"}},[this._v("#")]),this._v(" history.pushState()/history.replaceState()")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("这两个 API 分别用来增加或修改当前记录的。"),s("code",[this._v("pushState()")]),this._v(" 类似于在栈顶的位置增加一条记录，而 "),s("code",[this._v("replaceState()")]),this._v(" 是修改当前激活的记录。两者并不会直接触发 "),s("code",[this._v("popstate")]),this._v(" 事件，也不会导致页面重载。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[a("code",[t._v("state")]),t._v(" - 即上面提到的 state")]),a("li",[a("code",[t._v("title")]),t._v(" - 暂时没有定义用户")]),a("li",[a("code",[t._v("url")]),t._v(" - 可选参数。这个参数值得注意的有这么几点：\n"),a("ol",[a("li",[t._v("可以是相对路径，或者绝对路径。但必须和当前的 url "),a("strong",[t._v("满足同源策略")]),t._v("。")]),a("li",[t._v("参数是可选的，如果没有，就和当前的 url 一致， 但是仍然 "),a("strong",[t._v("会往栈顶添加或修改一条记录")]),t._v("。")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// 当前页面的地址为: http://xiaokedada.com。history.length 为 1。")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("pushState")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'xiaoke'")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'xiaokedada'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{attrs:{class:"token comment"}},[t._v("// 2")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),a("span",{attrs:{class:"token comment"}},[t._v("// { name: 'xiaoke' }")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"hash-和-history-实现前端路由"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hash-和-history-实现前端路由","aria-hidden":"true"}},[this._v("#")]),this._v(" hash 和 history 实现前端路由")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("方式一，是通过 "),s("code",[this._v("location.hash")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"location-hash"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#location-hash","aria-hidden":"true"}},[this._v("#")]),this._v(" location.hash")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hash "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"#foo"')]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// or")]),t._v("\n\nwindow"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"#bar"')]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ol",[a("li",[t._v("hash 部分不会包含在 http 请求中，只是页面中的一个 "),a("em",[t._v("锚点")]),t._v("。")]),a("li",[t._v("只有当设置的 hash 值和当前的 hash 值不同，才会创建一个新的历史记录。而 "),a("code",[t._v("history.pushState()")]),t._v(" 和 "),a("code",[t._v("history.replaceState()")]),t._v("，在不提供额外的 url 参数时，仍会添加或修改一条记录。")]),a("li",[t._v("hash 的改变也会触发 "),a("code",[t._v("popstate")]),t._v(" 事件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("所以，在通过 hash 的方式来实现前端路由的时候。可以通过 "),s("code",[this._v("location.hash")]),this._v(" 配合 "),s("code",[this._v("hashchange")]),this._v("/"),s("code",[this._v("popstate")]),this._v(" 事件来实现。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"history"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history","aria-hidden":"true"}},[this._v("#")]),this._v(" history")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("history 是另一种实现前端路由的方式，主要是通过 "),s("code",[this._v("history.pushState()")]),this._v(" 和 "),s("code",[this._v("history.replaceState()")]),this._v(" 配合 "),s("code",[this._v("popstate")]),this._v(" 事件来实现的。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("即便和原地址相比，只是多了 fragment identifier (即 hash 部分) 的内容，也不会触发 "),s("code",[this._v("hashchange")]),this._v(" 事件。")]),s("li",[this._v("通过使用 "),s("code",[this._v("state")]),this._v("，能提供更多的任意信息。而 hash 方式必须全部包含在字符串中。")]),s("li",[this._v("当用户刷新页面时，新的 url 会作为请求发送给后端，因此需要响应的后端配置。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[this._v("#")]),this._v(" 参考")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("onpopstate")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("alert")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"location: "')]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('", state: "')]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("stringify")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("pushState")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("page"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"title 1"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"?page=1"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("pushState")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("page"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"title 2"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"?page=2"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("replaceState")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("page"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("3")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"title 3"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"?page=3"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("back")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("back")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhistory"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("go")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])}],!1,null,null,null);s.default=n.exports}}]);