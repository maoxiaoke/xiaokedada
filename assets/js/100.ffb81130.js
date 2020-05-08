(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{251:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),s("p",[t._v("文章翻译自"),s("a",{attrs:{href:"https://css-tricks.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS-TRICKS"),s("OutboundLink")],1),t._v("的"),s("a",{attrs:{href:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/",target:"_blank",rel:"noopener noreferrer"}},[t._v("A Complete Guide to Flexbox"),s("OutboundLink")],1),t._v("。本译文会在不破坏原文的基础上进行删除和修正。")]),s("p",[t._v("弹性盒布局(Flexbox Layout)旨在为容器(container)内的项目(item)的布局、对齐和空间分配提供一个更为便捷的方式，即便它们的尺寸是未知的或可变(弹性)的。")]),s("p",[t._v("它的主要思想是，让容器可以改变子元素(项目)的宽度和长度，从而充分地填充空间。一个弹性容器通过扩展子元素可以有效地填满自由空间，或者收缩它们以防止溢出。")]),s("p",[t._v("更重要的是，相对于常规布局(垂直方向的block布局和水平方向的inline布局)来说，弹性布局是方向无关的。虽然它们都表现不错，但是在大型和复杂项目中还是缺乏弹性(尤其是改变方向、重设大小、伸展、收缩等问题)。")]),s("blockquote",[s("p",[t._v("Note: 弹性盒布局最适合应用组件或者小型布局，而"),s("a",{attrs:{href:"https://css-tricks.com/snippets/css/complete-guide-grid/",target:"_blank",rel:"noopener noreferrer"}},[t._v("网格布局"),s("OutboundLink")],1),t._v("(Grid)则是为大型布局设计的。")])]),t._m(1),t._m(2),s("p",[t._v("因为弹性盒是一整个模块而不是一个单一的属性，所以包含一系列的属性。其中一部分设置在容器上(父元素，也叫做flex container)，另外的设置在子元素上(叫做flex-items)。")]),s("p",[t._v("下面的这张图解释了弹性布局的主要思想。")]),t._m(3),s("p",[t._v("一般，子元素(items)要么按照主轴(main axis, from main-start to main-end)排列，要么按照交叉轴(cross axis, from cross-start to cross-end)排列。")]),t._m(4),s("hr"),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),s("p",[t._v("这个属性定义一个弹性容器(flex container)；给定值确定是inline或是block。它为所有子元素提供一个弹性上下文(flex context)。")]),t._m(10),t._m(11),t._m(12),t._m(13),t._m(14),s("p",[t._v("flex-direction属性")]),t._m(15),s("p",[t._v("建立main-axis，结果是确定了flex items在flex container的方向。弹性盒是一个(除了换行)单方向的布局概念。我们可以认为它要么在水平行上进行布局，要么在水平列上进行布局。")]),t._m(16),t._m(17),s("p",[t._v("flex-wrap属性")]),t._m(18),s("p",[t._v("默认情况下，flex items会尽量在一行排列。你可是使用这个属性保证它们可以换行。")]),t._m(19),t._m(20),t._m(21),t._m(22),s("p",[t._v("这个属性定义了沿main axis的对齐方式。它会帮助分配多余的自由空间，无论一行中的flex items是非弹性(译注: 尺寸固定的)的，还是弹性但达到了最大尺寸。如果flex items溢出了一行，它同样对于对齐它们发挥着效力。")]),t._m(23),t._m(24),t._m(25),t._m(26),s("p",[t._v("这个属性定义了flex items如何沿着cross axis布局的默认行为。可以把它认为是cross-axis的justify-content。")]),t._m(27),t._m(28),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._m(29),t._m(30),t._m(31),t._m(32),t._m(33),s("p",[s("a",{attrs:{href:"https://stackoverflow.com/questions/34606879/whats-the-difference-between-flex-start-and-baseline",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考链接"),s("OutboundLink")],1),s("a",{attrs:{href:"https://en.wikipedia.org/wiki/Baseline_(typography)",target:"_blank",rel:"noopener noreferrer"}},[t._v("Baseline"),s("OutboundLink")],1)])]),t._m(34),t._m(35),s("p",[t._v("在cross-axis有多余的空间的时候，这个属性用来对齐容器的行(line)(译注: 指的是一行一行的flex items)。类似于justify-content在main-axis处对齐单个items。")]),t._m(36),t._m(37),t._m(38),t._m(39),t._m(40),t._m(41),t._m(42),s("p",[t._v("flex属性是flex-grow、flex-shrink和flex-basis组合的简写。第二个和第三个参数(就是flex-shrink 和flex-basis)是可选的。默认为: 0 1 auto。")]),t._m(43),t._m(44),t._m(45),s("p",[t._v("flex-grow")]),s("p",[t._v("这个熟悉提供给一个item生长(grow)的能力。它接受一个无单位的值作为比例。它决定item在flex container所占据的有效空间大小。")]),t._m(46),s("p",[t._v("如果所有的items的flex-grow属性都设置为1，则容器内剩余的空间会均等分配给所有子元素。如果其中有一个子元素的值设置为2，则会比其他元素多占据两倍的空间。")]),t._m(47),s("p",[t._v("flex-shrink")]),s("p",[t._v("这个属性确定一个flex item收缩的能力。")]),t._m(48),t._m(49),t._m(50),s("p",[t._v("负值是无效的。")]),s("p",[t._v("flex-basis")]),t._m(51),t._m(52),t._m(53),t._m(54),t._m(55),s("p",[t._v("默认情况下，flex items按照资源顺序排列。然而，order属性可以控制他们出现在flex container的顺序。")]),t._m(56),t._m(57),s("hr"),t._m(58),t._m(59),s("CodepenTemplate",{attrs:{hash:"LLvNyY",title:"a flex example",href:"https://codepen.io/maoxiake/pen/LLvNyY/"}})],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"flexbox的完全教程-翻译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#flexbox的完全教程-翻译","aria-hidden":"true"}},[this._v("#")]),this._v(" Flexbox的完全教程 [翻译]")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("a",{attrs:{href:"#flexbox"}},[t._v("Flexbox的完全教程 [翻译]")]),s("ul",[s("li",[s("a",{attrs:{href:"#basics-terminology"}},[t._v("Basics & Terminology")])]),s("li",[s("a",{attrs:{href:"#properties"}},[t._v("Properties")]),s("ul",[s("li",[s("a",{attrs:{href:"#properties-for-the-parent"}},[t._v("Properties for the Parent")]),s("ul",[s("li",[s("a",{attrs:{href:"#display"}},[t._v("display")])]),s("li",[s("a",{attrs:{href:"#flex-flow"}},[t._v("flex-flow")])]),s("li",[s("a",{attrs:{href:"#justify-content"}},[t._v("justify-content")])]),s("li",[s("a",{attrs:{href:"#align-items"}},[t._v("align-items")])]),s("li",[s("a",{attrs:{href:"#align-content"}},[t._v("align-content")])])])]),s("li",[s("a",{attrs:{href:"#properties-for-the-children"}},[t._v("Properties for the Children")]),s("ul",[s("li",[s("a",{attrs:{href:"#flex"}},[t._v("flex")])]),s("li",[s("a",{attrs:{href:"#order"}},[t._v("order")])]),s("li",[s("a",{attrs:{href:"#align-self"}},[t._v("align-self")])])])])])]),s("li",[s("a",{attrs:{href:"#http---p3puylt4nbktclouddncom-align-selfjpg"}},[s("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/align-self.jpg",alt:""}})])]),s("li",[s("a",{attrs:{href:"#examples"}},[t._v("Examples")])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"basics-terminology"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#basics-terminology","aria-hidden":"true"}},[this._v("#")]),this._v(" Basics & Terminology")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/flexbox.png",alt:"Flexbox"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("strong",[t._v("main axis")]),t._v(" - flex container的主轴是flex items排列的首要轴线。需要注意的是，它们并不一定是水平的。它由"),s("code",[t._v("flex-direction")]),t._v("确定。")]),s("li",[s("strong",[t._v("main size")]),t._v(" - A flex item's width or height, whichever is in the main dimension, is the item's main size.")]),s("li",[s("strong",[t._v("cross axis")]),t._v(" - 对应main axis垂直方向就是cross axis，方向取决于main axis的方向。")]),s("li",[s("strong",[t._v("cross size")]),t._v(" - The width or height of a flex item, whichever is in the cross dimension, is the item's cross size.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"properties"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#properties","aria-hidden":"true"}},[this._v("#")]),this._v(" Properties")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译者注：有些属性作用在flex-container上，有些作用在flex items上。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"properties-for-the-parent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#properties-for-the-parent","aria-hidden":"true"}},[this._v("#")]),this._v(" Properties for the Parent")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/flex-container.svg",alt:"flex-container"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"display"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#display","aria-hidden":"true"}},[this._v("#")]),this._v(" display")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("display")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("/* or inline-flex */")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("Note: CSS columns have no effect on a flex container.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"flex-flow"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#flex-flow","aria-hidden":"true"}},[this._v("#")]),this._v(" flex-flow")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("flex-flow是属性flex-direction和flex-wrap的简写方式，这两者一起确定flex container的main axis和cross axis。默认值为: "),e("code",[this._v("row nowrap")]),this._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("flex-flow: <‘flex-direction’> || <‘flex-wrap’>\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/flex-direction2.svg",alt:"flex-direction"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex-direction")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" row | row-reverse | column | column-reverse"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("row (default): 从左至右并排显示")]),e("li",[this._v("row-reverse: 从右至左并排显示")]),e("li",[this._v("column: 从上到下纵向叠放")]),e("li",[this._v("column-reverse: 和column相反")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/flex-wrap.svg",alt:"flex-wrap"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex-wrap")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" nowrap | wrap | wrap-reverse"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("nowrap (default): 所有flex items在一行")]),e("li",[this._v("wrap: 允许换行，从上往下")]),e("li",[this._v("warp-reverse: 和wrap相反，从下往上")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"justify-content"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#justify-content","aria-hidden":"true"}},[this._v("#")]),this._v(" justify-content")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/justify-content.svg",alt:"justify-content"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("justify-content")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex-start | flex-end | center | space-between | space-around"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("flex-start (default) : items沿着起始线堆积")]),e("li",[this._v("flex-end : items沿着终点线堆积")]),e("li",[this._v("center : items在一行内居中对齐")]),e("li",[this._v("space-between : items均匀分布在一行。第一个item在起始线，最后一个item在终点线")]),e("li",[this._v("space-around : items均匀分布在一行，items之间有相等的空间分隔。注意的是，视觉上这些空间并不相等，因为所有的items在两边有相等的空间。第一个item相对于container有一个单元的空间，但是相对于下一个item却又两个单元的空间，因为下一个item也将自己两边的空间叠加上去了。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"align-items"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#align-items","aria-hidden":"true"}},[this._v("#")]),this._v(" align-items")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/align-items.svg",alt:"align-items"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("align-items")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex-start | flex-end | center | baseline | stretch"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("flex-start : items放置在cross-start行的margin边界")]),e("li",[this._v("flex-end : items 放置在 corss-end 行的 margina 边界")]),e("li",[this._v("center : items 在 cross-axis 的居中位置")]),e("li",[this._v("baseline : items 沿着它们的 baselines 对齐")]),e("li",[this._v("stretch (default) : 伸展以填充整个容器(min-width/max-width仍起作用)")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译者注："),e("code",[this._v("align-items")]),this._v(" 属性值为 "),e("code",[this._v("baseline")]),this._v(" 表达的含义")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("baseline 定义指的是"),e("em",[this._v("其内容的基准线")]),this._v('。这实际上是一个英文书写中的一个概念: the baseline is the line upon which most letters "sit" and below which descenders extend.')])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/baseline01.png",alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("所以当 items 之间的 "),e("code",[this._v("font-size")]),this._v(" 不一致的时候，其表现就和 "),e("code",[this._v("flex-start")]),this._v(" 不同了。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/baseline02.png",alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"align-content"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#align-content","aria-hidden":"true"}},[this._v("#")]),this._v(" align-content")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/align-content.svg",alt:"align-content"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("Note: 当flex items只占据一行时，这个属性没有作用")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("align-content")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex-start | flex-end | center | space-between | space-around | stretch"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("flex-start : 行沿着container的开始堆积")]),e("li",[this._v("flex-end : 行沿着container的结尾堆积")]),e("li",[this._v("center : 行沿着container的中心堆积")]),e("li",[this._v("space-between : 行平均分配。第一行在container的开始位置，最后一行在结尾位置")]),e("li",[this._v("space-around : 行平均分配，行中间有固定空间")]),e("li",[this._v("stretch (default) : 行拉伸以占领整个空间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"properties-for-the-children"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#properties-for-the-children","aria-hidden":"true"}},[this._v("#")]),this._v(" Properties for the Children")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译注: 子元素的属性是相对于单个item来说的，此处有删节")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/flex-items.svg",alt:"flex-items"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"flex"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#flex","aria-hidden":"true"}},[this._v("#")]),this._v(" flex")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("blockquote",[s("p",[t._v("flex 还有其他简写：flex: none ("),s("code",[t._v("0 0 auto")]),t._v(")，flex：auto("),s("code",[t._v("1 1 auto")]),t._v("), flex: 1 ("),s("code",[t._v("1 1 0%")]),t._v("), flex: 0("),s("code",[t._v("0 1 auto")]),t._v(")")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" none | [ <"),s("span",{attrs:{class:"token string"}},[t._v("'flex-grow'")]),t._v("> <"),s("span",{attrs:{class:"token string"}},[t._v("'flex-shrink'")]),t._v(">? || <"),s("span",{attrs:{class:"token string"}},[t._v("'flex-basis'")]),t._v("> ]\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("建议使用简写方式而不是为每个属性单独设置参数。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译者注：该属性默认是 0，即如果存在剩余空间，也不进行生长。")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex-grow")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <number>"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("/* default 0 */")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译者注：该属性默认为 1，即如果空间不足，就会缩小。")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex-shrink")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <number>"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("/* default 1 */")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译者注：如果所有 items 的 flex-shrink 属性值都为 1，当空间不足时，都将等比例缩小。如果一个 item 的 flex-shrink 属性值为 0，其他 items 为 1，则空间不足时，属性值为 0 的不缩小。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("这个属性定义剩余空间被分配前一个元素的默认尺寸。"),e("code",[this._v("auto")]),this._v("关键词的意思是: 请查看我的width和height属性。"),e("code",[this._v("content")]),this._v("关键字的意思是: 尺寸基于item的内容。")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("flex-basis")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <length> | auto"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("/* default auto */")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"order"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#order","aria-hidden":"true"}},[this._v("#")]),this._v(" order")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/order-2.svg",alt:"order-2"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译注: 图片中的数字指代的是items的序号，很index属性的值相似")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("order")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <integer>"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),s("p",[t._v("以下是补充内容。")]),s("h4",{attrs:{id:"align-self"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#align-self","aria-hidden":"true"}},[t._v("#")]),t._v(" align-self")]),s("p",[t._v("align-self 同样是 flex items 的一个属性，应用于单个 flex item。")]),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{attrs:{class:"token selector"}},[t._v(".item")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token property"}},[t._v("align-self")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" auto | flex-start | flex-end | center | baseline | stretch"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("/* defaul auto */")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("align-self 赋予某个 flex item 在 cross-axis 不同的定位能力。")]),s("p",[s("img",{attrs:{src:"http://p3puylt4n.bkt.clouddn.com/align-self.jpg",alt:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"examples"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples","aria-hidden":"true"}},[this._v("#")]),this._v(" Examples")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("译注: 对原文提供的examples有修改")])])}],!1,null,null,null);e.default=n.exports}}]);