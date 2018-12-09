# Compose

## 实现 Compose

我们来定义一个函数，函数名就叫 `compose`。

```js
const compose = function (f, g) {
  return fucntion(x) {
    return f(g(x))
  }
}
```

其中，`f` 和 `g` 都是函数,`x` 是一个通过 “管道” 传输的值。且 `g` 将先于 `f` 执行，从而创建了一个从右到左的数据流。

## 范畴学的相关理论

著作：

- [Category Theory (Oxford Logic Guides)]() 2nd
- [Categories for the Working Mathematician]() - Saunders Mac Lane