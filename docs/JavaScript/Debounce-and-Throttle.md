# 函数防抖和节流

这篇文章主要是 [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/) 的部分翻译和总结。而并非是完全的独立成果，特此声明。

Debounce and throttle are two similar (but different!) techniques to control how many times we allow a function to be executed over time.

## Debounce - 防抖

Debounce 是将多个连续调用的组合成一个。

![](https://res.cloudinary.com/css-tricks/image/fetch/q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2016/04/debounce.png)

我们可以形象地使用 **电梯模型** 来模拟这种行为：为了节省电梯资源，当电梯门快关闭时，有人进入，电梯并不会关闭电梯门(而是再次打开)；再来一个人，亦是如此。也就是说，电梯会推迟上下运行(执行函数)，直到没有人加入(没有函数的事件发生)。

这种场景的一种简单例子是：`window` 的 `resize` 事件。当我们调整浏览器窗口时，会不断触发 `resize` 事件。而很多情况下，我们只需要最后一次的 `resize` 事件触发*执行函数*。

比较简单的一种实现如下：我们在 `delay` 时间内再次触发事件，就会 clear 掉上次的执行函数。

```js
const debounce = (func, delay) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), delay)
  }
}
// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
```

上面的这种，我们称为 **Tailing Edge**。也就是说，当事件不在频繁发生后，执行函数才开始执行。

还有一种情况是，我们需要在事件频繁前，执行函数执行一次。这种就称为 **Leading Edge**。

![](https://res.cloudinary.com/css-tricks/image/fetch/q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2016/04/debounce-leading.png)

实现代码如下：

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		const context = this
    const args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
// https://davidwalsh.name/javascript-debounce-function
// https://gist.github.com/nmsdvid/8807205
```

## Throttle - 节流

Throttle 的概念和 Debounce 并不完全一致。Throttle 的含义是：**x milliseconds 内执行函数有且只执行一次**。

Throttle 的一个应用场景是 *无限滚动*。比如，无限的瀑布流。当用户滚动页面时，需要去 check 用户离浏览器底部的距离。如果用户接近浏览器底部，我们就需要向后端请求数据。

如果我们使用 Debounce 来处理，就会导致页面在用户停止滚动之前都没有数据展示。因此，我们需要执行函数每个一段时间去 check 用户是否到达浏览器底部。

我们看一下以下的实现：

```js
function throttle(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null
  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }
  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
//https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
```

## Lodash 的实现