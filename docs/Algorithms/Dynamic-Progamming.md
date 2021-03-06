# Dynamic Programming

1. 试图仅解决子问题一次（从而减少计算量）
2. Bottom-up approach

## 适用场景

常适用于 **重叠子问题(Overlapping Sub-problems)** 和 **最优子结构(Optimal SubStructure)** 性质的问题。

具有重叠子问题：如果一个问题可以分解为多个可重复的子问题，或该问题的递归算法解决相同的子问题而不是生成新的子问题。称这样的问题具有 *重叠子问题*。

具有最优子结构：如果一个问题可以分解为子问题，并通过找到子问题的最优解，从而得到问题的最优解。称这样的问题具有 *最优子结构*。

## “三步走” 解题法

### 思考 “三步走”

1. 定义 DP 数组
2. 状态转移方程
3. 找初始值

### 编码 “三步走”

1. 处理特判
2. 初始化 DP
3. 实现状态转移方程 + 边界处理


// TODO: DP vs 分治 vs 递归
