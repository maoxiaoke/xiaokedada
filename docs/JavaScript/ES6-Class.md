# 基于 Class 的继承

TODO:

- [ ] this.xxx 要在 super() 之前
- [ ] class 的新提案 1. # 2. 成员函数表达式

## Overview

下面是一个最简单的 superClass `Person` 和 class `Empolyee`：

```js
class Person {
  constructor(name) {
    this.name = name
  }
  static create (...args) {
    return new this (...args)
  }
  toString () {
    return `I am ${ this.name }`
  }
}
```
## 面向对象编程的理论

## static

的目的

https://www.reddit.com/r/javascript/comments/58yvgk/what_is_the_point_of_static_methods_in_classes/


## Class 的批评

1. syntax 和 semantics 的分离