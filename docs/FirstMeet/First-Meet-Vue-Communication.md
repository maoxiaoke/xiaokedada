# 解锁 vue2.0 通信的各种姿势

## $refs 、 $parent 和 $children

最开始，`ref` 是什么？这是 Vue 实现的一个*特殊属性*，用来给一个元素(就是 HTML 定义的元素)或**子组件**注册的一个*引用*。这个属性被添加在**父组件**的 `$refs` 对象中。如果用在一个普通的 DOM 元素，`ref` 指的就是这个这个元素；如果用在一个子组件上，`ref` 指的是这个组件的一个 instance。

> [官方解释](https://vuejs.org/v2/api/#ref)
>
从上面的描述中，我们可以得到一些信息：

- `ref` 可以单纯地对一个 DOM 元素或一个组件进行标识。
- `ref` 不是 DOM 的属性，是 Vue 实现的，也不是一个指令
- `ref` 的目的是单纯地让方便快捷地处理 DOM 元素或子组件
- `$refs` 就是父组件上用来保存这些 `ref` 的一个对象集合

举个例子：

父组件 - `Parent.vue`，使用 `ref` 标识了一个 `h1` 标签和一个子组件 `child`。但父组件还有另一个子组件 `another-child` 未被 `ref` 标识。

```html
<template>
  <div class="hello">
    <h1 ref="maybeATitle">{{ parentMsg }}</h1>
    <button @click="clickParent">I am a FATHER</button>
    <child ref="myChild"></child>
    <another-child></another-child>
  </div>
</template>

<script>
import Child from './Child'
import AnotherChild from './AnotherChild'
export default {
  components: {
    Child,
    AnotherChild
  },
  name: 'HelloWorld',
  data () {
    return {
      parentMsg: 'I am a Father'
    }
  },
  methods: {
    clickParent () {
      console.log('this.$refs', this.$refs)
      console.log('this.$refs.myChild', this.$refs.myChild.childMsg)
      console.log('this.$children', this.$children)
    }
  }
}
</script>
```

我们将 `this.$refs` 打印出来。结果如下：

![this.$refs](http://p3puylt4n.bkt.clouddn.com/$refs.jpg)

结果对第一条做出了解释：
(1) `ref` 是元素或子组件标识，且被添加到父组件的 `this.$refs` 对象中。
(2) 如果用在一个普通的 DOM 元素，`ref` 指的就是这个这个元素；如果用在一个子组件上，`ref` 指的是这个组件的一个 instance。
(3) **如果想访问子组件 `child` 就可以通过 `this.$refs.myChild` 访问了**。

我们先看一下子组件 `Child.vue` 的内容，只包含一个 `button` 元素，有一个 click 事件，还有一个 data 属性 `childMeg`。

```html
<template>
  <button @click="clickSon">I am a SON</button>
</template>
<script>
export default {
  data () {
    return {
      childMsg: 'I am a Child'
    }
  },
  methods: {
    clickSon () {
      console.log('this.$parent.parentMsg', this.$parent.parentMsg)
    }
  }
}
</script>
```

那么，刚才说可以通过 `this.$refs.myChild` 访问到子组件 `child`，这是真的吗？我们展开看一下 `this.$refs.myChild` 的内容。

![this.$refs.myChild](http://p3puylt4n.bkt.clouddn.com/$refs.myChild.jpg)

那 `$children` 是什么？我么在父组件中将 `this.$children` 打印出来。

![](http://p3puylt4n.bkt.clouddn.com/$refs.childrens.jpg)

很明白地看得出来 `$children` 是当前父组件实例的直接子组件实例的组合(没有确定的顺序关系，也不是响应式的)。

那么，`this.parent` 就是当前子组件的实例的直接父组件实例的引用。**Father 有多个 Sons，而 Son 只有一个 Father**。

所以，通过 `ref` 、`$refs` 和 `$parent` 或者 `$children` 和 `$parent` 就可以构建父子组件间的通信。

比如上面的父组件 `Parent.vue`，通过 `ref` 对子组件构成唯一标识，使用 `$refs.myChild` 对子组件进行数据访问。子组件使用 `$refs.parent` 对父组件进行数据访问。

HTML 代码：

```html
<!--Parent.vue-->
<child ref="myChild"></child>
```

JavaScirpt 代码：

```javascript
// Parent.vue
clickParent () {
  console.log('this.$refs.myChild', this.$refs.myChild.childMsg)
}
// Child.vue
clickSon () {
  console.log('this.$parents.parentMsg', this.$parent.parentMsg)
}
```

![](http://p3puylt4n.bkt.clouddn.com/ref-refs-parent.jpg)

需要注意的是，`$refs` 和 `ref` 是在初始 `render` 之后才存在的，并且也不是响应式的。最好不要在模板或者计算属性中使用它，也不能用于数据绑定。

> [Github demo 地址](https://github.com/maoxiaoke/vue-communication/tree/master/reftest)

---

## props、$emit 和 .sync

`props` 是*父组件向子组件*传递数据的一种方式，这是一种单向的数据传播方式。使用起来也非常简单：

```html
<!--Ancestor.vue-->
<template>
  <div class="hello">
    <h1>I am a father of child, and an ancestor of grandson</h1>
    <child :ancestor-message="grandsonMessage" v-on:descendant="getMeg"></child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  data () {
    return {
      grandsonMessage: 'Message from an acenstor'
    }
  },
  methods: {
    getMeg (msg) {
      console.log(msg)
    }
  },
}
</script>

<style scoped>
  .hello {
    border: 1px solid black;
    height: 400px;
    background: whitesmoke
  }
</style>
```

父组件 `<Ancestor />` 向下传递数据 `ancestorMessage`（[为啥不写成 `ancestor-message`](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case)）。并使用 `v-on` 监听了子组件自定义的 `descendant` 事件。

下面是子组件的代码：

```html
<!-- Child.vue -->
<template>
  <div class="child">
    <h2> {{ ancestorMessage }} </h2>
  </div>
</template>
<script>
export default {
  props: {
    ancestorMessage: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$emit('descendant', 'hello Wall·E')
  }
}
</script>
<style scoped>
  .child {
    border: 2px dotted red;
    height: 250px;
    margin: 0 20px;
    background: rgb(214, 206, 206);
  }
</style>
```

这都很简单。需要强调的是，**不要试图在子组件修改 props**，所以试图修改 props 时，可以[使用 data 或 computd 属性拷贝一份 props ](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow)。

::: tip
总结一下：父组件通过 props 向子组件传值，子组件可通过 `$emit` 一个自定义事件向父组件传值。
另外，通过 [`$emit` 传递消息](https://vuejs.org/v2/guide/components.html#Sending-Messages-to-Parents-with-Events) 还有其他的写法，比如：

```html
<!--Ancestor.vue-->
<child :ancestor-message="grandsonMessage" v-on:descendant="grandsonMessage += $event"></child>

<!-- Child.vue -->
<button :click="$emit('descendant', ' Hello Wall·E')">
```
:::

但是，很多情况我们会有 *双向绑定 props* 的需求。这种情况下，我们可以使用 [`.sync` Modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)。

比如有个例子，父组件传递一个 `isFold` 判断子组件的内容是否展开，同时子组件也会试图修改 `props` 的值，来决定自身是否被展开。

```html
<!-- SubMenu.vue -->
<nav-sub-menu :is-fold.sync="defaultOpen">
  <item-menu></item-menu>
</nav-sub-menu>

<script>
  export default {
    data () {
      return {
        defaultOpen: true
      }
    }
  }
</script>
```

`:is-fold.sync="defaultOpen"` 是一种简写方式，等同于：

```html
<nav-sub-menu
  v-bind:is-fold="defaultOpen"
  v-on:update:is-fold="defaultOpen = $event"
>
```

子组件的代码：

```html
<!-- ItemMenu.vue -->
<div
  @click="toggleSubMenu">
</div>
<script>
export default {
  props: {
    isFold: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleSubMenu () {
      this.$emit('update:isFold', !this.isFold)
    }
  }
}
</script>
```

[Github demo 地址](https://github.com/maoxiaoke/vue-communication/tree/master/propstest)

---

## $attrs 和 $listeners

在高阶组件中，多层级组件通信可以是通过 `props` 和 `$emit` 进行，从而达到跨层级组件通信。

> 当然，多层级组件通信还可以通过 `Vuex` 或全局 `Event Bus` 的方式。
>
但是，以 `props` 和 `$emit` 这种方式进行通信有一个很大的缺点，以下图为例：

![](http://p3puylt4n.bkt.clouddn.com/$attrs.jpg)

`A` 是祖先组件，如果需要将信息传递到子孙组件 `D`，组件 `B` 和 `C` 需要作为中转站处理 `props`，这样会导致组件维护难度加大，`props` 传递也非常不明朗。

`$attrs` 和 `$listeners` 就是为了解决这一问题。两者并不是一类新的组件通信方式，而是 `props` 和 `$emit` 通信方式的一种补充。

> 注意： `$attrs` 是在 `Vue 2.4` 才引入的。
>
祖先组件 A：`Ancestor.vue`:

```html
<!--Ancestor.vue-->
<template>
  <div class="hello">
    <h1>A: I am a father of child, and an ancestor of grandson</h1>
    <child :message="grandsonMessage" v-on:descendant="getMeg"></child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  data () {
    return {
      grandsonMessage: 'Message from an acenstor'
    }
  },
  methods: {
    getMeg () {
      console.log('message from descendant--')
    }
  },
  mounted () {
    console.log('acenstor $attrs----', this.$attrs)
  }
}
</script>
```

在组件 `Ancestor.vue`(A) 试图将一个 `message` 的 `props` 传递给 子孙组件 `GrandgrandSon.vue`(D)。而 A 的其他子孙组件 `Child.vue`(B) 和 `GrandSon.vue`(C) 并不需要这个 `props`。同时，A 还监听了 D 传递的 `descentdant` 事件。

如何，我们先来看一下 子孙组件 D：`GrandgrandSon.vue` 的代码：

```html
<!--GrandgrandSon.vue-->
<template>
  <div class="grandgrandson">
    D: This is a <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  props: ['message'],
  mounted () {
    this.$emit('descendant')
    console.log('sending a msg to ancestor')
    console.log('grandgrandson $attrs----', this.$attrs)
  }
}
</script>
```

祖先组件 A 和子孙组件 D 通信的方式就像普通的父子组件通信的方式一样。

之后，组件 B 和 C 通过 `$attrs` 和 `$listeners` 搭建“数据中转站”。如下：

```html
<!--Child.vue-->
<template>
  <div class="child">
    <h2>B: I am a child of A</h2>
    <grand-son v-bind="$attrs" v-on="$listeners"></grand-son>
  </div>
</template>
<script>
import GrandSon from './GrandSon'
export default {
  components: {
    GrandSon
  },
  inheritAttrs: false,
  mounted () {
    console.log('child $attr----', this.$attrs)
    console.log('child $listener----', this.$listeners)
  }
}
</script>
<!--GrandSon.vue-->
<template>
  <div class="grandson">
    <h3>C: I am a child of B, and a father of D</h3>
    <grandgrand-son v-bind="$attrs" v-on="$listeners"></grandgrand-son>
  </div>
</template>
<script>
import GrandgrandSon from './GrandgrandSon'
export default {
  components: {
    GrandgrandSon
  },
  data () {
    return {}
  },
  inheritAttrs: false,  
  mounted () {
    console.log('grandson $attrs----', this.$attrs)
    console.log('grandson $listens---', this.$listeners)
  }
}
</script>
```

可以看到这两行的代码：

```html
<grand-son v-bind="$attrs" v-on="$listeners"></grand-son>
<grandgrand-son v-bind="$attrs" v-on="$listeners"></grandgrand-son>
```

架起了沟通的桥梁！

有一个地方需要说明一下，我们使用了 `inheritAttrs: false`。这个属性的介绍在[这里](https://vuejs.org/v2/api/#inheritAttrs)。该属性的默认值是 `true`，当父组件的传递过来的 `props` 未被子组件视为 `props` 时，就会作为子组件根元素普通的 HTML 属性存在。

比如，该属性为 `true` 渲染的结果。

![](http://p3puylt4n.bkt.clouddn.com/inher01.jpg)

为 `false` 时：

![](http://p3puylt4n.bkt.clouddn.com/inher02.jpg)

最后，看一下项目打印出来的信息。

![](http://p3puylt4n.bkt.clouddn.com/console.jpg)

> [Github demo 地址](https://github.com/maoxiaoke/vue-communication/tree/master/attrText)

---

## v-model

[v-model](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) 是 Vue 实现的一种双向绑定。

比如：

```html
<input v-model="text" />

<!-- 等价于 -->
<input
  :value="text"
  @input="text = $event.target.value">
```

相对而言是一种比较简单的操作，绑定 `<input>` 的 `name` 属性，监听 `input` 事件。

如果我们想要对自定义的组件使用 `v-model` 指令。当用在自定义组件中，比如：

```html
<my-input v-model="text" />
<!-- 等价于 -->
<my-input
  :value="text"
  @input="text = $event" />
```

举个例子：自定义一个 `MyInput` 组件。

```html
<!-- Input.vue -->
<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: 'MyInput',
  props: ['value']
}
</script>
```

然后使用 `Vue.component` 封装一下：

```js
// index.js
import Input from './Input.vue'
import Vue from 'vue'

export default Vue.component(Input.name, Input)
```

可以看到，我们需要做两件事:

+ 将 `<input>` 的 `value` 属性绑定到 `props` 的 `value` 中来
+ `$emit` 自定义的 event 事件

[Github Demo](https://github.com/maoxiaoke/vue-communication/tree/master/modeltest)

