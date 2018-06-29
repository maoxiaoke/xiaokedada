# CSS 2.2 阅读手册

::: warning
本手册的翻译约定如下：

- “元素” 对应于 "element"，通常指的是 HTML 的 TAG。
- “属性” 对应于 "property"，而非 "attribute"。有些文章会为了区分 "property" 和 "attribute"，称呼前者为 “特性”，后者为 “属性”。对我而言，如果你遇到 “属性”，请替换成 "property"。
- User Agent 通常指的就是 “浏览器”。
- "specificity" 译成“特指度”。
- "visual formatting model" 翻译成“视觉格式模型”。
:::

## 1 About the CSS 2.2 Specification

1. 对于一个 CSS 属性应该关注的点
  - Property-name：名称
  - value：合法的值或者术语
  - initial: 初始值
  - Applies to：所有的元素被认为拥有所有的 properties, 但有些 property 对特定的元素是没有渲染效果的
  - Inherited：继承性，能否被继承
  - Percentages: 如果 value 是百分比值，如何被解释。`N/A` 表示不接受百分比参数
  - Media：属性作用的媒体类型
  - Computed value：确定如何计算 computed value（6.1节介绍）

## 2 Introduction to CSS 2.2

2. CSS 的设计原则

## 3 Conformance: Requirements and Recommendations

几个关键概念的区分：

#### `Element` 和 `Replaced element` 

`Element` 是诸如 `p`、`table` 和 `ol` 等的 DOM 元素。

`Replaced element` 指的是内容(content)超出 `CSS formatting model` 的某些元素。也就是说，元素的内容不受当前文档样式的影响，内容是可替换的。这很好理解，因为元素的内容来自当前文档的外部。

