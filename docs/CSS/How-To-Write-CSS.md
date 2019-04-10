# 争取把 CSS 写好

这个是以前写在其他地方的一个笔记，现在挪过来，促进内容的更新。

## 防止用户重复点击

问题阐述：有些时候服务器响应比较慢，需要等待一段时间，可能会造成用户重复点击按钮

answer: 用户提交表单后把按钮设为 `disabled`，ajax 成功后，再去掉 `disabled` 属性。另外，由于服务器响应比较慢，可以在请求 http 时加一个动态效果。

## 移动端 h5 无限滚动

Waiting for content...

## button 内文本不换行

只需要一个属性即可：

```sass
white-space: nowrap
```

## 移动端 h5 去除 button 等元素的默认样式

在移动端开发的时候，不同设备的渲染不一致，尤其是有一些 `:active`、`:focus` 等浏览器的默认样式，这个时候，需要进行 `reset`。

```sass
button
  outline: none
  border-style: none
  &:active
    /*重置代码*/
```

## 一长串连续英文字符和数字的换行

在标签内部，中文的换行是没有问题的。但英文的换行就有问题。当出现一长串连续的英文字符时，换行就失效了，这是因为浏览器会将它识别为一个单词。通常的方式是：

```sass
p
  word-wrap: break-word
  word-break: break-all
```

## 对后端可能返回的 null 做 default 处理

后端返回的数据很多情况下会返回 null, 但是在处理过程中经常会用到数组的 `length` 属性和方法，所以要使用之前，一定要针对可能返回的 null 做预处理。

## input 只上传图片

```html
<input type="file" accept="image/*">
```

## animation 最后回到元素的本来位置

```css
animation-fill-mode: both
```

## flex 盒的造成的 height 为 0 的原因剖析

之前做了一个 action sheet 的需求，发生了一个这样的问题：

![flex_height_0](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/flex_01.jpg?raw=true)

设置了头部的 `height` 值，但计算的结果如下：

![flex-1](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/flex_02.jpg?raw=true)

代码如下：

```sass
.action-sheet-container
  display: flex
  flex-direction: column
  width: 100%
  box-sizing: border-box
  height: 200px
  min-height: 180px
  background-color: #F0F2F0
  overflow: hidden
  .action-sheet-header
    display: flex
    justify-content: space-between
    align-items: center
    height: 48px
    padding: 0px 16px
    .action-sheet-title
      font-size: 18px
      color: #303133
  .action-sheet-content
    flex: 1
    margin: 13px 16px
```

可以看到，我们这是一个弹性盒。外部 container(`.action-sheet-container`) 的 `flex-direction: column`，然后给内部子盒(`.action-sheet-header`)定义了一个高度 `height: 48px`，`flex` 是默认的 `0 1 auto`；另一个子盒(`.action-sheet-content`)的 `flex` 是 `1 1 auto`。但是，当第二个子盒的高度太大的时候(在例子中，有 400px, 远大于父盒的 200px)，由于 `flex-shrink: 1` 的存在，第一个盒子的高度就会被压缩掉。

解决的方式有两种：

1. `.action-sheet-header` 设置 `flex: 0 0 auto`
2. 为 `.action-sheet-content` 设置 `overflow: hidden`，根据 *BFC 是页面上一个隔离的容器，容器内的子元素不会影响到外面的元素，反之也成立* 的规则，使得第二个盒子不影响第一个盒子

## 移动端 1 像素问题

1. 伪类加 `transform` 是一种较为好的方法。原理是: 把原来的 `border` 去掉，利用 `:before` 或 `:after` 来重做 `border`。

```sass
.box
  position: relative
  border:none

.box:after
  content: ''
  position: absolute
  bottom: 0
  background: #000
  width: 100%
  height: 1px
  -webkit-transform: scaleY(0.5)
  transform: scaleY(0.5)
  -webkit-transform-origin: 0 0
  transform-origin: 0 0
```

2. 还有一种是简单一点，只用一个 `<div>` 标签来模拟 1 像素如下：

