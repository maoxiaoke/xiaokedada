# 设计模式

## 工厂模式

对于 JavaScript 而言，不需要 new 就可以构造一个对象。一个最简单的工厂模式为：

```js
function createPlugin ({
  appName="logger",
  options
} = {}) {
  return {
    appName,
    options
  }
}
```

或者使用 arrow function。

```js
const createPlugin =  ({
  appName="logger",
  options
} = {}) => ({
    appName,
    options
})
```