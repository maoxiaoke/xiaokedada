# CSS的布局方式

在CSS的布局世界中，大概有**固定宽度布局**、**流式布局**、**响应式布局**和**弹性布局**。固定宽度的布局，就是不管浏览器宽度有多宽，页面中内容的宽度始终一致。流式布局，就是宽度百分比设定，而不是绝对的像素值，这样随着改变浏览器窗口的尺寸，页面也随之变化。响应式布局主要是为不同宽度的尺寸的设备提供不同的布局。

本文主要是总结一些常见的布局。

<!-- TOC -->

- [CSS的布局方式](#css)
  - [display](#display)
  - [margin: auto](#margin--auto)
  - [box-sizing](#box-sizing)
  - [position](#position)
  - [float](#float)
  - [overflow: auto 和 overflow: hidden](#overflow--auto--overflow--hidden)
  - [flex](#flex)
  - [CSS 2.2 的定位方案](#css-22)

<!-- /TOC -->

## display

每个元素都有一个display属性，比较常见的有以下值:

+ none: 一些元素得默认属性，通常被JavaScript用来在**不删除元素**得情况下隐藏或显示元素。值得注意的是，被隐藏的元素不占据物理空间，但是`visibility: hidden;`还是会占据空间
+ block: 块级元素，开始一行并且尽可能撑满容器
+ inline: 行内元素
+ inline-block: 元素在行内，但是却表现得像块级元素，也就是说有自己`width`、`height`等属性
+ flex: 弹性盒

---

## margin: auto

对一个块级元素使用`margin: 0 auto`，这样设置**左右外边距**为auto可以使其水平居中。这是一种让块级元素水平居中的方法。

看这个例子:

```css
#main {
  width: 600px;
  margin: 0 auto;
}
```

这个样式表设置我们的一个块级元素的宽度是600px。但是如果把浏览器窗口缩小到比width要小的情况下，就会显示一个水平的滚动条来显示。为了更适应小窗口的变化，可以用`max-width`属性会更为妥帖。

```css
#main {
  max-width: 600px;
  margin: 0 auto;
}
```

---

## box-sizing

为了改变传统盒子的计算问题，CSS3有了一个box-sizing属性。这个属性如果设置成`border-box`。

```css
box-sizing: border-box;
```

这个属性值确保我们的内边距和边框的宽度都不会影响width和height的属性。也就是说，内边距和外边距的宽度都包含在width和height属性中。

---

## position

这个属性控制浏览器在哪里并且怎样显示某个元素。有以下值:

+ static: 默认值，表示某元素不会被*positioned*，元素都有 position 属性值，没有设置该属性则均表示`static`。
+ relative: 表现得和static一样，除非你设置了`top`、`bottom`、`left`、`right`等使其偏离正常位置的值。元素不会脱离文档流。
+ fixed: 是相对于视口来定位，这意味着就算是页面滚动，它还是会停留在原来的位置。比如，有些网站的页脚。和relative一样，`top`、`bottom`、`left`、`right`这些属性都能用。元素完全脱离文档流。
+ absolute: 这是一个最棘手的属性值，它和fixed表现类似，但是它不是相对于视口，而是相对于最近的一个*positioned*祖先元素。如果没有*positioned*的祖先元素，那么就相对于文档的body 元素。元素完全脱离文档流。

---

## float

浮动布局，常用来实现文本环绕。有`left`、`right`和`none`三个属性值。

`clear`属性则常用来清除和控制浮动。`left`值用来清除向左浮动、`right`用来清除向右浮动，`both`用来清除向左向右浮动。

---

## overflow: auto 和 overflow: hidden

在布局的时候，经常会遇到*溢出*的情况，overflow可以针对溢出做一些事情。

+ overflow: hidden ， 隐藏超出盒子边界的内容
+ overflow: scroll ， 添加滚动条
+ overflow: auto ，需要的时候添加滚动条

---

## flex

请参考[Flexbox的完全教程]({{ '/2017/07/15/Flex' | prepend: site.baseurl }})

---

## CSS 2.2 的定位方案

标准: [Positioning schemes](https://www.w3.org/TR/CSS22/visuren.html)

在 CSS2.2 中，一个盒子有三种定位方案。

+ `Normal flow`: normal flow 包括 BFC 的 block-level boxes 、IFC 的 line-level boxes 和 `relative positioning` 的 block-level boxes 和 line-level boxes。在国内，也一般称之为 文档流。
+ `Floats`: 在 float model 中，盒子先通过 normal flow 放置，然后脱离 flow (脱离文档流)，尽可能地浮动到左边或右边。内容环绕在浮动元素的周围。
+ `Absolute positioning`: 在 absolute positioning model 中，盒子完全从 normal flow 中脱离(对随后的同级元素没有任何影响)，然后使用 TRBL 设置它的位置。包括两种: `position: absolute` 和 `position: fixed`。

> 一个元素 out of flow (脱离文档流) 是说该元素 floated、absolutely positioned 或者是 根元素。

所以，浮动元素和绝对定位元素的区别在于:

+ 浮动元素尽可能地浮动到左边或者右边，直到接触到它的 containing block (可以理解为父元素) 或者 另一个浮动块的外边距。内容会环绕在浮动元素的周围，类似于文本环绕 (实际上也是出自于此)。
+ absolute 和 fixed 会完全脱离 normal flow，这意味着完全不占据空间，normal flow 表现得就好像没有这个元素一样。

> relative 不会脱离 normal flow，就意味着元素保留原来的空间，通过 TRBL 发生偏移，从而有可能会造成重叠。

---

参考： [学习CSS布局](http://zh.learnlayout.com/)