(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{159:function(t,a,s){"use strict";s.r(a);var e=s(0),r=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"特指度-确定哪个样式胜出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特指度-确定哪个样式胜出","aria-hidden":"true"}},[t._v("#")]),t._v(" 特指度--确定哪个样式胜出")]),s("p",[t._v("有些"),s("code",[t._v("CSS")]),t._v("属性有些是可以继承的，有些是不可以继承的。在多个规则定义了相同的"),s("code",[t._v("CSS")]),t._v("属性，并且这些规则都应用在页面的同一元素上，有时候，会产生冲突。对于现代浏览器，有一种"),s("code",[t._v("cascade")]),t._v("的机制，用来进行冲突判定。")]),s("p",[t._v("有两种情况会导致样式冲突：")]),s("ul",[s("li",[t._v("继承，从多个祖辈那里继承相同的属性，针对标签样式的继承")]),s("li",[t._v("同一个元素有多个样式。比如说，我们为一个段落定义了"),s("code",[t._v("Class")]),t._v("样式，又定义了"),s("code",[t._v("<p>")]),t._v("标签样式")])]),s("h2",{attrs:{id:"对第一种冲突的处理方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对第一种冲突的处理方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 对第一种冲突的处理方法")]),s("p",[t._v("对于第一种冲突，我们来举一个例子。我们将"),s("code",[t._v("<body>")]),t._v("标签的文字设为红色，把"),s("code",[t._v("<p>")]),t._v("标签的文字颜色设为绿色。同时，段落中有一个"),s("code",[t._v("<strong>")]),t._v("标签，这个标签里的文字会怎么显示呢？")]),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v("body")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token property"}},[t._v("font-family")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Arial, Helvetica, sans-serif"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{attrs:{class:"token property"}},[t._v("color")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" red"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token selector"}},[t._v("p")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token property"}},[t._v("color")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" green"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"最近的祖辈胜出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最近的祖辈胜出","aria-hidden":"true"}},[t._v("#")]),t._v(" 最近的祖辈胜出")]),s("p",[t._v("浏览器对这种冲突的处理方法是，如果没有专门为标签定义样式，继承的属性出现冲突时，"),s("strong",[t._v("最近的祖辈胜出")]),t._v("。")]),s("h3",{attrs:{id:"直接应用在标签上的样式胜出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#直接应用在标签上的样式胜出","aria-hidden":"true"}},[t._v("#")]),t._v(" 直接应用在标签上的样式胜出")]),s("p",[t._v("标签专用样式里的属性会击败所有继承的属性。")]),s("hr"),s("h2",{attrs:{id:"一个标签，多个样式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一个标签，多个样式","aria-hidden":"true"}},[t._v("#")]),t._v(" 一个标签，多个样式")]),s("p",[t._v("这就是我们处理的第二种冲突，有下面几种可能会产生冲突的几种情况：")]),s("ul",[s("li",[t._v("类型选择器(也就是标签选择器)定义了样式，又有类或者"),s("code",[t._v("id")]),t._v("样式应用到标签上")]),s("li",[t._v("相同的样式名在样式表中出现多次。比如，群组选择符"),s("code",[t._v(".leadHeadline, .secondaryHeadline, .newsHeadline")]),t._v("，还有一个类样式"),s("code",[t._v(".leadHeadline")])]),s("li",[t._v("既有类样式，又有"),s("code",[t._v("id")]),t._v("样式的标签")]),s("li",[t._v("一个网页用到了多个样式表，有些是外部样式表(比如自定义的"),s("code",[t._v("styles.css")]),t._v("文件)，有些是内部样式表(应用在"),s("code",[t._v("html")]),t._v("文件内部)，还有些是链接的外部样式表(比如："),s("code",[t._v("Bootstrap")]),t._v(")，各个样式表中都有名称相同的样式")]),s("li",[t._v("多个复杂的选择器选取相同的标签")])]),s("h3",{attrs:{id:"特指度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特指度","aria-hidden":"true"}},[t._v("#")]),t._v(" 特指度")]),s("ul",[s("li",[t._v("一个标签选择器记"),s("strong",[t._v("1分")]),t._v("，伪元素(如"),s("code",[t._v("::first-line")]),t._v(")与标签一样，记为"),s("strong",[t._v("1分")])]),s("li",[t._v("一个类选择器记"),s("strong",[t._v("10分")]),t._v("，伪类(如"),s("code",[t._v(":link")]),t._v(")与类选择器一样，记为"),s("strong",[t._v("10分")])]),s("li",[t._v("一个"),s("code",[t._v("id")]),t._v("选择器记"),s("strong",[t._v("100分")])]),s("li",[t._v("一个行内样式记为"),s("strong",[t._v("1000分")])]),s("li",[t._v("后代选择器的特指度是其中各个选择器的得分总和")])]),s("p",[t._v("所以，解决方案是： "),s("strong",[t._v("特指度高的胜出")]),t._v("。")]),s("p",[t._v("如果特指度相同，则"),s("strong",[t._v("后一个样式胜出")]),t._v("。")]),s("h3",{attrs:{id:"忽略特指度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#忽略特指度","aria-hidden":"true"}},[t._v("#")]),t._v(" 忽略特指度")]),s("p",[t._v("只需要在某个属性后边加上"),s("code",[t._v("!important")]),t._v("。")]),s("h3",{attrs:{id:"避免特指度战争"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#避免特指度战争","aria-hidden":"true"}},[t._v("#")]),t._v(" 避免特指度战争")]),s("p",[t._v("为了让某个样式胜出，我们的选择符也许会像裹脚布一样又长又臭。这是应该避免的。")]),s("hr"),s("h2",{attrs:{id:"css-reset"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css-reset","aria-hidden":"true"}},[t._v("#")]),t._v(" CSS Reset")]),s("p",[t._v("为了剔除浏览器内置的一些属性，我们可以使用一些"),s("code",[t._v("CSS")]),t._v("重置代码。")]),s("p",[t._v("在这中，"),s("code",[t._v("normalize.css")]),t._v("就是个不错的重置方案。")]),s("hr"),s("h2",{attrs:{id:"实战案例：覆盖bootstrap的样式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实战案例：覆盖bootstrap的样式","aria-hidden":"true"}},[t._v("#")]),t._v(" 实战案例：覆盖Bootstrap的样式")]),s("p",[t._v("有时候，我们的网站会引入"),s("code",[t._v("Bootstrap.css")]),t._v("文件，有时候我们需要用自己的样式表对某个标签进行修改，有什么办法呢？")]),s("ul",[s("li",[s("code",[t._v("Bootstrap.css")]),t._v("文件在前面加载。这就是利用特指度相同，"),s("strong",[t._v("后一个样式胜出")])]),s("li",[t._v("增加特指度")]),s("li",[t._v("粗暴加入"),s("code",[t._v("!important")])])])])}],!1,null,null,null);a.default=r.exports}}]);