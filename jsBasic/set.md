向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，类似于精确相等运算符（===）。

向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

```javascript
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

但是如果添加两个空对象，不会被认为是相等的，可以添加多个空对象

```javascript
> var set = new Set();
> set.add({})
Set { {} }
> set.add({})
Set { {}, {} }
```

1. 数组去重
```javascript
[...new Set([1, 2, 2, 1, 4, 3])]; // [1, 2, 4, 3]
```

2. 字符串去重
```javascript
[...new Set('aabbcadecd')]; // ["a", "b", "c", "d", "e"]
[...new Set('aabbcadecd')].join(''); // "abcde"
```

3. Array.from方法可以将 Set 结构转为数组。
```javascript
Array.from(new Set([1, 2, 2, 1, 4, 3])); // [1, 2, 4, 3]
```