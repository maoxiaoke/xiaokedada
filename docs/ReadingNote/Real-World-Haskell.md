# Real World Haskell

资源链接

- [wiki Haskell](https://wiki.haskell.org/Haskell)
- [typeclass](https://wiki.haskell.org/Typeclassopedia#Definition)

## 环境配置

1. 编程环境

+ 下载并安装 [Haskell Platform](https://www.haskell.org/platform/)
+ 在线编程环境 [Try Haskell](http://www.tryhaskell.org/)

2. REPL

+ 进入界面 `$ ghci`
+ 退出界面 ctrl + D

3. 加载模块

+ `Prelude` - 序幕。默认的模块
+ 加载其他模块 - `:module + [模块名]`。缩写为: `:m + [模块名]`
+ 替代默认的提示符 - `:set prompt "ghci>"`

## 数据

1. 简单的运算

```bash
ghci> 2 * 3
```

都是函数。`*` 是一个两数相乘的函数，是一个 “中缀函数”。其他大多数不能和数夹在一起则称为 “前缀函数”。

2. 布尔

`True` 和 `False`

3. Lists

+ [1,2,3] - 是 1:2:3:[] 的语法糖
+ [1..5] 变成 [1,2,3,4,5]， `..` 是 enumeration notation。这种方式也叫做 Range
+ [1,3..8] 变成 [1,3,5,7]
+ [1..] 生成一个无限列表
+ 1 : [2,3] 用于添加一个元素列表的头部。读作 `cons`(construct)
+ [1,2] ++ [3,4] 用于连接两个列表
+ `>` 和 `>=` 可以比较 List 的大小

```bash
ghci> [3,2,1] > [2, 10, 5]
True
```

因为 Head [3,2,1] > Head [2,10,5] 所以，为 True

常用的函数：

+ head - 返回首元素
+ tail - 尾部，除去首元素的部分
+ last - 返回尾元素
+ init - 首部，除去尾元素的部分

![](https://learnyoua.haskell.sg/content/zh-cn/ch02/listmonster.png)

+ length - List 长度
+ null - 检查是否为空
+ reverse - 反转
+ take - 返回前几个元素

```bash
ghci> take 3 [1,2,4,5]
[1,2,4]
```
+ drop - 删除前几个元素
+ maximum - 返回最大的那个
+ minimun - 返回最小的那个
+ sum - 返回所有元素的和
+ product - 返回所有元素的积
+ elem - 判断一个元素是否存在。“中缀函数”

```bash
ghci> 4 `elem` [1,2,4,5]
True
```

无限 List 的作用

无限 List 是一种常见 List。

+ [1..]
+ cycle 函数 `cycle [1,2,3]`
+ repeat 函数 `repeat 5`

由于 Haskell 是惰性的。因此：

```bash
ghci> take 10 (cycle [1,2,3])
[1,2,3,1,2,3,1,2,3,1]
```

List Comprehension

Set Comprehension(集合的表示法) 的应用。限制条件(predicate) 由 `,` 分隔。

```bash
ghci> [x*2 | x <- [1..4]]
[2,4,6,8]

ghci> [x*2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]

ghci> [ x*y | x <- [2,5,10], y <- [8,10,11]]
[16,20,22,40,50,55,80,100,110]
```

还可以用在函数中。

```bash
len' xs = sum [1 | _ <- xs ]
```

`_` 意思是说，不关心从 `xs` 取什么值。

4. Tuple

形如：`(1,2)`

+ 括号括起来，逗号分隔开
+ *元* 可以保存多种类型，元组内的所有 `元` 类型必须一一对应
+ 每个不同长度的 Tuple 都是独立的类型
+ 长度为 2 的 Tuple 也称为 序对(Pair)
+ 没有单元素的 Tuple

常用函数：

+ fst - 返回 序对 的首项

```bash
ghci> fst ("Wow",False)
False
```

+ snd - 返回 序对 的尾项
+ zip - 用来生成一组 序对 的 List

```bash
ghci> zip [1..] ["one", "two", "three", "four", "five"]
[(1,"one"),(2,"two"),(3,"three"),(4,"four"),(5,"five")]
```

5. 字符串和字符

+ Haskell 区分字符串和字符 `""` for 字符串；`''` for 字符。
+ `""` 表示空串，`"" == []` 为 True
+ 同 Lists 的 `:` 和 `++`
+ "Hello" 只是 ['h','e','l','l','o'] 的语法糖

## 类型

查看类型

1. 在 Haskell 中，所有类型都是 *大写字母* 开头，所有的变量名字都已 *小写字母* 开头。

2. 在 REPL 查看类型 `:set +t`；取消查看 `:unset +t`

3. 还可以用 `:type`。用法 `:type 'a'`

4. `it` 是个特殊的变量，ghci 将最近一次求值所得的结果保存在这个变量里。

什么是类型

在 Haskell 中， 每个表达式都有类型，表明这一表达式所属的范畴。同时，Haskell 也支持类型推导。

函数也有类型。

```haskell
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z
```

常见的类型

+ Int - 整型，有上界和下界的那种
+ Integer - 整数，可以存放非常大的数。
+ Float - 单精度浮点数
+ Double - 双精度浮点数
+ Bool - 布尔值
+ Char - 字符

类型变量 Type variables

```bash
ghci> :t head
head :: [a] -> a
```

`a` 是一个类型变量，也就是说 `a` 是任何类型。使用到类型变量的函数别称为 “多态函数”。

Typeclasses

比如，`==` 的函数声明：

```bash
ghci> :t (==)
(==) :: (Eq a) => a -> a -> Bool
```

`=>` 左边的是类型约束。表示这两个参数的类型同在 Eq 类之中。Eq 这一 Typeclass 提供了判断相等性的接口。

类型定义行为的接口，如果一个类型属于某个 Typeclass，那它必实现该 Typeclass 所描述的行为。

几个基本的 Typeclass:

+ Eq 包含可判断相等性的类型。只要一个函数有 Eq 类的限制，那么它就必定在定义中用到了 `==` 和 `/=`。
+ Ord 包含可比较大小的类型。类型若要称为 Ord 的成员，必先加入 Eq 家族。
+ Show 的成员可用字符串表示的类型。操作 Show Typeclass，最常用的函数表示 `show`。
+ Read 是与 Show 相反的 Typeclass。read 函数可以将一个字符串转为 Read 的某成员类型。
+ Enum 的成员都是连续的类型，即可枚举。包含的类型有： ()、Bool、Char、Ordering、Int、Integer、Float 和 Double。
+ Bounded 的成员都有一个上限和下限。
+ Num 表示数字的 TypeClass，成员类型都具有数字的特征。
+ Integral 同样表示数字的 TypeClass。Num 包含所有的数字；而 Integral 仅包含整数。其成员类型有 Int 和 Integer。
+ Floating 仅包含浮点类型：Float 和 Double。


## 函数

1. 函数调用的形式

形式是：函数名 空格 空格分隔的参数表

2. 函数的声明

为：函数名 空格分隔的参数表 = 函数行为

```haskell
// baby.haskell
doubleMe x = x + x
```

在 REPL 装载：`:l baby.haskell`

3. 函数一定要返回一个结果

4. 函数名首字母小写

5. 没有参数的函数通常称为 定义 或 名字

为： 函数名 = 函数行为

模式匹配 - Pattern matching

模式匹配通过检查数据的特定结构来检查其是否匹配。

用递归的方式实现阶乘。

```haskell
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)
```

模式的顺序很重要：它总是优先匹配最符合的那个，最后才是那个万能的匹配。

Tuple 也可以匹配。比如，有个函数将二维空间的矢量相加。

```haskell
addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
```

List 也可以进行匹配。我们只需要知道 [1,2,3] 本质只是 1:2:3:[] 的语法糖就行。

比如 `x:xs` 匹配的就是 List 的头部绑定为 x，除头部以外的部分绑定为 xs。

之前我们用 List Comprehension 实现自己的 len 函数，现在我们用模式匹配和递归来重新实现它。

```haskell
len' :: (Num b) => [a] -> b
len' [] = 0
len' (_:xs) = 1 + len' xs
```

还有一种叫 as 模式，可以保留整体的引用。

```haskell
capital :: String -> String
capital "" = "Empty string, whoops"
captial all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
```

Guards

guard 用来检查一个值得某项属性是否为真。

```haskell
bmiTell :: (RealFloat a) => a -> String
bmiTell bmi
    | bmi <= 18.5 = "You're underweight, you emo, you!"
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise   = "You're a whale, congratulations!"
```

非常像好多 if 语句，只不过放在了 `=` 的前面。

比如我们可以自己实现 max 函数。

```haskell
max' :: (Ord a) => a -> a -> a
max' a b
    | a > b =     a
    | otherwise = b
```

where 可以帮助我们提示代码可读性、减少重复率、不污染命名空间等优点。

```haskell
bmiTell :: (RealFloat a) => a -> String
bmiTell bmi
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where skinny = 18.5
          normal = 25.0
          fat = 30.0
```

where 也可以用模式匹配。

```haskell
bmiTell :: (RealFloat a) => a -> String
bmiTell bmi
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where (skinny, normal, fat) = (18.5, 25.0, 30.0)
```

where 不一定非得用在 Guard 中，比如我们得到一个姓名的首字母:

```haskell
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname
```

where 还可以定义函数。

```haskell
calcBmis :: (RealFloat a) => [(a, a)] -> [a]
calcBmis xs = [bmi w h | (w, h) <- xs]
    where bmi weight height = weight / height ^ 2
```

let 关键字

let 的使用方式是 `let [bindings] in [expressions]`。let 绑定是个表达式，允许你在任何位置定义局部变量。

```haskell
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
    let sideArea = 2 * pi * r * h
        topArea = pi * r ^2
    in  sideArea + 2 * topArea
```

或定义局部函数；

```haskell
ghci> [let square x = x * x in (square 5, square 3, square 2)]
[(25,9,4)]
```

case expressions

case 也是表达式。可以对变量的不同情况分别求值，还可以使用模式匹配。模式匹配不过是 case 语句的语法糖而已。模式匹配只能在定义函数时使用，而 case 表达式可以用在任何地方。

比如我们的阶乘函数。

```haskell
factorial :: (Integral a) => a -> a
factorial n = case n of 0 -> 1
                        _ -> n * factorial (n - 1)
```

case 的语法：

```
case expression of pattern -> result
                   pattern -> result
                   pattern -> result
```

## 递归

递归在 Haskell 非常重要：Haskell 中没有 while 或 for 循环。因为命令式语言倾向于提供求解的步骤，haskell 更倾向于提供问题的描述。

固定的模式是：先定义一个边界条件，再定义个函数，让它从一堆元素中取一个并做点事情后，把余下的重新交给这个函数。

再者就是边界条件：一般而言，处理 List 时的边界大部分都是空 List；而处理 Tree 时的边界条件就是没有子元素的节点；处理数字的时候也很一致，一般是寻找幺元作为边界条件。

## 高阶函数

curry 柯里化

Haskell 所有多参数的函数都是 curried function。

```bash
ghci> max 4 5
5
ghci> (max 4) 5
5
```

以上两者是等价的。我们看一下 max 的类型：

```bash
ghci> :t max
max :: Ord a => a -> a -> a
```

实际上也可以写作：`max :: Ord a => a -> (a -> a)`

中缀函数也可以使用 curry。

```haskell
divideByTen :: (Floating a) => a -> a
divideByTen = (/10)
```

将函数作为参数传递

比如下面这个例子：

```haskell
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)
```

注意类型，括号里的表明：首个参数是个类型和返回值都为 a 的函数。

再来看一个函数。`flip` 只是简单地将函数的两个参数颠倒一下。

```haskell
flip' :: (a -> b -> c) -> (b -> a -> c)
flip' f = g
    where g x y = f y x
```

由于函数默认都是柯里化的，`->` 是右结合，所以第二对括号是没有必要的(范畴论)。因此可以改成更为简单的写法。

```haskell
flip' :: (a -> b -> c) -> b -> a -> c
flip' f y x = f x y
```

map 和 filter

map 的定义：

```haskell
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
```

最终你会发现，map 完全可以用 List Comprehension 取代。`map (+3) [1,2]` 和 `[x+3 | x <- [1, 2]]` 等价。

filter 的定义：

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter p (x:xs)
    | p x       = x : filter p xs
    | otherwise = filter p xs
```

同理，filter 也可以用 List Comprehension 的限制条件来做。

`filter` 和 `map` 都是惰性的。

举个例子：找到所有小于 10000 且为奇数的平方的和。我们这么写：

```bash
ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
166650
```

如果 `map` 不是惰性的，恐怕我们的程序就得宕机了。

lambda

lambda 就是匿名函数。有时候我们需要传给高端函数一个只会使用一次的函数，就可以搞一个特定功能的 lambda。形式是：

```
(\ 空号分隔的参数 -> 函数行为)
```

```haskell
numLongChains :: Int
numLongChains = length (filter (\xs -> length xs > 15) (map chain [1..100]))
```

lambda 是个表达式，因此我们可以任意传递。表达式 `(filter (\xs -> length xs > 15)` 返回一个函数，判断 List 的长度是否大于 15。

关键字 fold

回到最初学习递归的情景，有一个处理 List 的模式非常常见：将边界条件设为空 List，再引入 `(x:xs)` 模式，对单个元素和余下的 List 做些事情。

Haskell 引入一组函数来使之简化，也就是 fold (类似于 javascript 中的 reduce)。

+ foldl - 左折叠
+ foldr - 右折叠

```haskell
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs
```

初始值为 0。

考虑到柯里化，即 `sum()([1,2,3])`，我们还可以简化：

```haskell
sum' :: (Num a) => [a] -> a
sum' = foldl (+) 0
```

+ foldl1 - 和 foldl 类似，只是无需明确提供初始值，假定 List 的首个元素作为起始值
+ foldr1 - 和 foldr 类似，只是无需明确提供初始值，假定 List 的末尾元素作为起始值

+ scanl 和 scanr 和 foldl 和 foldr 相似，只是它们会记录下累加值的所有状态到一个 List。
+ 同理也有 scanl1 和 scanr1

```bash
ghci> scanl (+) 0 [3,5,2,1]
```

有 $ 函数的函数调用

定义如下：

```haskell
($) :: (a -> b) -> a -> b
f $ x = f x
```

也就是说，`$` 的优先级最低。作用是：用空格调用的函数调用符是左结合的，比如 f a b c 和 ((f a) b) c 等价，而 `$` 是右结合的。

```bash
ghci> sqrt 3 + 4 + 9
14.732050807568877

ghci> sqrt $ 3 + 4 + 9
4.0
```

函数组合

函数组合的定义如下：

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
```

第一个用户就是生成新函数，并传递给其他函数。

比如，我们想要将一组数字组成的 List 全部转换为 负数。即元素取绝对值，再取负数。我们用 map 完成。

```haskell
ghci> map (\x -> negate(abs(x)) [3,-1,-2]
[3,1,2]
```

如果我们用函数组合。

```haskell
ghci> map (negate . abs) [3,-1,-2]
```

明白了吗。函数组合与 map 和 lamdma 何其相似。还要一点要注意：函数组合是右结合的。

如果有多个参数怎么办呢？

```haskell
sum (replicate 5 (max 6.7 8.9))
```

可以重写为 `(sum . replicate 5 . max 6.7) 8.9` 或 `sum . replicate 5 . max 6.7 $ 8.9`。

函数组合的另一个用处是定义 point free style (也称作 pointless style) 的函数。

## module 系统

Haskell 中的模块是含有一组相关的函数，类型和类型类的组合。`Prelude` 就是模块。

装载和创建模块分别是通过 import 和 module 来实现的。

比如，装载 Data.List 模块。这个模块里的 `nub` 函数就可以使用了。

```haskell
import Data.List

numUniques :: (Eq a) => [a] -> Int
numUniques = length . nub
```

或只装载模块的某几个函数。

```haskell
import Data.List (nub，sort)
```

也可以装载除某个函数之外的其他函数，这可以避免命名冲突。

```haskell
import Data.List hiding (nub)
```

还有一种命名冲突是这样的，比如在 Data.map 模块中，里面有几个和 Prelude 模块同名的函数，比如 filter 和 null。解决方式是引入 `qualified import`。

```haskell
import qualified Data.Map as M
```

这就是说，当我们要引用 Data.Map 模块中的 filter 函数时，需要是 `Data.Map.filter`。或者取个别名 M，`M.filter`。

[Hoogle](https://www.haskell.org/hoogle/)

创建自己的模块

```haskell
module Geometry
( sphereVolume
) where

sphereVolume :: Float -> Float
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)
```

## 自己的 Type 和 Typeclass

可以看一下 Haskell Bool 的定义。

```haskell
data Bool = False | True
```

+ data - 表明要定义一个新类型
+ Bool(= 的左边) - type constructor
+ = 右边 - value constructor

类型名和 value constructor 都需要大写。

假设我们要定义个 Shape。假定是个圆或者长方形。

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
```

所以，value constructor 本质是个函数。

```haskell
ghci> :t Circle
Circle :: Float -> Float -> Float -> Shape
```

用自定义的类型来写一个函数，求表面积。

```haskell
surface :: Shape -> Float
surface (Circle _ _ r) = pi * r ^ 2
surface (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)
```

+ 第一点：Shape 是类型，Circle 并非类型
+ 第二点：模式匹配我们针对的都是 value constructor，之前我们匹配的 True, 5, [] 都是无参数的 value constructor。

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float deriving (Show)
```

有了 deriving 关键字，该 Shape 就属于 Show typeclass 中了。调用 `Circle 10 20 5` 就不会出错。

Recode syntax

现在我们来描述一个人，有姓名、年龄、身高、电话号码和爱吃的冰淇淋。

```haskell
data Person = Person String Int Float String String deriving (Show)
```

造个人：

```bash
ghci> Person "xiaoke" 18 178.4 "130****3790" "Chocolate"
```

其实我们有更好的方式。

```haskell
data Person = Person { name :: String
                     , age :: Int
                     , height :: Float
                     , phoneNumber :: String
                     , flavor :: String
                     } deriving (Show)
```

```bash
ghci> :t name
name :: Person -> String
```

+ 有了 {} 号
+ name、age、height 等都是函数
+ 这就是 Recode syntax

Type parameters

上面提到的都是 value constructor，没错就是 value：value constructor 取几个参数，然后产生(返回) 一个新 value。

type constructor，取类型作为参数，产生新类型。

```haskell
data Maybe a = Nothing | Just a
```

+ Maybe 是 type constructor。有点类似于 泛型，对具体的类型一无所知
+ a 是类型参数
+ 把 Char 交给 May，就可以得到一个 Maybe Char 的类型。Just 'a' 的类型就是 Maybe Char。


```bash
ghci> :t Just 84
Just 84 :: (Num t) => Maybe t

ghci> :t Nothing
Nothing :: Maybe a
```

Instance

(不要和传统 OOP 概念中类的实例混淆)。Int 类型就是 Eq 类型类中色一个实例。

比如我们想要对 *相同的人* 进行比较：我们就可以直接 driving (Eq)，之后就可以用 == 或 /= 来判断它们是否相等了。否则，就需要自己写函数去来判断。

```haskell
data Person = Person { name :: String
                     , age :: Int
                     } deriving (Eq, Show)
```

测试一下：

```bash
ghci> let xiaoke1 = Person(name = "xiaoke", age = 18)
ghci> let xiaoke2 = Person(name = "xiaoke", age = 18)
ghci> xiaoke1 == xiaoke2
True
```

同理，Person 也可以将其应用到所有在类型声明中用到了 Eq 类约束的函数，比如 elem。

```bash
ghci> let boys = [xiaoke1, xiaoke2]
ghci> xiaoke1 `elem` boys
True
```


Type synonyms

在写类型名的时候，[Char] 和 String 等价，可以互换。这就是类型别名 - 就是个不用的名字而已。

```haskell
type String = [Char]
```

类型别名也可以有参数。

```haskell
type AssocList k v = [(k, v)]
```

创建 Typeclasss

Typeclass 的目的之一就是抽象化操作。比如，如果我们 Person 类型不 driving (Eq)，就需要自己写函数来实现相等性。

```haskell
data Person = Person { name :: String
                     , age :: Int
                     }
eqPerson :: Person -> Person -> Bool
...
```

这样我们倒不如定义个 Typeclass。

```haskell
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)
    x /= y = not (x == y)
```

+ a 是类型变量，是任何我们在定义 instance 时的类型，也不一定要叫 a

然后，我们打算手动(而不是通过 driving (Eq) 的方式)创建一个 Instance。定义类型如下：

```haskell
data Color = Red | Yellow | Green
instance Eq Color where
    Red == Red = True
    Green == Green = True
    Yellow == Yellow = True
    _ == _ = False
```

+ instance Eq 即表示 Eq 的实例
+ a 被替换成具体类型 Color
+ 由于 == 是用 /= 来定义的，同样的 /= 也是用 == 来定义。所以我们只需要在 instance 定义中复写其中一个就好了
+ 这叫 minimal complete definition

定义 typeclass 的 subclass

比如：

```haskell
class (Eq a) => Num a where
...
```

+ subclass 的实质是添加 class constraints
+ 这里，是为 `class Num a where` 中类型变量 a 添加的限制：在某个类型可以被视作 Number 之前，必须先能被比较相不相等

Maybe 怎么办呢。特别之处在于它是一个 type constructor。单 Maybe a 是一个确切地类型。

```haskell
instance Eq (Maybe m) where
    Just x == Just y = x == y
    Nothing == Nothing = True
    _ == _ = False
```

不过仍然有个问题，是我们无法保证 Maybe 里面装的可以进行 Eq，所以需要加上限制。

```haskell
instance (Eq m) => Eq (Maybe m) where
    Just x == Just y = x == y
    Nothing == Nothing = True
    _ == _ = False
```

最后一件事，如果你想看看一个 typeclass 定义了哪些 instance。`:info` 也可以查找类型和 type constructor 的信息。

```bash
ghci> :info Num

ghci> :info Maybe
```

yes-no typeclass

这一个 typeclass 是一个这样的来历：对于 JavaScript 这类弱类型的语言而言，`''`、`false`、`0` 这一类都称为 “假值”，yes-no typeclass 就是模拟这样行为的。

先声明一个 typeclass。

```haskell
class YesNo a where
    yesno :: a -> Bool
```

接下来定义一些 instance。

数字。

```haskell
instance YesNo Int where
    yesno 0 = False
    yesno _ = True
```

布尔。

```haskell
instance YesNo Bool where
    yesno = id
```

让 Maybe 也称为 YesNo 的 Instance

```haskell
instance YesNo (May a) where
    yesno (Just _) = True
    yesno Nothing = False
```

Functor typeclass

Functor typeclass 基本上可以代表可以被 map 的东西。比如 List，是的，List 就属于 Functor typeclass。

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

和之前的稍微有点不一样。之前的 a 是一个类型变量，但我们知道这肯定是个确认的类型。`f` 是一个 type constructor，是接收一个类型的函数。

+ fmap 接收一个函数，这个函数从一个类型映射到另一个类型；还接收一个被 functor 应用过的类型；返回一个被 functor 应用过另一个类型。

我们来看一下针对 List 实现的 map。

```haskell
instance Functor [] where
    fmap = map
```

+ [] 不能是 [a]，后者是具体的类型；[] 是 type constructor，能构造出 [Int]、[String] 等具体类型

**可以当成盒子的类型可能就是一个 functor**。比如 `[]` type constructor，就能想象成拥有无限小隔间的盒子：可能全部都是空的；可能部分空；

比如 Maybe type constructor，也可以表现得像个盒子。可能什么都没有，就是 Nothing；或者装了个东西。

```haskell
instance Functor Maybe where
    fmap f (Just x) = Just (f x)
    fmap f Nothing = Nothing
```

Kind - 类型的类型

类似于 `3`、`"YEAH"`、`True`(函数也是值的一种) 都有自己的类型。类型就是一个标签。但类型也有自己的标签，也就是类型的类型，就是 kind。`:k` 可以得知一个类型的 kind。

```bash
ghci> :k Int
Int :: *
```

+ 就是 Int 类型是 *，表示这个类型是一个具体的类型
+ 一个具体类型没有任何类型参数，**而值只能属于具体类型**。

Maybe 就不一样了。

```bash
ghci> :k Maybe
May :: * -> *
```

+ 就是说 Maybe 是类型构造子，接收一个具体类型，然后回传一个具体类型。

```bash
ghci> :k Maybe Int
May Int :: *
```

那 Either 呢。

```bash
ghci> :k Either
Either :: * -> * -> *
```

这告诉我们 Either 接受两个具体类型作为参数，并构造出一个具体类型。他看起来也像是一个接受两个参数并回传值的函数类型。类型构造子是可以做 curry 的，所以我们也能 partially apply。

## IO

和输入输出设备交互是一个不纯的操作。

Hello World

```haskell
-- file: helloworld.hs
main = putStrLn "Hello World"
```

编译这个程序的方式，有很多。其中一种是：

```bash
$ runghc helloworld.hs
```

还可以不使用 REPL，直接在终端运行。

```bash
$ ghc --make helloworld
$ ./helloworld
Hello World
```

复杂一点的例子

```haskell
main = do
    putStrLn "Hello, what's your name?"
    name <- getLine
    putStrLn ("Hey " ++ name ++ ", you rock!")
```

看一下各自的形态吧。

```bash
ghci> :t main
main :: IO ()

ghci> :t putStrLn
putStrLn :: String -> IO ()

ghci> :t putStrLn "Hello World"
putStrLn "Hello World" :: IO ()

ghci> :type getLine
getLine :: IO String
```

+ putStrLn 接收一个 String，返回一个 IO ()。IO something 类型的所有东西都是一个 IO Action，你可以保存它但是什么都不会发生。
+ () 是一个空的 tuple(或叫 unit 型态)。表明从 putStrLn 没有返回值
+ IO action 都是有副作用的
+ 需要理解的是，你在 I/O Action 中运行 I/O Action，并且在那儿调用纯的（非I/O）函数。就是说，IO Action 可以保存一个什么东西，但什么都不会发生。只能有其他 IO Action 运行它。
+ 也就是 main。它就是那个顶层 IO action。do 才会运行我们 main 这个 IO action。
+ getLine 看上去就是保存了 IO action，当这个动作运行时会得到一个 String。
+ 这样 pure 和 非 pure 的函数就隔离了。
+ 只有当你有多于一个动作需要运行的时候才要用到 do。do 代码块的值是最后一个动作执行的结果，而且最后一个 IO action 不能绑定任何名字。

看一个更复杂一点的例子：

```haskell
main = do
    line <- getLine
    if null line
        then return ()
        else do
            putStrLn $ reverseWords line
            main

reverseWords :: String -> String
reverseWords = unwords . map . reverse. words
```

+ if 在一个 I/O do block 块中，类似于是这样 `if condition then IO action else IO action`
+ 所以 return () 是一个 IO action。return 在 haskell 中完全不一样：意义是使用某个 pure value 造出一个 IO action。`return 'HA'` 的类型就是 IO String。通常，可以用 return () 来造出一个没有做任何事情的 IO action
+ 在 else 中，由于我们递归地调用了 main(还记得吗，main 也是一个 IO action)。因此需要用到 do。

模块 Control.Monad

模块 Control.Monad 提供了一些能够处理 IO action 的函数。

+ when - 用在 do block 中，接受一个 Boolean 值和 IO action。用法是将 `if something then do some I/O action else return ()` 这样的模式封装起来。
+ forever - 接受一个 IO action 并回传一个永远作同一件事的 IO action。

文件和字符流

比如我们有一个文件 baby.txt

```text
I'm a xiaoke
I'm handsome
haaaaaaaaaaa
```

我们如何处理这个文件呢。

```haskell
import Data.Char

main = do
    contents <- getContents
    putStr (map toUpper contents)
```

编译文件，然后

```bash
$ cat baby.txt | .toUpperCase
```

有一点：

+ getContents 是 Lazy IO
+ `foo <- getContents` 并不会马上读取所有输入，将他们存在 memory 里面

## Functor

在 haskell 中，Functor 是一元 type constructor。 属于 Functor typeclass 的 instance，并且满足 functor law。

提到的 Maybe、[]、Either a 都是 functor。

其次，IO action 也是 functor。

Applicative functors

当我们对 functor map over 一个函数时，用的函数都只接受一个参数。但如果函数接受两个参数呢。

比如 `fmap(*) (Just 3)` 的结果是 `Just(* 3)`，得到了一个包在 Just 中的函数。

```bash
ghci> :t fmap (++) (Just 5)
fmap (++) (Just 5) :: Num [a] => Maybe ([a] -> [a])
```

之后，我们需要用一个能 “吃” (这个包在 Just 中的函数) 的函数来 map over 这个 functor。

```bash
ghci> let a = fmap (*) [1,2,3,4]
ghci> fmap (\f -> f 9) a
[9,18,27,36]
```

applicative functors 在 Haskell 中是用在 Control.Applicative 中的 Applicative 这个 typeclass 来定义的。

```haskell
class (Functor f) => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b
```

+ class contraint 描述了一个 type constructor 是 Applicative，也必须是 Functor。
+ 第一个定义是 pure，类型是 `pure :: a -> f a`。应该要接受一个值，然后回传一个包含那个值的 applicative functor。
+ `<*>` 的类型 `f (a -> b) -> f a -> f b`。`<*>` 则是接受一个装有函数的 functor 跟另一个 functor，然后取出第一个 functor 中的函数将它对第二个 functor 中的值做 map。

我们可以看一下 Maybe 的 Applicative 的实现。

```haskell
instance Applicative Maybe where
    pure = Just
    Nothing <*> _ = Nothing
    (Just f) <*> something = fmap f something
```

关键字 newtype

## monad

当我们谈到 Functor，抽象概念是代表一种可以被 map over 的值。

Applicative Functor 代表一种带有 context 的型态，可以用函数操作它而且同时保有他的 context。

Monad 是一个从 Applicative Functor 演进的过程：如果你有一个具有 context 的值 m a，如果把他丢进一个只接受普通值 a 的函数中，并回传一个具有 context 的值。如：

```haskell
(>>=) :: (Monad m) => m a -> (a -> m b) -> m b
```

+ 接受一个 monadic value，以及一个接受普通值得函数，然后回传一个 monadic value

Maybe Monad

一个 Maybe a 的类型表明 a 的值具备一个可能造成错误的的 context。而 Just "dharma" 的值代表他不是一个 "dharma" 的字符串就是字符串不见时的 Nothing。如果你把字符串当作计算的结果，Nothing 就代表计算失败了。

Monad type class

```haskell
class Monad m where
    return :: a -> m a

    (>>=) :: m a -> (a -> m b) -> m b

    (>>) :: m a -> m b -> m b
    x >> y = x >>= \_ -> y

    fail :: String -> m a
    fail msg = error msg
```

+ return 等价于 pure，接受一个普通值并放进一个最小的 context 里。
+ `>>==` bind 函数，接受一个 monadic value(具有 context 的值)，并且把他喂给一个接受普通值的函数，并回传一个 monadic value。


看一下 Maybe 的 Monad instance。

```haskell
instance Monad Maybe where
    return x = Just x
    Nothing >>= f = Nothing
    Just x >>= f  = f x
    fail _ = Nothing
```