有哪些元素是可替换的的呢。这个问题可以换个提法，就是哪些元素的内容是*嵌入*的呢？我们可以参考 [HTML5 标准协议](https://www.w3.org/TR/html5/dom.html#embedded-content-2)

> Embedded content is content that imports another resource into the document, or content from another vocabulary that is inserted into the document.

标准还给出了内容是嵌入式的元素。`<img>`、`<canvas>`、`<audio>`、`<embed>`、`<math>`、`<object>`、`<picture>`、`<svg>`、`<video>`。

比如一张图片、嵌入式的文档和小程序。比如，`<img>` 元素经常被指定给 `src` 属性的图片所取代。**`Replaced element` 一般有固有尺寸：固有的宽、高和比例**(不过，User Agent 可能会有其他实现)。

> 固有尺寸是元素自身定义的宽和高，不受周围的元素影响。

::: tip
有一点需要注意，我们可以使用 CSS 来控制图片和 iframe 的尺寸。实际上，元素本身是被设置属性的，但*内容*是不能的。
:::

以下的文章，可供参考：

+ [What are HTML Replaced Elements VS Non-Replaced Elements with Examples](http://ahmed.amayem.com/html-replaced-elements-non-replaced-elements-examples/)
+ [Replaced element](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)
#### Attribute 和 Property 在标准中的区分

Attribute 是一个和元素有关的*键值对*。比如，`<input>` 里可以定义为 `button` 类型，需要在内部添加 `type="button"`。

CSS 定义的一组有限的参数，就是 Property，用于指导文档的渲染，也由*键值对*组成。比如，`border-color: red`。

## 6 Assigning property values, Cascading, and Inheritance

几个问题的了解：

### property的值(value)是如何得到的？

User agent 解析 DOM 时，会为每个元素的每个属性(property)赋值。这个值由下面四个步骤决定(每个属性的值都有这四个步骤)：

- 第一步，由规范确定该值(`specified value`)
- 第二步， specified value 解析为一个用于子元素继承的值(`computed value`)
- 第三步，在有必要的时候，computed value 会转换成一个固定的值(`used value`)
- 第四步，最根据所在的环境限制将 used value 转换的一个实际值(`actual value`)

之后，我们将解答两个问题。1. 四类值是怎么来的；2. 四类值的作用

#### Specified values

User agents 依据规则给每个属性所赋的值就是 specified value。规则如下:

- 如果是 “层叠”(cascade) 的结果，便是这个值。同时，如果该值是继承过来的, specified values 就是继承来的值(The 'inherit' value)
- 否则，如果该属性是可继承的属性，并且该属性依附的元素不是根元素，使用父元素的 computed value。
- 否则，使用属性的初始值(initial)

> “继承来的值” 区别于 “继承属性”。“继承来的值” 使用关键字 `inherit` 进行标定。每个属性都有这个关键字，**它将父元素的 computed value 作为自己的 specified value**。这个值也是在“层叠时”进行计算的。
> 
下面这个例子：
```sass
/*
<div class="parent">
  <div class="child"></div>
</div>
*/
.parent
  width: 400px
  height: 200px
  border: 1px solid red
  .child
    width: 200px
    height: 100px
    border: inherit
```

上面这个例子中，子元素 `.child` 的 `border` 的 `specified value` 就是由父元素 `.parent` 的 `computed value` 继承过来的。

如果 `inherit` 关键字用于根元素的属性上，则和初始值(`initial`)保持一致。

而可被继承属性是另外一种意思，比如 `font-size`，就是可被继承的属性。

#### Computed values

在“层叠”阶段，Specified values 会被解析成 Computed values。这两类值都是在 user agent 渲染文档之前(页面布局前)进行计算的。

这一阶段，

- 将可以计算的相对值转换为绝对值。比如，一个元素有 `font-size: 12px; margin-top: 2em`，就可以转换成 `font-size: 12px; margin-top: 24px`，这种相对的长度单位转换为绝对的像素，或者相对的 uri 转换为绝对的 uri；但有些值需要在文档渲染过程时才能够计算出来，比如 `width` 属性的百分比以来页面的布局情况，此时， percentage-specified values 还是会变成 percentage-computed values，值保持一致；有些属性值不需要进行转换，比如 `line-height`，则直接变成 computed value。

computed value 阶段的主要用途，其一是处理特殊关键字，其二是用于**继承**-当有继承存在时，无论是 `inherit` 和继承属性，父元素的 computed value 就是子元素的 specified value 和 computed value(同时)。

::: tip
我认为，解析 `inherit`、`initial`、`unset` 等关键字应该是处于 specified values 阶段而非 computed values 阶段。在 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) 的描述中，computed values 阶段会 *Handling the special values inherit, initial, unset, and revert.*  MDN 依据的是 [CSS 2.0](https://www.w3.org/TR/CSS2/cascade.html#computed-value) 版本。但实际上该版本似乎并没有对此作出规定。
:::

#### Used values

Used values 就是有些元素的属性值依赖其他元素渲染出来后才能得到，在这一阶段就会进行处理。

#### Actual values

一般来说，used values 就是文档渲染时使用的值，但并不是和所有的 User Agent 都能直接应用 used values。比如，有些 User Agent 只能渲染整数像素的宽度，对于诸如 `1.2px` 这个的数值没办法处理，只能采用近似求得的就是 actual values。

### 谁有权利操纵一个元素的样式

这个问题，也就是样式的来源。有三个：`author`、`user` 和 `user agent`。

+ `Author` - 作者，通俗点，就是开发网页的程序员，他们可以通过外部引入样式表或自己定义样式表。
+ `User` - 用户，就是浏览网站的用户。比如，他们可以通过放大或缩小改变字体的大小。
+ `User Agent` - 一般来说，是浏览器。浏览器通常会定义元素的一些默认的样式。

而这三者所定义的样式，则会影响到层叠顺序(Cascading order)。

### 层叠顺序 和 特指度

CSS 的第一个字母表示的就是 “层叠”。所谓层叠，就是对于一个元素而言，可能会有多个样式表与其对应，或多个来源，可能相互产生冲突。

为了避免产生冲突，就需要定义层叠顺序，如下：

1. 查找所有作用于元素或属性的声明
2. 根据是否有 `important` 和样式来源进行排序
  - User agent 声明的优先级最低
  - 然后是 User 定义的一般声明
  - 然后是 Author 定义的一般声明
  - 然后是 Author 加 `important` 的声明
  - 最后 User 加 `important` 的声明的优先级最高
3. 如果有相同的重要性(比如，都是 Author 定义的一般声明。如果一方是 User 定义的一般声明，另一方是 Author 定义的一般声明，则 Author 定义的一般声明优先级高，胜出)，这个时候，使用特指度(Specificity )来进行优先级排序，特指度值大的优先级高；
4. 最后，按照指定顺序排序。如果有相同的权重(比如来源一致，特指度一致)，则后声明的样式胜出。

但是，对于程序员而言，大多数情况下都是处理 Author 定义的一般声明，这种情况下判断样式的胜出通常通过特指度(Specificity )。特指度实际上也是一种权重比较法。有以下规则：
+ 行内样式(就是在元素内使用 `style` attribute)，a = 1，否则 a = 0
+ 选择器中 ID attribute 的数量等于 b
+ 选择器内的其他 attribute (类) 和伪类的数量等于 c
+ 选择器内元素名和伪元素的数量等于 d

官方的例子： 

```text
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

## 8 Box model

> 盒子是 CSS 的基础。

`Document Tree` 的为每个元素生成一个盒子，并根据 `visual formatting model` 进行堆叠。

### Box model 的几个盒子属性

#### margin area

margin area 由 `margin` 属性定义。该属性对所有元素都有效。**但垂直方向的 margin 对非可替换的行内(non-replaced inline)元素无效**。

`margin` 的宽度接收以下值：

- 固定长度
- 百分比：以盒子的 `width` 作为计算对象。
- auto

:::tip
`margin`属性是接受*负值*的。相比较，`padding` 的宽度为百分比时也是以盒子的 `width` 为计算对象，但不接受负值。
:::



### 盒子的 content area 的尺寸怎么计算？

待探究。

### 盒子的 background 属性

## 9 Visual formatting model

VFM (Visual Formatting Model) 定义 User Agent 如何处理 文档树。在 VFM 中，一个元素会生成零个或更多个的盒子。这些盒子的布局收到以下因素影响：

+ 盒子尺寸和类型
+ 定位方案( normal flow/float/absolute positioning)
+ 元素之间的关系
+ 外部信息(比如：视口尺寸，图片的固有尺寸)

几个概念：

#### 视口

视口(viewport)。简而言之，视口指的是页面渲染的有效区域。当视口尺寸变化时，User Agent 可能会改变文档的布局；当不足以容纳渲染的内容时，User Agent 应该提供滚动方案。

#### Containing Blocks - 包含块

在 CSS 中，很多的盒子的位置和尺寸要根据另一个盒子进行计算，就叫做元素的 *Containing Block* (包含块)。一般来说，父盒包含子盒。

一个元素的 containing block 定义如下：

1. 根元素所在的盒，称为 *初始包含块* (initial containing block)。
2. 对于其他元素，如果元素的 `position` 属性值是 `relative` 或 `static` (也就是 in flow)，元素的包含块就是最近的父/祖先盒的 `content area`。其中，父/祖先盒是一个 Block Container Box (见下面的块容器盒) 或会生成 格式化内容 (BFC 或 IFC ，见下面的内容)。
3. 如果 `position` 属性值是 `fixed`。包含块就是视口所在的区域。
4. 如果 `position` 属性值是 `absolute`，则元素的包含块由最近的 `position` 非 `static` 属性值的父/祖先元素决定。如果其父/祖先元素是行内元素，则包含块就是生成元素的第一个和最后一个行内盒的 `padding area`；其他情况下，包含块就是其父/祖先的 `padding area`；如果没有这样的父/祖先元素，包含块就是 *初始包含块*。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Container</title>
</head>
<body>
    <div>
        <p>This is text in the first paragraph...</p>
        <p>This is Text <em>in the <strong>Second</strong> paragraph</em></p>
    </div>
</body>
</html>
```

以上面的例子为例：

+ `<p>` 的 Containing Block 由 `<div>` 确定。
+ `<em>` 和 `<strong>` 的 Container Block 都由第二个 `<p>` 确定。

如果为 `div` 和 `em` 都添加 `style="position: absolute"`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Container</title>
</head>
<body>
    <div style="position: absolute">
        <p>This is text in the first paragraph...</p>
        <p>This is Text <em style="position: absolute">in the <strong>Second</strong> paragraph</em></p>
    </div>
</body>
</html>
```

那么，根据上面第四条规则。`div` 的 Containing block 就不再由 `<body>` 而是 初始包含块 确定。`em` 的 Containing block 由 `div` 而不是原来的 `p`。

重点的问题是：`<strong>` 的 Containing block 还是由 `<p>` 确定吗。我们来看第二条规则。问题就变成 `<em>` 是不是一个 Block Container Box 了。Block Container Box 中有一条是 *如果一个非置换元素的 `display` 属性值是 `block`、`list-item` 和 `table` 所生成的盒属于 Block Container Box*。所以起初 `<em>` 的 `display: inline` 不是一个 Block Container Box。

![](http://p3puylt4n.bkt.clouddn.com/container01.jpg)

之后由于 `<em>` 的 `position` 属性值变成了 `absolute`。根据 `position`、`display` 和 `float` 之间的相互影响(见后面的内容)，`<em>` 的 `display` 属性变成了 `display: block`，从而变成 Block Container Box。

![](http://p3puylt4n.bkt.clouddn.com/container02.jpg)

:::tip
Containing block 影响到很多内容，比如很多元素属性的百分值都是由其元素的 Containing block 确定。Flex 盒也会涉及到 Containing block 的概念。
:::

接下来，是重要的 CSS2.2 中盒的类型。盒子的类型，会影响到 VFM。CSS2.2 中 `display` 属性定义盒子类型。

#### 块级盒、块容器盒和块盒

块级元素(Block-level elements)、块盒(Block boxes) 和 块容器盒(Block container box)是三个不同的概念。

*Block-level Box* - `display` 属性值为 `block`、`list-item` 和 `table` 的元素就是 块级元素。这些属性会为内容生成一个 block-level principal box。**块级元素形成的块级盒(Block-level boxes)参与 Block Formatting Context (BFC, 块级格式上下文)

*Block Container Box* - 块容器盒要么**只**包含块级盒(构成 BFC)，要么**只**包含 inline-level box(构成 IFC)。

如果一个 Block-level Box 不是 table box 或可置换元素形成的盒，那么也是一个 Block Container Box。

如果一个非置换元素的 `display` 属性值是 `block`、`list-item` 和 `table` 所生成的盒属于 Block Container Box, 同时也是 Block-level Box。

有些盒子属于 Block Container Box，但不属于Block-level Box，比如 table cell 和 inline-box。

*Block box* - 既是 Block Container Box 也是 Block-level Box 的称为 Block boxes。

Block Container Box 和 Block-level Box 在数学上其实是一个相交的概念。类似于下面这个图：

![](http://p3puylt4n.bkt.clouddn.com/block-container.png)
> [图片出处](https://stackoverflow.com/questions/30883857/css-spec-block-level-box-block-container-box-and-block-box)

第一点，Block Container Box 的用处在哪里。Block-level Box 会参与 BFC，但 Block Container Box 有什么作用呢？我们看定义：**块容器盒要么只包含块级盒(构成 BFC)，要么只包含 inline-level box(构成 IFC)**。所以呢， Block Container Box 是参与 *格式化内容*(formatting content)的。在 Block Container Box 内，要么是 BFC，要么是 IFC。

第二点，table box 不是 Block Container Box 原因原因在于 table box 参与的是 table 布局，而非 block 布局。

第三点，置换元素由于不包含其他的内容，所以也不是 Block Container Box。

> [参考](https://stackoverflow.com/questions/30883857/css-spec-block-level-box-block-container-box-and-block-box)

由上面的第一点，我们就能讨论到 Anonymous Block Box(匿名块盒) 的概念了。

**Anonymous Block Box**

很显然，Anonymous Block Box 也属于 Block-level Box。

官方的例子：

```html
<div>
  Some Text
  <p>More Text</p>
</div>
```

上面的 `<div>` 会生成一个 Block Container Box (包含 inline-content 和 block-content)，由于 Block Container Box 要么只包含 Block-level Box，要么只包含 Inline-level Box，而由于 `<p>` 是 Block-level Box，所以强制 Block Container Box 内只包含 Block-level Box。从而形成了一个 “匿名块盒”。

![](http://p3puylt4n.bkt.clouddn.com/anon-block.png)

还有一种生成 Anonymous Block Box 的方式是 *一个 inline box(下面会讲到 inline box 的概念) 包含一个处于文档流中的 block-level box*。下面这个例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Anonymous Block boxes</title>
    <style>
        p {
            font-size: 16px;
            color: red;
            border: 1px solid black;
        }
    </style>
</head>
<body>
<P style="display: inline;">
    This is anonymous text before the SPAN.
    <SPAN style="display: block;">This is the content of SPAN.</SPAN>
    This is anonymous text after the SPAN.
</P>
</body>
</html>
```

添加 `display: inline` 使得 `<p>` 变成一个 inline box，添加 `display: block` 使得 `<span>` 变成一个 block-level box。得到的结果如下图：

![](http://p3puylt4n.bkt.clouddn.com/anonymous-block-box.jpg)

block-level box 将 inline box 分成两个 Anonymous Block Box(即便有一边是空的，也是如此)。结果就是，在 `<p>` 内部包含一个 Anonymous Block Box，接着是 `<span>` 确定的 Anonymous Block Box，最后是另一个 Anonymous Block Box。

应用于 Anonymous Block Box 的可继承属性，其值继承自其闭合的非匿名盒。比如，Anonymous Block Box 的颜色继承元素 `<p>` 的 `color` 属性值。

另一点需要注意的是，有 Anonymous Block Box 的元素的属性值仍然只适用于该元素的框和内容。所以，上例中为 `<p>` 添加 `border: 1px solid black` 会产生上图的结果：在 Anonymous Block Box 的周围画上线条。

#### inline-level box 和 inline-box

inline-leve box 和 inline-box 就没有这么复杂了。

+ inline-level 元素是不会为内容创建一个 块 的元素，内容会在一行显示。`display` 的属性值为 `inline`、`inline-table` 和 `inline-block` 的元素就是 inline-level 元素。**inline-level 元素形成的inline-block boxes 参与 Inline Formatting Context (IFC, 块级格式上下文)
+ 当一个 非置换的元素的 `display` 属性值为 `inline` 时，就是一个 inline-box。

**Anonymous inline boxes**

同理，CSS2.2 也有一个 Anonymous inline box 的概念。

```html
<p>Some <em>emphasized</em> text</p>
```

`<em>` 是一个行内元素，包含 'emphasized' 的内容就是一个 inline box。同时也会为 'Some ' 和 ' text' 生成两个 anonymous inline box。其他特点和 Anonymous Block Box 有相似的地方。

#### collapsed margin

定义：**两个或多个**毗邻的盒子(可能是兄弟盒，也可能不是)会坍塌成一个 margin。

关键字解释：

**毗邻** - 毗邻的要求如下(都满足)：

- 全都是处于文档流(in-flow)的 block-level-box，并参与到相同的 BFC 中。
- 不是 line box，没有 clearance, 没有 padding 或 border 将它们隔开。