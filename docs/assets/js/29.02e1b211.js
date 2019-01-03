(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{187:function(t,e,s){"use strict";s.r(e);var r=s(0),n=Object(r.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),s("p",[t._v("TODO:")]),t._m(1),s("p",[t._v("异步编程是 JavaScript 中一个非常重要的概念。")]),t._m(2),t._m(3),s("p",[t._v("TODO:")]),t._m(4),t._m(5),t._m(6),s("p",[t._v("进程(Process)实际上是一段正在执行的程序。静态的程序并不是进程，进程是激活的实体(Active Entity)。从内容的角度来理解进程，包含运行过程时的 text(代码)、data(全局变量)、heap(运行时创建)和 stack(函数调用栈)。")]),s("p",[t._v("为了利用多 CPU(multi-CPU) 或 多核心 (multi-core) 的系统，在一个进程中，可以提供多了执行上下文(即 Single CPU, many exection context)，那便是线程(Thread)。Thread 可以共享 Process 的内存空间，数据文件等内容。")]),s("p",[t._v("在最初，JavaScript 便被设计为单线程执行。有以下的优点：")]),t._m(7),t._m(8),s("p",[t._v("对于浏览器的设计，大概有两种方案：")]),t._m(9),t._m(10),s("p",[t._v("multi-renderer process 的目的在于当其中的一个 tab 页崩溃的时候，不会导致整个浏览器崩溃。当然，缺点是十分明显，会消耗大量内容。")]),s("p",[s("a",{attrs:{href:"https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit#heading=h.p8sox77u21on",target:"_blank",rel:"noopener noreferrer"}},[t._v("How Blink Works"),s("OutboundLink")],1)]),s("p",[s("a",{attrs:{href:"https://www.chromium.org/developers/design-documents/multi-process-architecture",target:"_blank",rel:"noopener noreferrer"}},[t._v("Multi-process Architecture"),s("OutboundLink")],1)]),s("p",[s("a",{attrs:{href:"https://chromium.googlesource.com/chromium/src/+/lkgr/docs/threading_and_tasks.md#Tasks",target:"_blank",rel:"noopener noreferrer"}},[t._v("Threading and Tasks in Chrome"),s("OutboundLink")],1)]),s("p",[s("a",{attrs:{href:"https://dev.chromium.org/developers/design-documents",target:"_blank",rel:"noopener noreferrer"}},[t._v("Design Documents"),s("OutboundLink")],1)]),t._m(11),t._m(12),t._m(13),s("p",[t._v("并发")]),t._m(14),t._m(15),s("p",[t._v("[1] http://www.qnx.com/developers/docs/6.4.1/neutrino/getting_started/s1_procs.html")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"异步编程要点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#异步编程要点","aria-hidden":"true"}},[this._v("#")]),this._v(" 异步编程要点")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("[ ] 了解操作系统有关线程、并发、并行、锁模型、CSP 模型")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v("异步的核心是 "),s("strong",[t._v("现在")]),t._v(" 和 "),s("strong",[t._v("稍后")]),t._v("。"),s("em",[t._v("稍后")]),t._v(" 体现在 "),s("em",[t._v("时间差")]),t._v(" 上，过一会儿才会执行。")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token function"}},[t._v("ajax")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'http://xiaokedada.com'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("callbackFunction")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token comment"}},[t._v("// 稍后执行")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("[ ] 多线程")]),e("li",[this._v("[ ] 协程 Coroutine")]),e("li",[this._v("[ ] 并发 Concurrency")]),e("li",[this._v("[ ] 并行 Parallelism")]),e("li",[this._v("[ ] 消费者和生产者问题 (经典的线程同步问题))")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"进程、线程和-javascript-单线程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#进程、线程和-javascript-单线程","aria-hidden":"true"}},[this._v("#")]),this._v(" 进程、线程和 JavaScript 单线程")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("A process is an instance of an execting program. 操作系统概念。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"理解浏览器的工作原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#理解浏览器的工作原理","aria-hidden":"true"}},[this._v("#")]),this._v(" 理解浏览器的工作原理")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("单一进程，多个线程；或者是")]),e("li",[this._v("多个进程，通过 IPC(Inter Process Communication) 相互通信")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("不同的浏览器的实现并不一致，针对现代的 chrome 浏览器而言。最顶部是一个 "),e("strong",[this._v("浏览器进程")]),this._v("(Browser Process)，负责协调其他进程；对于 "),e("strong",[this._v("渲染器进程")]),this._v("(renderer process)，会为每个 Tab 页都创建一个进程(这中策略可能处于变化之中)；GPU 进程(GPU Process)执行 GPU 任务；插件进程(Plugin Process) 是为页面中的插件 - 比如 Flash 提供的进程；此外，chrome 还提供了 Extension Process 和 Utility Process。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"多线程编程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多线程编程","aria-hidden":"true"}},[this._v("#")]),this._v(" 多线程编程")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"并发-concurrency"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并发-concurrency","aria-hidden":"true"}},[this._v("#")]),this._v(" 并发 - Concurrency")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("CPU 按照"),e("a",{attrs:{href:""}},[this._v("时间片")]),this._v("来进行调度，单个 CPU 或 单个核在某一个时刻只能处理一个 Thread。CPU 运行极快，在执行上下文迅速切换时候，在我们看来，就像是 "),e("strong",[this._v("多个线程同时运行")]),this._v("。这就是并发的概念。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"并发与"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并发与","aria-hidden":"true"}},[this._v("#")]),this._v(" 并发与")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"协程-coroutine"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#协程-coroutine","aria-hidden":"true"}},[this._v("#")]),this._v(" 协程 Coroutine")])}],!1,null,null,null);e.default=n.exports}}]);