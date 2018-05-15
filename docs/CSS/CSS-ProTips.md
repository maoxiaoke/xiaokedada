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

> 译者注: 该文章已被译者翻译，[CSS 居中的完整教程](./CSS居中的完整教程[翻译].md)
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