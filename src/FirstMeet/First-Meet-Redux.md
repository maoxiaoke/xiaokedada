# Redux 初识

很显然，Redux 是借鉴了 Flux 思想，而非完全遵循它的一个库。

## Redux 和 Flux

### 来自 Flux 的借鉴

第一个借鉴的，也是很重要的一点是: **单向数据流**

1. 在特定的地方去更新数据(在 flux 是 `Store`，在 Redux 是 `reducer`)。
2. 无法直接修改数据，而是通过 `Action` 描述其数据数据变化。

### 和 Flux 的不同

1. 没有 `Dispatcher`。
2. 只有一个 `Store`，也就是说使用一个 `Store` 来保存整个应用的状态。所以这也是第一点的理由，如果我们只需要一个 `Store` 时,就可以将 `Store` 和 `Dispatcher` 作为相同的概念了，将 `Action` 直接分发到 `Store`。
3. 只读的 `State`。对于 `Redux` 而言，在 `Reducer` 中不应该直接修改数据，而是返回一个新的对象。