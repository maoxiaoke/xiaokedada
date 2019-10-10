# 开发中遇到的 vue 的使用记录一下

## vue 的 mouseover 事件如何写

```html
<span @mouseover="someMethods"></span>
```

## vue 项目中跳转到外部链接

采用 *锚* 这种标签当然是可以完成这一目的的。不过，也可以使用 `window.href` 来解决。

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

这是一种内联的写法，参考[v-on](https://cn.vuejs.org/v2/api/#v-on)

## Vue 自定义事件传递额外参数

```html
<!-- child.vue -->
<script>
  ...
  this.$emit('uploaded', arg1, arg2)
  ...
</script>

<!-- parent.vue -->
<child @uploaded="handleUpload(arguments,argFromParent)"></child>
<script>
  ...
  handleUpload (arg, argFromParent) {
    ...
  }
  ...
</script>
```

这里利用了原生的 `arguments`。更好的方式可能是下面的：

```html
<!-- parent.vue -->
<child @uploaded="value => handleUpload(value, argFromParent)"></child>
<script>
  ...
  handleUpload (val, argFromParent) {
    ...
  }
  ...
</script>
```

参考[自定义事件传参问题](https://github.com/vuejs/vue/issues/5735)

## vue 处理资源加载失败

通过 webpack 的 code spliting，vue router 可以做到按需加载资源。

```js
// router.js
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import('./mobile/mobile-app.vue')
    },
    {
      path: '/pc',
      name: 'pc',
      component: () => import('./pc/pc-app.vue')
    }
  ]
})
export default router
```

但是由于是按需加载，所以会经常导致资源加载失败。如下图：

![Loading Failed](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/loading-chunk-fail.jpg?raw=true)

[Google](https://github.com/nuxt/nuxt.js/issues/742) 了一下，感觉问题还挺常见的。一个可能的原因在[这里](https://blog.francium.tech/vue-lazy-routes-loading-chunk-failed-9ee407bbd58):

> 发生的原因在于可能当我们发布一个新版本的时候，页面没有刷新，当通过 lazy load 加载其他资源的时候，就会找不到资源。
>

接下来，我们借用 [router.onError](https://router.vuejs.org/api/#router-onerror) 来做一个容错策略，它可以捕获当渲染一个异步组件时的错误：

```js
router.onError(e => {
  const pattern = /Loading(.)*failed/g
  const mayChunkLoadedFailed = pattern.test(e.message)
  console.log('aaa', router)
  if (mayChunkLoadedFailed) {
    console.error('资源加载失败，请尝试刷新页面')
    // or window.location.reload()
  }
})
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