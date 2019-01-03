# 和 URL 相关的 Location 和 History

对路由这一块，相对来说接触的比较少。正好碰到了一个页面跳转的问题，就顺便把自己想了解的笼络了一下。

## URL

URL 是 URI 的一个子集，具体区别参考[What is the difference between a URI, a URL and a URN?](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn)。

这里了解一下 URI 的一般语法：

```text
URI = scheme:[//authority]path[?query][#fragment]

其中：

authority = [userinfo@]host[:port]
```

框图如下：

![](https://upload.wikimedia.org/wikipedia/commons/9/96/URI_syntax_diagram.png)

其中，`path`、`query` 和 `fragment` 值得我们思考。其中 `fragment` 前面有个 `#`(hash)。

## Location Interface

[Location](https://developer.mozilla.org/en-US/docs/Web/API/Location#Specifications) 是，就能获取到 URI 上的所有信息。

比如：`https://developer.mozilla.org/en-US/docs/Web/API/Location#Specifications`，在控制台打印的结果：

![](http://p3puylt4n.bkt.clouddn.com/location.jpg)

## History Interface

阅读前，请翻阅官方文档：[History Interface](https://www.w3.org/TR/html50/browsers.html#the-history-interface)

History 是用来处理操纵用户浏览记录的 API。这个 API 因为也常用于页面的跳转，所以和 url 还是有一定联系的。

![](http://p3puylt4n.bkt.clouddn.com/history.jpg)

对于浏览器的实现上，应该是是一个 **栈**(Stack) 的结构。

对于这个 API，需要着重强调的是 `pushState()` 和 `replaceState()` 这两个方法。然而，这两个方法又和 `popstate` 事件息息相关。

### popstate 事件

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate) 上提供的 popstate 事件触发条件：

> A popstate event is dispatched to the window each time **the active history entry changes** between two history entries for **the same document**.

即，在同一文档的内的两个历史记录中，激活的记录改变了，该事件就会被触发。

::: tip
很多文章中说，点击浏览器的 *前进* 和 *后退* 按钮，就会触发 `popstate` 事件，实际上不严谨的。如果不是在同一个 document 内进行的跳转，是不会触发这个事件的。
比如，我们用下面的代码监听 popstate 事件：

```js
window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state))
}
```

当我们在浏览器的地址栏输入一个另一个页面的 url(这两个页面不同属于一个 document)，然后使用 *后退* 按钮，并不能触发该事件。
:::

### state

当监听了 `popstate` 事件触发后，可以获取到当前激活历史记录的 `state`(即 `event.state`)。这个状态实际上是传入 `history.pushState()` 或 `history.replaceState()` 的第一个参数的一份拷贝。此外，都为 `null`。

`state` 可以是任何可序列化的对象。设计的目的，实际上就是状态标记，标记当前激活的历史记录的状态。尤其是当我们调用 `history.pushState()` 或 `history.replaceState()` 时，并不会触发 `popstate` 事件。

至于为什么会提供这样的得一个 state，官方的解释[在这里](https://www.w3.org/TR/html50/browsers.html#state-object)

> State objects are intended to be used for two main purposes: first, storing a preparsed description of the state in the URL so that in the simple case an author doesn't have to do the parsing (though one would still need the parsing for handling URLs passed around by users, so it's only a minor optimization), and second, so that the author can store state that one wouldn't store in the URL because it only applies to the current Document instance and it would have to be reconstructed if a new Document were opened.

简而言之，就是能够不必解析 url 就能直接获取当前记录的一个状态。

## history.pushState()/history.replaceState()

这两个 API 分别用来增加或修改当前记录的。`pushState()` 类似于在栈顶的位置增加一条记录，而 `replaceState()` 是修改当前激活的记录。两者并不会直接触发 `popstate` 事件，也不会导致页面重载。

两个 API 都接收三个参数：

+ `state` - 即上面提到的 state
+ `title` - 暂时没有定义用户
+ `url` - 可选参数。这个参数值得注意的有这么几点：
  1. 可以是相对路径，或者绝对路径。但必须和当前的 url **满足同源策略**。
  2. 参数是可选的，如果没有，就和当前的 url 一致， 但是仍然 **会往栈顶添加或修改一条记录**。

举个例子：

```js
// 当前页面的地址为: http://xiaokedada.com。history.length 为 1。
history.pushState({ name: 'xiaoke' }, 'xiaokedada')
history.length // 2
history.state // { name: 'xiaoke' }
```

`history.pushState()` 和 `history.replaceState()` 的一个典型应用场景是 [**无刷新改变页面内容**](https://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)。

## hash 和 history 实现前端路由

在前端的 SPA 应用中，前端路由系统通过改变 url，可以在不重新请求页面的情况下更新页面视图。

方式一，是通过 `location.hash`。

### location.hash

首先，通过 hash，也可以在 history stack 中创建一个记录。

```js
window.location.hash = "#foo"

// or

window.location = "#bar"
```

值得注意的是：

1. hash 部分不会包含在 http 请求中，只是页面中的一个 *锚点*。
2. 只有当设置的 hash 值和当前的 hash 值不同，才会创建一个新的历史记录。而 `history.pushState()` 和 `history.replaceState()`，在不提供额外的 url 参数时，仍会添加或修改一条记录。
3. hash 的改变也会触发 `popstate` 事件。

所以，在通过 hash 的方式来实现前端路由的时候。可以通过 `location.hash` 配合 `hashchange`/`popstate` 事件来实现。

### history

history 是另一种实现前端路由的方式，主要是通过 `history.pushState()` 和 `history.replaceState()` 配合 `popstate` 事件来实现的。

同时也有以下特点：

1. 即便和原地址相比，只是多了 fragment identifier (即 hash 部分) 的内容，也不会触发 `hashchange` 事件。
2. 通过使用 `state`，能提供更多的任意信息。而 hash 方式必须全部包含在字符串中。
3. 当用户刷新页面时，新的 url 会作为请求发送给后端，因此需要响应的后端配置。

> [Vue-Router - HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)

[Vue-Router](https://router.vuejs.org/) 对上述的两种方法都做了实现。具体可参考[官方源代码](https://github.com/vuejs/vue-router)，或者以下源代码分析的文章。

+ [从vue-router看前端路由的两种实现](https://zhuanlan.zhihu.com/p/27588422)
+ [vue-router 源码分析-history](https://zhuanlan.zhihu.com/p/24574970)
+ [vue-router源码分析-整体流程](https://zhuanlan.zhihu.com/p/24104410)

## 参考

文中很多内容来自 MDN 相关的解释。其中有一个例子非常好：

```js
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
}
history.pushState({page: 1}, "title 1", "?page=1")
history.pushState({page: 2}, "title 2", "?page=2")
history.replaceState({page: 3}, "title 3", "?page=3")
history.back()
history.back()
history.go(2)
```

部分内容来自 [Manipulating the browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API)