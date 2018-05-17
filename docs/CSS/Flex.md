# Flexbox的完全教程 [翻译]

文章翻译自[CSS-TRICKS](https://css-tricks.com/)的[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)。本译文会在不破坏原文的基础上进行删除和修正。

弹性盒布局(Flexbox Layout)旨在为容器(container)内的项目(item)的布局、对齐和空间分配提供一个更为便捷的方式，即便它们的尺寸是未知的或可变(弹性)的。

它的主要思想是，让容器可以改变子元素(项目)的宽度和长度，从而充分地填充空间。一个弹性容器通过扩展子元素可以有效地填满自由空间，或者收缩它们以防止溢出。

更重要的是，相对于常规布局(垂直方向的block布局和水平方向的inline布局)来说，弹性布局是方向无关的。虽然它们都表现不错，但是在大型和复杂项目中还是缺乏弹性(尤其是改变方向、重设大小、伸展、收缩等问题)。

> Note: 弹性盒布局最适合应用组件或者小型布局，而[网格布局](https://css-tricks.com/snippets/css/complete-guide-grid/)(Grid)则是为大型布局设计的。

<!-- TOC -->

- [Flexbox的完全教程 [翻译]](#flexbox)
  - [Basics & Terminology](#basics-terminology)
  - [Properties](#properties)
    - [Properties for the Parent](#properties-for-the-parent)
      - [display](#display)
      - [flex-flow](#flex-flow)
      - [justify-content](#justify-content)
      - [align-items](#align-items)
      - [align-content](#align-content)
    - [Properties for the Children](#properties-for-the-children)
      - [flex](#flex)
      - [order](#order)
  - [Examples](#examples)

<!-- /TOC -->


## Basics & Terminology

因为弹性盒是一整个模块而不是一个单一的属性，所以包含一系列的属性。其中一部分设置在容器上(父元素，也叫做flex container)，另外的设置在子元素上(叫做flex-items)。

下面的这张图解释了弹性布局的主要思想。

![Flexbox](http://p3puylt4n.bkt.clouddn.com/flexbox.png)

一般，子元素(items)要么按照主轴(main axis, from main-start to main-end)排列，要么按照交叉轴(cross axis, from cross-start to cross-end)排列。

+ **main axis** - flex container的主轴是flex items排列的首要轴线。需要注意的是，它们并不一定是水平的。它由`flex-direction`确定。
+  **main size** - A flex item's width or height, whichever is in the main dimension, is the item's main size.
+ **cross axis** - 对应main axis垂直方向就是cross axis，方向取决于main axis的方向。
+ **cross size** - The width or height of a flex item, whichever is in the cross dimension, is the item's cross size.

---

## Properties

> 译者注：有些属性作用在flex-container上，有些作用在flex items上。

### Properties for the Parent

![flex-container](http://p3puylt4n.bkt.clouddn.com/flex-container.svg)

#### display

这个属性定义一个弹性容器(flex container)；给定值确定是inline或是block。它为所有子元素提供一个弹性上下文(flex context)。

```css
.container {
  display: flex; /* or inline-flex */
}
```

> Note: CSS columns have no effect on a flex container.

#### flex-flow

flex-flow是属性flex-direction和flex-wrap的简写方式，这两者一起确定flex container的main axis和cross axis。默认值为: `row nowrap`。


```
flex-flow: <‘flex-direction’> || <‘flex-wrap’>
```

flex-direction属性

![flex-direction](http://p3puylt4n.bkt.clouddn.com/flex-direction2.svg)

建立main-axis，结果是确定了flex items在flex container的方向。弹性盒是一个(除了换行)单方向的布局概念。我们可以认为它要么在水平行上进行布局，要么在水平列上进行布局。

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

+ row (default): 从左至右并排显示
+ row-reverse: 从右至左并排显示
+ column: 从上到下纵向叠放
+ column-reverse: 和column相反


flex-wrap属性

![flex-wrap](http://p3puylt4n.bkt.clouddn.com/flex-wrap.svg)

默认情况下，flex items会尽量在一行排列。你可是使用这个属性保证它们可以换行。

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

+ nowrap (default): 所有flex items在一行
+ wrap: 允许换行，从上往下
+ warp-reverse: 和wrap相反，从下往上

#### justify-content

![justify-content](http://p3puylt4n.bkt.clouddn.com/justify-content.svg)

这个属性定义了沿main axis的对齐方式。它会帮助分配多余的自由空间，无论一行中的flex items是非弹性(译注: 尺寸固定的)的，还是弹性但达到了最大尺寸。如果flex items溢出了一行，它同样对于对齐它们发挥着效力。

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

+ flex-start (default) : items沿着起始线堆积
+ flex-end : items沿着终点线堆积
+ center : items在一行内居中对齐
+ space-between : items均匀分布在一行。第一个item在起始线，最后一个item在终点线
+ space-around : items均匀分布在一行，items之间有相等的空间分隔。注意的是，视觉上这些空间并不相等，因为所有的items在两边有相等的空间。第一个item相对于container有一个单元的空间，但是相对于下一个item却又两个单元的空间，因为下一个item也将自己两边的空间叠加上去了。

#### align-items

![align-items](http://p3puylt4n.bkt.clouddn.com/align-items.svg)

这个属性定义了flex items如何沿着cross axis布局的默认行为。可以把它认为是cross-axis的justify-content。

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

+ flex-start : items放置在cross-start行的margin边界
+ flex-end : items放置在corss-end行的margina边界
+ center : items在cross-axis的居中位置
+ baseline : items沿着它们的baselines对齐
+ stretch (default) : 伸展以填充整个容器(min-width/max-width仍起作用)

#### align-content

![align-content](http://p3puylt4n.bkt.clouddn.com/align-content.svg)

在cross-axis有多余的空间的时候，这个属性用来对齐容器的行(line)(译注: 指的是一行一行的flex items)。类似于justify-content在main-axis处对齐单个items。

> Note: 当flex items只占据一行时，这个属性没有作用

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

+ flex-start : 行沿着container的开始堆积
+ flex-end : 行沿着container的结尾堆积
+ center : 行沿着container的中心堆积
+ space-between : 行平均分配。第一行在container的开始位置，最后一行在结尾位置
+ space-around : 行平均分配，行中间有固定空间
+ stretch (default) : 行拉伸以占领整个空间

### Properties for the Children

> 译注: 子元素的属性是相对于单个item来说的，此处有删节

![flex-items](http://p3puylt4n.bkt.clouddn.com/flex-items.svg)

#### flex

flex属性是flex-grow、flex-shrink和flex-basis组合的简写。第二个和第三个参数(就是flex-shrink 和flex-basis)是可选的。默认为: 0 1 auto。

> flex 还有其他简写：flex: none (`0 0 auto`)，flex：auto(`1 1 auto`), flex: 1 (`1 1 0%`), flex: 0(`0 1 auto`)

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

> 建议使用简写方式而不是为每个属性单独设置参数。

flex-grow

这个熟悉提供给一个item生长(grow)的能力。它接受一个无单位的值作为比例。它决定item在flex container所占据的有效空间大小。

> 译者注：该属性默认是 0，即如果存在剩余空间，也不进行生长。

如果所有的items的flex-grow属性都设置为1，则容器内剩余的空间会均等分配给所有子元素。如果其中有一个子元素的值设置为2，则会比其他元素多占据两倍的空间。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

flex-shrink

这个属性确定一个flex item收缩的能力。

> 译者注：该属性默认为 1，即如果空间不足，就会缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

> 译者注：如果所有 items 的 flex-shrink 属性值都为 1，当空间不足时，都将等比例缩小。如果一个 item 的 flex-shrink 属性值为 0，其他 items 为 1，则空间不足时，属性值为 0 的不缩小。

负值是无效的。

flex-basis

这个属性定义剩余空间被分配前一个元素的默认尺寸。`auto`关键词的意思是: 请查看我的width和height属性。`content`关键字的意思是: 尺寸基于item的内容。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```


#### order

![order-2](http://p3puylt4n.bkt.clouddn.com/order-2.svg)

> 译注: 图片中的数字指代的是items的序号，很index属性的值相似

默认情况下，flex items按照资源顺序排列。然而，order属性可以控制他们出现在flex container的顺序。

```css
.item {
  order: <integer>;
}
```

---

## Examples

> 译注: 对原文提供的examples有修改

<CodepenTemplate hash="LLvNyY" title="a flex example" href="https://codepen.io/maoxiake/pen/LLvNyY/" />
