# vuex 和 v-model

在项目中引入 vuex 是一件极其痛苦的事(...你一定会这么觉得的)。当然，这里我并不是去评价类 [Flux](https://facebook.github.io/flux/) 架构的优劣。

而是，当项目中引入 vuex 之后，如何去处理 v-model 依赖 state 的问题。

场景如下：

```html
<input
  v-model="obj.message"
  />
```

`obj` 对象 是属于 Vuex Store 内的一个 state。

但是，我们不能这样，这样这样做是不纯的，是非常危险的！！！(这会让 Store 非常地不可测)

1. 方案一：将 v-model 拆解成它本来的模样

即，

```html
<input
  :value="localMessage"
  @input="updateMessage"
  />
<script>
...
computed () {
  ...mapState({
    localMessage: state => state.obj.message
  })
}

updateMessage (e) {
  this.$store.commit('UPDATE_MESSAGE', e.target.value)
}

</script>
```

2. 方案二：利用 computed 属性的 getter/setter

```html
<input
  v-model="message"
  />
<script>
...
computed: {
  message: {
    get () {
      this.$store.state.obj.message
    }
    set (val) {
      this.$store.commit('updateMessage', val)
    }
  }
}
</script>
```

官方文档似乎也是这样。

+ [Form Handling](https://vuex.vuejs.org/guide/forms.html)