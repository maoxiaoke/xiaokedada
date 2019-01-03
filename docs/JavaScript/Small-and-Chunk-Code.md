# 书写有用而优雅的代码

## 很差的代码通常有以下特征

- Functions are too long and do too many things (我不明白这部分代码是怎么工作的)
- Often functions have side effects that are difficult to understand or even debug (这代码写得太烂了)
- Unclear naming of functions and variables
- Fragile code: a small modification unexpectedly breaks other application components (这代码太难改了)
- Poor or missing code coverage

所以，实际上代码编程包含两块内容：**让应用可以运行** 和 **代码质量**

## 函数需要 “小”

什么是小？

1. 第一，需要避免 *一个大的黑盒*。
2. 抽象出独立和可重用的函数。
3. 一条通用的原则是：**your functions should not be longer than 20 lines of code. Smaller - better.**
4. 做一件事，并且做好

这样做的优点是：

1. 使用了自解释的代码可增强可读性
2. 如果函数意外报错，函数的调用栈会更加清晰
3. 分隔开的函数更容易编写测试和实现更高的测试覆盖率
4. 进行功能扩展的时候(比如，想提供起来数据类型的支持)，主函数的代码不会大量增加

## 函数不是一味地小，应该是简练的

为每一行都编写一个函数不是我们的初衷。函数应该是简练的，需要把一个函数分解为多个步骤，这些步骤的抽象程度需要保持在同一层级或者低一层级。

## 使用简明扼要的函数名称

函数名称简明扼要，不应该过于冗长或者简短：不在对细节刨根问题的情况下准备表达函数的含义

- 使用小驼峰式命名法
- 因为函数代表了动作，所以名称至少包含一个动词
- 获取或设置属性值时，使用标准的 set 和 get 前缀

## 可靠的实践

1. 至少可以从点滴做起：尽所能抽象一些东西
2. Measure seven times, cut once.(三思而后行)

> 参考 [The art of writing small and plain functions](https://dmitripavlutin.com/the-art-of-writing-small-and-plain-functions/?utm_source=codropscollective) by [Dmitri Pavlutin](https://dmitripavlutin.com/author/dmitri-pavlutin/) 