```sass
.line-point-5
  height: 1px
  transform: scaleY(0.5)
  transform-origin: 50% 100%
```

## css 文本溢出

文本溢出的处理主要包含三个属性：`white-space`、`overflow` 和 `text-overflow`。

```sass
.container
  width: 100px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
```

## 多行文本溢出

上面的方式，只能进行单行的文本溢出，多行文本溢出并没有效果，方法有：

1. 添加 webkit 内核的一个私有属性

```sass
overflow : hidden
text-overflow: ellipsis
display: -webkit-box
-webkit-line-clamp: 2
-webkit-box-orient: vertical
```

2. 利用 after 伪元素模拟

```
p {
    position:relative;
    line-height:1.5em;
    /* 高度为需要显示的行数*行高，比如这里我们显示两行，则为3 */
    height:3em;
    overflow:hidden;
}
p:after {
    content:"...";
    position:absolute;
    bottom:0;
    right:0;
    padding: 0 5px;
    background-color: #fff;
}
```

## vue 的 mouseover 事件如何写

```html
<span @mouseover="someMethods"></span>
```

## vue 项目中跳转到外部链接

采用 *锚* 这种标签当然是可以完成这一目的的。不过，也可以使用 `window.location.href` 来解决。

```html
<span @click="routerToLinks(link)">text</span>
```

对应的执行函数：

```JavaScript
routerToLinks (link) {
  window.location.href = link
}
```

## vue 解决更新数组，增加对象属性而视图不更新的问题

是这样的一个场景：

```javascript
data () {
  return {
    arr: [1, 2]
    obj: {
      name: 'xiaoke'
    }
  }
}

// 之后，更新 obj，试图并不会更新，比如
this.arr[0] = 'update'
this.obj.age = 12
```

这是因为 Vue 不能检测以上数组的变动以及对象的添加/删除操作。解决方式如下：

1. 使用 `this.$set`

```javascript
this.$set(this.arr, 0, 'update')
this.$set(this.obj, 'age', 12)
```

2. 使用数组的原生方法

Vue 可以监听到的数组原生方法：`splice()`、`push()`、`shift()`、`pop()`、`unshift()`、`sort()`、`reverse()`。

3. 直接替换数组/对象

开发中遇到个这样的例子 `state.orderLists` 是一个列表，对于其中某一项，后端如果有数据，就返回数据添加到 `state.orderLists` 的某项中，我是这样写的：

```javascript
[globalTypes.SET_UGC_DETAIL] (state, { orderId, previousUGC }) {
  var targetIndex = findIndex(state.orderLists, order => orderId === order.id)
  if (targetIndex !== -1) {
    var target = state.orderLists[targetIndex]
    var assignedTarget = assign({}, target, { previousUGC })
    Vue.set(state.orderLists, targetIndex, assignedTarget)
  }
}
```

## vue 访问原生 event 对象

```html
<button @click="say(arg, $event)">Submit</button>
```

## textarea 禁止拉伸

增加 `resize: none` 属性。

## textarea 监听内容是否变动

可以采用 `keyup` 事件，但是如果是*复制/粘贴* 则无法监听。所以采用 `change` 事件。需要注意的是，`change` 事件是在内容改变且失去焦点时才出发。

## vue 里 v-model 中 click 或 change 事件不同浏览器的触发的时间问题

是这样的一个例子：

```html
<div @click="triggerAutoReply(template)">
  <em-checkbox
  v-model="chosenReply"
  :label="template.id"></em-checkbox>
</div>
```

> 解释一下，因为当初用的时候 `<em-checkbox></em-checkbox>` 暂不支持 click 和 change 事件。所以这样暂时包裹了一下。
>
在 `Chrome` 中，`click` 事件先发生，`chosenReply` 后发生。而在 `Sarifi` 中，正好相反。

最后在 `triggerAutoReply()` 函数中添加了一个 `setTimeout` 统一了这个问题。

```javascript
const context = this
setTimeout(() => {
  // some code
}, 0)
```

