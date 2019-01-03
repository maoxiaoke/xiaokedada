# JavaScript 对象的 Property descriptors

JavaScript 有两类对象属性，一类是数据属性(data properties)，对应于 data descriptors；另一类是访问器属性(accessor properties)，对应于 accessor descriptor。

**对象的属性描述符只能是两者之一，不能同时存在**。

data descriptors 和 accessor descriptors 都是对象。共享的属性有：

- configurable
- enumerable

data descriptors 有额外的两个属性：

- value
- writable

accessor descriptors 有额外的两个属性：

- get - 即，作为 getter
- set - 即，作为 setter

## data descriptors

这种就是我们最常见的对象的属性描述方式，比如：

```js
let obj = { a: 1 }

Object.getOwnPropertyDescriptor(obj,'a')
/* 
{ 
  value: 1, 
  writable: true, 
  enumerable: true, 
  configurable: true } */
```

当然，你也可以采用这样的方式：

```js
let obj = { }

Object.defineProperty (obj, 'a', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true
})
obj.a // 1
```

## accessor descriptors

如何定义访问器描述方式定义对象的属性呢，我们可以这样：

```js
let obj = {
	get a() {
		return 2;
	}
}
obj.a //2
Object.getOwnPropertyDescriptor(obj, 'a') 
/*
{ 
  get: [Function: get a], 
  set: undefined, 
  enumerable: true, 
  configurable: true 
}
```

或者这样：

```js
let obj = { }

Object.defineProperty (obj, 'a', {
  get: function () {
    return 2
  }
})
obj.a // 2
```

到这里，大家肯定有一个疑问，也就是我们只有 getter 方法，却没有 setter 方法，这是为什么呢？

这是因为我们返回的值 `2` 是一个硬编码的数据，所以我们的 setter 操作实际上没有任何意义(就算它是有效的)。

```js
obj.a = 3
obj.a // 2，因为并没有 setter， 所以赋值操作不成功(也不会报错)
```

所以，一般情况下，我们是这样定义 getter 和 setter 的：

```js
let obj = {
  _a_: 1,
  get a() { return this._a_ },
  set a(value) {
    this._a_ = value
  }
}
let obj = {
  _a_: 2,
  get a() { return this._a_ },
  set a(value) {
    this._a_ = value
  }
}
obj.a // 2
obj.a = 3
obj.a // 3
```
