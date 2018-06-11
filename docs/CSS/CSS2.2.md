# CSS 2.2 阅读手册

::: warning
本手册的翻译约定如下：

- “元素” 对应于 "element"，通常指的是 HTML 的 TAG。
- “属性” 对应于 "property"，而非 "attribute"。有些文章会为了区分 "property" 和 "attribute"，称呼前者为 “特性”，后者为 “属性”。对我而言，如果你遇到 “属性”，请替换成 "property"。
- User Agent 通常指的就是 “浏览器”。
- "specificity" 译成特指度。
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

`Replaced element` 指的是内容超出 `CSS formatting model` 的某些元素。比如一张图片、嵌入式的文档和小程序。比如，`<img>` 元素经常被指定给 `src` 属性的图片所取代。**`Replaced element` 一般有固有尺寸：固有的宽、高和比例**(不过，User Agent 可能会有其他实现)。

> 固有尺寸是元素自身定义的宽和高，不受周围的元素影响。

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