但是我觉得这个会有更好的解决方案。第一在设计组件的时候，就需要提供 `change` 事件的 api，并事先规避这个问题。

## white-space、word-wrap和word-break

`white-space` 用来处理文本中 *空白*，包括如何处理**多个空白符**、**换行符** 和 **是否允许过长折行**。常用的属性值：

+ normal：连续的空白符和换行符合并为一个(换行符当做空白符处理)，过长折行
+ nowrap：连续的空白符和换行符合并为一个(换行符当做空白符处理)，过长不折行

`word-wrap` 处理文本到达一行的末尾时，是否进行分割。注意： css3 已经改名为 `overflow-wrap` 了。

+ normal：不进行分割
+ break-word：达行的末端，进行分割

`word-break` 当文本到达一行的末尾时，如何进行分割。

+ normal：不进行分割
+ break-all：到达行的末端，进行分割

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/white_space.jpg?raw=true)

其实看的比较明显，`overflow-wrap` 如果有可换行的的分割点，就会按照分割点进行分割。而 `word-break` 会尽量挤占空间，直到没有任何空余的空间。

## item 自动折到下一行

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/auto_wrap.jpg?raw=true)

大概就是这样的一个需求，可能会有多个，为了提高可复用性，希望能采用一种较为合理的方式。

常规方式：

```html
<div class="item-container">
  <div class="item">
    <!--something else to show-->
  </div>
</div>
<style lang="sass">
.item-container
  text-align: left
  font-size: 0px
.item
  display: inline-block
  width: calc(50% - 30px)
  font-size: 14px
  margin-right: 60px
  &:nth-child(2n)
    margin-right: 0
</style>
```

另一种就是使用 flex 盒子，`flex-wrap` 的值为 `wrap`。

```css
.item-container
  display: flex
  flex-wrap: wrap
  justify-content: space-between
.item
  width: calc(50% - 30px)
  &:nth-child(even)
      margin-left: 20px
```

## 使用 localstorage 返回的是字符串

所以，对于 `true` 和 `false` 等值，可以使用 `JSON.parse()` 处理一下。

## window.parent 判断是不是子 iframe

如果 window.parent === window，表明该 window 即为顶层 window

## npm i 报错

错误信息是：

> Module build failed: Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (64)
>

原因是 `Node Sass` 不支持高版本的 `Node`，切换到 `8.12.0` 的稳定版本

## 一个对面向对象编程认识不深刻的写法错误

新系统上线，线上报大量异常。最后定位到一个写法问题：

```ts
// base.ts
import axios from 'axios'
import env from '@/common/config'
import { urlSplice } from '@/common/utils/assist'
import { IQueryParams } from '@/common/service/types'

export default class {
  private ksid: string = window.localStorage.getItem('ksid') || ''

  private shopId: string = window.localStorage.getItem('shopId') || ''

  protected get (base: string, queryParams?: IQueryParams) {
    let url = base.concat(urlSplice({
      ...queryParams,
      ksid: this.ksid,
      shopId: this.shopId
    }))
    return axios
      .get(baseUrl.concat(url))
      .then(res => res.data)
  }
  protected post (base: string, params: IQueryParams) {
    return axios
      .post(baseUrl.concat(base), { ...params, ksid: this.ksid, shopId: this.shopId })
      .then(res => res.data)
  }
}
```

然后有一个类继承了这个类。

```ts
// campaign-service.ts
import Base from '@/common/service/base'

class CampaignService extends Base {
  queryApplyingCampaigns () {
    return super.get('/napos-applying-campaigns')
  }
}
```

问题在于在编译时，此时还未获取到 ksid 和 shopId， 因此值都为空字符串。

改成：

```ts
export default class {
  get ksid () {
    return window.localStorage.getItem('ksid') || ''
  }
  get shopId () {
    return window.localStorage.getItem('shopId') || ''
  }
  ...
}
```

现在我想的问题是，ksid 和 shopId 应该包装进基类吗？如何设计一个类？依赖注入适合在这个地方吗？