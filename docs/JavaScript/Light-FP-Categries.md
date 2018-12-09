# 范畴学基础理论

近似的说法，**范畴学是一门针对函数的(抽象)代数理论的分支**。范畴学起源就是 *对象之间的函数系统*<sup>1</sup>。

## 术语

| 术语 | 含义 |
| :---: | :---: |
| algebras | 代数 |
| Category | 范畴 |
| Sets | 集合 |
| morphisms | 态射 |

## 范畴的定义

### 集合的函数关系

在定义之前，先描述集合(Set)间的函数关系。按照 G. Cantor 的想法，由一些确定的且相互区别的对象(Object)汇集而组成的一个整体，称为集合。组成该集合的对象称为它的元素<sup>2</sup>，描述为 `𝑎 ∈ A`，其中 `𝑎` 是集合 `A` 中的元素。

集合间的关系可以描述为：

<p style="text-align: center">𝑓 : A → B</p>

`𝑓` 表示集合 A 到集合 B 的函数。典型的集合和函数的关系如下：

<img src="https://raw.githubusercontent.com/maoxiaoke/xiaokedada/master/assets/function-sets.png" style="margin: 0 auto;display: block" />

上图表达的一个这样的函数关系，即

<p style="text-align: center">若 𝑓 : A → B</p>
<p style="text-align: center">若 𝑔 : B → C</p>
<p style="text-align: center">则存在 𝑔∘𝑓 : A → C</p>

这就称为 **函数组合**(compose)。满足以下关系：

<p style="text-align: center">(𝑔∘𝑓)(𝑎) = 𝑔(𝑓(𝑎)) &nbsp&nbsp 𝑎 ∈ A.</p>

Let's Go A Litte Farther! 若还有函数关系：`ℎ : C → D`。

<img src="https://github.com/maoxiaoke/xiaokedada/blob/master/assets/function-sets-02.png?raw=true" style="margin: 0 auto;display: block" />

那么：

<p style="text-align: center">(ℎ∘𝑔)∘𝑓 = ℎ∘(𝑔∘𝑓)</p>

代数学中，即为 **结合率**。

## Appendix

[1] Category Theory (sencond Edition) - Steve Awodey

[2] [高级范畴学](http://www.tup.tsinghua.edu.cn/upload/books/yz/049831-01.pdf)