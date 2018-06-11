# CSS 专家提示[翻译]

> 文章来源 [css-protips](https://github.com/AllThingsSmitty/css-protips)
> 
## 最简单的 CSS Reset

CSS Resets 强化跨浏览器的一致性，并提供元素以干净的层叠样式。你可以使用诸如 [Normalize](http://necolas.github.io/normalize.css/) 的 CSS reset 库。或者使用一种更为简单的方式：

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

现在，所有的元素都除掉了浏览器默认的 `margin` 和 `padding`，`box-sizing` 让你可以使用 CSS 盒模型管理布局。

#### [Demo](http://codepen.io/AllThingsSmitty/pen/kkrkLL)

> 如果遵循下面的 [继承 box-sizing](), 你可以选择不在 CSS Reset 中包含 `box-sizing`。

## 继承 box-sizing

让所有元素 `box-sizing` 继承自 `html`。

```css
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}
```

> 这种方式更容易在一些插件中或其他组件中改变 `box-sizing` 的值。
> 
## 重置元素的所有属性，使用 unset

当重置一个元素的所有属性，并不需要重置它的每个属性。

```css
button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 0;
}
```

你使用简写的 `all` 来指定所有的元素属性，其值为 `unset` 将元素的属性重置为最初值。

```css
button {
  all: unset;
}
```

> 兼容性提示：`all` 在 `IE11` 内不支持，目前是否在 `Edge` 中支持也不确定。
> 
## 使用 :not() 应用于导航

为了满足导航类样式的设计，通常的做法是：

```css
/* add border */
.nav li {
  border-right: 1px solid #666;
}
```

然后将 `border` 从最后一个元素去除。

```css
.nav li:last-child {
  border-right: none;
}
```

使用伪类 `:not()` 作用于你想要的元素。

```css
.nav li:not(:last-child) {
  border-right: 1px solid #666;
}
```

你当然可以使用 `.nav li + li`，但是 `:not()` 有表述更清晰，更符合我们描述的方式。

#### [Demo](http://codepen.io/AllThingsSmitty/pen/LkymvO)

## 往 body 中添加 `line-height`

你不需要为每个 `<p>`、`<h*>` 等元素添加 `line-height`。相反，把它添加到 `body` 元素。

```css
body {
  line-height: 1.5;
}
```

这样，文本元素就可以轻松地从 `body` 元素进行继承。

#### [Demo](http://codepen.io/AllThingsSmitty/pen/VjbdYd)

## 垂直居中任何内容

这并不是什么黑魔法，但非常有效：

```css
html, body {
  height: 100%;
  margin: 0;
}

body {
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
}
```

想要在任意情况任何地方垂直或水平居中元素内容，CSS-Tricks 网站上[有一篇非常好的文章](https://css-tricks.com/centering-css-complete-guide/)。

> 译者注: 该文章已被译者翻译，[CSS 居中的完整教程](./Center.md)
> 
> 注意，flex 盒在猪队友 IE11 上有一些[怪异的问题](https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items)。
> 
## 逗号分隔的列表

让列表项看起来像一个真的逗号分隔的列表。

```css
ul > li:not(:last-child)::after {
  content: ",";
}
```

使用 `:not()` 伪类，让最后一个列表项不添加逗号。

> 注意：这个提示对于用户的可访问性并不是理想的，尤其是视频阅读的用户。而且，在浏览器里进行的复制、拷贝操作对于 CSS 生成的内容并不会有效果。谨慎使用。
> 

## 使用负值的 nth-child 选择项

使用负的 `nth-child` 选择 1 到 n 的项目。

```css
li {
  display: none;
}

/* 选择排序 1 到 3 项目， 并且展示它们*/
li:nth-child(-n+3) {
  display: block;
}
```

既然了解了 `:not()`，尝试：

```css
/* 选择除了前三个的所有项，并且展示它们 */
li:not(:nth-child(-n+3)) {
  display: none;
}
```

#### [Demo](http://codepen.io/AllThingsSmitty/pen/WxjKZp)

## 使用 SVG 图标

没有理由不使用 SVG 图标。

```css
.logo {
  background: url("logo.svg");
}
```

SVG 对所有分辨率设备都要很好的适配性，并且适配 IE9 及以上的所有浏览器。抛弃 `.png`、`.jpg`、`.gif` 等文件类型吧。

注意：如果你有对视力障碍用户专用的 SVG 按钮，但加载失败。下面的样式可以提升可访问性。

```css
.no-svg .icon-only::after {
  content: attr(aria-label);
}
```

## 使用 “迟钝的猫头鹰” 选择器

这可能是个奇怪的名字，但是使用通用选择器(`*`) 结合兄弟选择器(`+`)可以提供强大的 CSS 能力。

```css
* + * {
  margin-top: 1.5em;
}
```

这个例子中，文档流中的紧接着一个元素之后的所有元素都会收到一个 `margin-top: 1.5rem`。

更多参考，请阅读 [Heydon Pickering's post](http://alistapart.com/article/axiomatic-css-and-lobotomized-owls)

## 为纯 CSS 滑块使用 max-height

为单纯采用 CSS 实现的滑块采用 `max-height` 和 `overflow: hidden`。

```css
.slider {
  max-height: 200px;
  overflow-y: hidden;
  width: 300px;
}
.slider:hover {
  max-height: 600px;
  overflow-y: scroll;
}
```

元素 `hover` 时延展到 `max-height` 值，由于设置了 `overflow`，滑块就出现了。

## 等宽单元格

处理表格非常痛苦。尝试使用 `table-layout: fixed` 来保持单元格等宽。

```css
.calendar {
  table-layout: fixed;
}
```

“无痛的” 表格布局。

[Demo](https://codepen.io/AllThingsSmitty/pen/jALALm)

## “逃脱”弹性盒外边距的 Hacks

当处理列的多余空间时，丢弃 `nth-`、`first-` 和 `last-child` 等 Hack 技术，使用弹性盒的 `space-between`。

```css
.list {
  display: flex;
  justify-content: space-between;
}

.list .person {
  flex-basis: 23%;
}
```

现在，列的多余空间会被均匀分配。

## 使用属性选择器处理“空的”链接

当 `<a>` 元素没有文本值但 `href` 属性有链接时，直接展示链接的方法：

```css
a[href^="http"]:empty::before {
  content: attr(href);
}
```

这非常方便。

[Demo](https://codepen.io/AllThingsSmitty/pen/zBzXRx)

## 为 “默认” 链接添加样式

为 “默认” 的链接添加样式：

```css
a[href]:not([class]) {
  color: #008000;
  text-decoration: underline;
}
```

通过 CMS 插入的链接通常没有 `class` 属性，上述方法可以不影响其他元素的情况下突出链接。

## 统一的垂直结构

在一个元素内使用通用选择器(`*`)来创建一致的垂直结构：

```css
.intro > * {
  margin-bottom: 1.25rem;
}
```

一致的垂直结构让内容更为已读，极具审美。

## 内部比例盒

为了创建一个内部比例盒，所需要的仅仅是为一个 `div` 增加一个上内边距或下内边距。

```css
.container
  height: 0;
  padding-bottom: 20%;
  position: relative;
}

.container div {
  border: 2px dashed #ddd;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```

使用 `20%` 使得盒子的高度等于其宽度的 `20%`。无论视口的宽度是多少，子 `div` 会保持 5:1 (100% / 20%) 的比例。

## 为加载失败的图片添加样式

使用一丁点的 CSS 让加载失败的图片更美观一点。

```css
img {
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 300;
  height: auto;
  line-height: 2;
  position: relative;
  text-align: center;
  width: 100%;
}
```

然后，添加伪元素规则来展示用户信息和加载失败的图片的 url。

```css
img::before {
  content: "We're sorry, the image below is broken :(";
  display: block;
  margin-bottom: 10px;
}

img::after {
  content: "(url: " attr(src) ")";
  display: block;
  font-size: 12px;
}
```

在 [Ire Aderinokun](https://github.com/ireade/) 的[原文](http://bitsofco.de/styling-broken-images/)中了解更多。

## 全局大小使用 rem，局部大小使用 em

在根节点(`html { font-size: 100% }`)设置了基本的 `font-size` 后，使用 `em` 为其他文本元素设置 `font-size`：

```css
h2 {
  font-size: 2em;
}
p {
  font-size: 1em;
}
```

然后使用 `rem` 为模块设置 `font-size`。

```css
article {
  font-size: 1.25rem;
}

aside .module {
  font-size: .9rem;
}
```

现在，每个模块都变得条块分明，更容易书写样式，更易维护，更灵活。

## 隐藏非静音的、自动播放的 video

这是个用户自定义样式的小技巧。避免了当页面加载时，自动播放有声音的 video 来干扰用户。如果是非静音的，就不显示 video：

```css
video[autoplay]:not([muted]) {
  display: none;
}
```

再唠叨一次，我们很好地利用了 `:not()` 这个伪类。

## 为灵活的类型使用 `:root`

在响应式设计中，类型的 `font-size` 应该随视口大小进行调整。你可以使用 `:root` 并根据视口高度和宽度计算类型的 `font-size`。

```css
:root {
  font-size: calc(1vw + 1vh + .5vmin);
}
```

之后，你可以根据 `:root` 计算出来的值使用 `root` 的 `em` 单元。

```css
body {
  font: 1rem/1.6 sans-serif;
}
```

[Demo](https://codepen.io/AllThingsSmitty/pen/XKgOkR)

## 为了更好的移动端体验，为表单元素使用 `font-size`

当点击 `<select>` 下拉框时，为了避免移动浏览器在表单元素上进行的缩放，为表单选择器定义 `font-size` 规则：

```css
input[type="text"],
input[type="number"],
select,
textarea {
  font-size: 16px;
}
```

## 使用指针事件来控制鼠标事件

当点击一个元素时，[Pointer events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) 允许自定义鼠标的行为。举个例子，为了 disabled 掉一个 `button` 的 Pointer events：

```css
.button-disabled {
  opacity: .5;
  pointer-events: none;
}
```

这很简单