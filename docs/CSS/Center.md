# CSS居中的完整教程[翻译]

> 文章翻译自Chris Coyier的[Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)。

居中在CSS当中是颇让人抱怨的。**为何如此艰难？**。我认为问题不是因为太难，而是有太多不同的方法，在不同的场景中，很难知道如何去选择。

所以，让我们实现一个决定树(decision tree)，希望能简化这个问题。

我想居中....

## 水平居中 - Horizontally

### 是inline元素或者inline-*元素吗 （就像text 或 links

在一个块级父元素中，你可以这样水平居中一个行内元素。

```css
.center-children {
    text-align: center;
}
```

这种方法适用于`inline`、`inline-block`、`inline-table`、`inline-flex`等等。

### 是一个block元素吗

你可以通过将`margin-left`和`margin-right`设置为`auto`将一个块级元素水平居中(当然它还必须设置`width`或者`max-width`属性，否则就会全宽，也就不需要居中了)。

```css
.center-me {
    max-width: 100px;
    margin: 0 auto;
}
```

无论这个你要居中的块级元素多宽，这种方法都能工作。值得注意的是，`float`不能浮动一个元素到居中位置(就是说你没办法将一个元素通过`float`属性居中)。

### 是多个块级元素吗

如果你在**一行内**(in a row)有两个或多个块级元素需要水平居中，更好的方法是让它们有不同的`display`类型。你可以使用`inline-block`或者`flex`来实现。

```css
.inline-block-parent-center {
    text-align: center;
}
.inline-block-children-center {
    display: inline-block;
}
```

> 译者注，先对子块级元素设置`display: inline-block`，如何对父元素设置`text-align: center`。

```css
.flex-center {
    display: flex;
    justify-content: center;
}
```

> 译者注，使用弹性盒，在父元素上添加`justify-content`对子项进行对齐。

如果你的意思是想让多个块级元素堆叠，这种情况下，使用`auto margin`是可行的。

---

## 垂直居中 - Vertically

在CSS中进行垂直居中有点棘手。

### 是inline元素或者inline-*元素吗

#### 是单行吗

一般情况下，`inline/text` 元素在垂直方向上表现出来的就已经是垂直的了。这是因为在它们的上边和下边都有相等的内边距。所以可以用`padding`来控制垂直居中。

```css
.link {
    padding-top: 30px;
    padding-bottom: 30px;
}
```

有些情况下，`padding`不可用，而且你试图垂直居中一些不会换行(not wrap)的文字。有一个小技巧就是使用`line-height`等于`height`的值。

```css
.center-text-trick {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}
```

>译者注，比如文字被包裹在`<div>`标签中。

#### 是多行吗

`padding`也可以用来垂直居中多行文本，但是如果不管用，你可以将文本元素设置成`table-cell`，然后使用`vertical-align`属性处理它。

```css
.center-table {
  display: table;
  height: 250px;
  background: white;
  width: 240px;
  margin: 20px;
}
.center-table p {
  display: table-cell;
  margin: 0;
  background: black;
  color: white;
  padding: 20px;
  border: 10px solid white;
  vertical-align: middle;
}
```

如果上面不行，可能你需要使用弹性盒。单个子元素在一个弹性父元素中很简单就可以居中。

```css
.flex-center-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
}
```

值得注意的是，如果父容器有固定高度(px, %等)，则它是真正相关的(？？？)，这也是为什么我们的父容器有一个`height`。

如果以上两者都无效，则可以使用**伪元素**。

```css
.ghost-center {
  position: relative;
}
.ghost-center::before {
  content: " ";
  display: inline-block;
  height: 100%;
  width: 1%;
  vertical-align: middle;
}
.ghost-center p {
  display: inline-block;
  vertical-align: middle;
}
```

### 是一个块级元素吗

#### 你知道这个元素的高度吗

在页面布局中不知道高度是非常正常的，因为: 宽度改变，文字reflow会改变高度；文字样式的改变会改变高度；文字数目的变化也会改变高度；元素有一固定的长宽比，比如图片，尺寸变化时也会改变高度。

但是，如果你知道高度，你可以这样进行垂直居中:

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
}
```

#### 你并不知道这个元素的高度

你还是可以通过将这个元素下调一半，然后上调它高度的一半来居中它。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

#### 还是使用弹性盒吧

没什么大的惊喜，用弹性盒会格外简单。

```css
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

---

## 同时水平/垂直居中

### 知道元素的宽度和高度

在你将这个元素定位到高度/宽度的50%之后，再使用绝对值等于宽度/高度一半的负外边距进行居中。

```css
.parent {
  position: relative;
}

.child {
  width: 300px;
  height: 100px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}
```

### 不知道元素的宽度和高度

如果你不知道宽度和高度，你可以使用`transform`属性来居中一个元素。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 弹性盒

>译者注： 对父容器使用`justify-content`和`align-items`

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 结论

> 译者: 不要考虑浏览器兼容了，直接使用flexbox吧。