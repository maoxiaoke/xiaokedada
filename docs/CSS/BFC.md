# CSS中的BFC规则

BFC(Block Formatting Context)，中文译成 “块级格式上下文”。标准解释:

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents. -- [w3c](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)

首先，我们要理解什么是 `block boxes`(块盒子)。block boxes 和块级元素是不一致的。

> 标准中，是这样阐述的。每个 block-level element (块级元素) 产生 block-level box (块级盒)。**block-level boxes** 是参与到 BFC 的盒子。除了 table boxes，block-level box 也是 block container box (块容器盒)，block container box 要么包含 block-level boxes，要么创建 IFC 从而包含 inline-level box。并非所有的 block container boxes 是 block-level boxes。**block-level boxes，同时也是 block containers 的就是 block boxes**。好绕！标准就是这么绕人的。

所以，我们理解: 浮动的、绝对定位的元素和块容器(比如 inline-blocks, table-cells 这些)都**不是** block boxes，block boxes 是那些 `overflow` 不是 `visible` 的，两者共同为它们的内容创建了一个 BFC。

> Formatting Context 是 W3C CSS2.1 规范中的一个概念它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 BFC 和 Inline formatting context (简称 IFC)。CSS3 还增加了 GFC 和 FFC。

## BFC 的创建

不要误认为 BFC 是 block boxes 创建的哦。我们开头标准里的这句话，是有浮动的、绝对定位的元素和块容器、还有 block boxes 共同创建的(也就是 block-level boxes 创建的)。

+ 根元素
+ float 元素(float 不等于 none)
+ 绝对定位元素 (position 等于 absolute 或者 fixed)
+ inline-blocks (display: inline-box)
+ table-cell (display: table-cell)
+ 块级元素，其中 overflow 不等于 visible

> 来源: [Block formatting context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 。

---

## BFC 的规则

查阅标准，可以总结到这么几点:

+ 内部的 boxes 会在垂直方向上一个一个地叠放
+ 两个相邻子boxes 之间的垂直距离由 margin 属性确定。同属一个 BFC 的相邻子 boxes 的 margin 会发生 collapse
+ 每个子 boxes 的 left outer edge (左外侧) 接触 容器块(就是外层容器) 的 left edge (左边缘)。即便存在 float 元素也是如此。除非，子 boxes 建立一个新的 BFC
+ BFC 是页面上一个隔离的容器，容器内的子元素不会影响到外面的元素，反之也成立
+ 计算 BFC 的高度时，浮动元素也参与计算

> 主要关注 第二条、第三条和第四条

---

## BFC 的应用

### 自适应两栏/三栏布局

以三栏布局为例:

<CodepenTemplate hash="KvQgKr" title="KvQgKr" href="https://codepen.io/maoxiake/pen/KvQgKr/" />

> 根据第三条，存在 float 元素，中间的元素仍然接触外容器的左边缘。注意后边那句话，*除非建立一个新的 BFC*。

如何建立一个新的 BFC，从 BFC 的创建看，可以使用 `overflow: hidden` 创建一个 block boxes。

<CodepenTemplate hash="BdYLLx" title="BdYLLx" href="https://codepen.io/maoxiake/pen/BdYLLx/" />

### 清除内部浮动

这就是以前我常说 `overflow:hidden` 的怪异之处。

<CodepenTemplate hash="JypRJR" title="JypRJR" href="https://codepen.io/maoxiake/pen/JypRJR/" />

> 子元素使用浮动脱离了文档流，根据最后一条，我们给父元素添加 BFC 来包含 浮动元素的高度。


<CodepenTemplate hash="WEMGEL" title="WEMGEL" href="https://codepen.io/maoxiake/pen/WEMGEL/" />

## 防止垂直 margin 重叠

<CodepenTemplate hash="eEVdym" title="eEVdym" href="https://codepen.io/maoxiake/pen/eEVdym/" />

> 这是因为 BFC 的 相邻两个 margin 的 collapse 塌陷造成的。(因为根元素会创建一个 BFC)。解决方法，为子元素创建一个新的 BFC，则满足 容器内的子元素不会影响到外面的元素。

<CodepenTemplate hash="vJdXRp" title="vJdXRp" href="https://codepen.io/maoxiake/pen/vJdXRp/" />

参考：
+ [BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
+ [Visual formatting model](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)