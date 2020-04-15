1. Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
**浅拷贝**
`console.log(Array.from('foo')); // ["f", "o", "o"]`

伪数组、类数组：拥有一个 length 属性和若干索引属性的任意对象
可迭代对象：可以获取对象中的元素，如 Map和 Set等

* 数组去重合并
```javascript
function combine(){ 
    let arr = [].concat.apply([], arguments); //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n)); // [1, 2, 3]
```

* 将类数组对象转成真正的数组

2. `[].concat.apply(obj, args)`将数组的concat方法指定给某个对象或者数组等

```javascript
[].concat.apply([], [[1, 2, 2], [2,3,3]]); // [1, 2, 2, 2, 3, 3]
``` 

3. isArray()
* 鲜为人知的事实：其实 Array.prototype 也是一个数组
```javascript
Array.isArray(Array.prototype); // true
```
* 当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes。

```javascript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'; // [object Array]、[object Object]注意第一个是object，第二个是Object
  };
}
```

4. Array.of()用于将一组值转换为数组
Array.of(ele1, ele2, ele3...); // [ele1, ele2, ele3]
Array.of()的出现是为了弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

* Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）
```javascript
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

* 创建数组的方式
```javascript
let arr = [2]; // [2]
let arr = Array.of(2); // [2]
let arr = new Array(2); // [,]
let arr = new Array(2).fill(1); // [1,1]
```

* 实现Array.of()的核心代码：
`Array.prototype.slice.call(arguments);`
`[].slice.call(arguments)`
相当于：
`Array.of(arguments)` => `arguments.slice()` => `[1, 2].slice()`

```javascript
let arr = [1, 2];
let arr1 = arr.slice();
console.log(arr); // [1, 2]
console.log(arr1); // [1, 2]
```

5. concat
**浅拷贝**
* concat不会改变this或任何作为参参数提供的数组，而是返回一个浅拷贝，包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中。

```javascript
> var arr = [1,2,3]
undefined
> var arr1 = arr.concat();
undefined
> arr1
[ 1, 2, 3 ]
> arr
[ 1, 2, 3 ]
> arr = [{name: 'mm', things: {first: 'like'}}, 'love'];
[ { name: 'mm', things: { first: 'like' } }, 'love' ]
> arr1 = arr.concat();
[ { name: 'mm', things: { first: 'like' } }, 'love' ]
>
```

* 二维数组扁平化
```javascript
[].concat(...[1,2,[3,4]]); // [1, 2, 3, 4]
// 等价于
[].concat(1, 2, [3, 4]); // [1, 2, 3, 4]
```

6. Array.prototype.entries()，返回一个Array迭代器对象，该迭代器对象上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]，如下：

```javascript
> var iter = ['m', 'l', 'y'].entries();
undefined
> iter
{}
> iter.next
[Function: next]
> iter.next()
{ value: [ 0, 'm' ], done: false }
> iter.next()
{ value: [ 1, 'l' ], done: false }
> iter.next()
{ value: [ 2, 'y' ], done: false }
> iter.next()
{ value: undefined, done: true }
>
```

7. flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
var arr = [1, 2, [3, 4]];

// 展开一层数组
arr.flat();

// 等效于
arr.reduce((acc, val) => acc.concat(val), []);
// [1, 2, 3, 4]

// 使用扩展运算符 ...
const flattened = arr => [].concat(...arr);
```

flat() 方法会移除数组中的空项:

```javascript
var arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]
```

8. reduce
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

reduce的高阶用法：https://juejin.im/post/5e44002c6fb9a07c9f3fd135#heading-21

* 用reduce将二维数组转化成一维数组
  注意：这种方式只能将二维数组转成一维数组，不能将三维、四维等更深层次的数组转为一维数组

```javascript
// 传入[]作为第一次调用回调函数时的第一个参数的值
[[0, 1], [2, 3], [4, 5]].reduce((a, b) => a.concat(b), []);
// [0, 1, 2, 3, 4, 5]
```

* 统计数组中每个元素出现的次数
```javascript
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

// 传入{}作为第一次调用回调函数时的第一个参数值，即第一次调用函数时的allNames是{}
var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
console.log(countedNames); // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

* 按属性对object分类
```javascript
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }
```

* 数组去重
（1）直接去重
```javascript
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator
}, [])

console.log(myOrderedArray);
```

（2）先排序再去重
```javascript
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); // [1,2,3,4,5]
```

(5) 按顺序执行promise（参考mdn）

1. slice
**浅拷贝**
把类数组转成真正的数组，不会改变原来的类数组，返回一个新的真正的数组

```javascript
var slice = Array.prototype.slice;
slice.apply(arguments);
```

```javascript
> var likeArr = {0: 'm', 1: 'u', length: 2}
undefined
> var trueArr = [].slice.apply(likeArr); // 不会改变原来的类数组, 返回一个新的真正的数组
undefined
> trueArr
[ 'm', 'u' ]
> likeArr
{ '0': 'm', '1': 'u', length: 2 }
> trueArr instanceof Array
true
> Array.isArray(trueArr)
true
> typeof trueArr
'object'
> typeof []
'object'
```

### `array.slice()`可以直接复制一个数组，且不改变原数组；
以下示例a和b不会相互影响，实现浅拷贝
```javascript
a = [0, 9, 8]
(3) [0, 9, 8]
b = a.slice()
(3) [0, 9, 8]
b[1]=6
6
b
(3) [0, 6, 8]
a
(3) [0, 9, 8]
a[2]=5
5
a
(3) [0, 9, 5]
b
(3) [0, 6, 8]
```

### `array.splice(0, array.length)`也可以复制一个数组，但是会改变原数组
```javascript
a = [6, 3, 1]
(3) [6, 3, 1]
b = a.splice(0)
(3) [6, 3, 1]
b
(3) [6, 3, 1]
a
[]length: 0__proto__: Array(0)
b[0]=2
2
b
(3) [2, 3, 1]
a
[]
```

### 扩展，将两个对象的属性合并
通过扩展运算符`...`来合并两个对象的属性
```javascript
obj1 = {a:1}
{a: 1}
obj2={b:2}
{b: 2}
// 不会改变原对象
obj3 = {...obj1, ...obj2}
{a: 1, b: 2}
obj1
{a: 1}
obj2
{b: 2}
// 深拷贝？不是深拷贝，如果改变obj3.c中的对象属性值，obj1也会被改变，扩展运算符...实现浅拷贝合并
obj1.c={d:6}
{d: 6}
obj1
{a: 1, c: {…}}a: 1c: {d: 6}__proto__: Object
obj3 = {...obj1, ...obj2}
{a: 1, c: {…}, b: 2}a: 1c: d: 6__proto__: Objectb: 2__proto__: Object
```
类似于
```javascript
// Object.assign(target, obj2) => 会改变target对象，且直接返回合并后的target对象
var obj4 = Object.assign(obj1, obj2)
undefined
obj4
{a: 1, b: 2}
```

### `[].slice.call()`和`Array.prototype.call()`的区别：
`[].slice.call()`：（1）先建一个空数组[]，（2）然后在数组的原型对象上找到slice方法，（3）最后通过call绑定到需要调用slice()方法的对象上（如类数组对象）。
`Array.prototype.call()`: （1）直接在数组的原型对象上找到slice方法，（2）然后通过call绑定到需要调用slice()方法的对象上（如类数组对象）。
`Array.prototype.call()`找到slice方法的性能要优于`[].slice.call()`，因为是直接在数组原型对象上找的。

9. ...扩展运算符
**浅拷贝**
* 解构赋值
```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```
* 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
```javascript
> const [...butLast, last] = [1, 2, 3, 4, 5];
const [...butLast, last] = [1, 2, 3, 4, 5];

SyntaxError: Rest element must be last element

>
> const [first, ...middle, last] = [1, 2, 3, 4, 5];
const [first, ...middle, last] = [1, 2, 3, 4, 5];

SyntaxError: Rest element must be last element

> const [ last, ...butLast] = [1, 2, 3, 4, 5];
undefined
>
> last
1
> butLast
[ 2, 3, 4, 5 ]
>
```

* 将字符串转为真正的数组
```javascript
[...'hello']; // [ "h", "e", "l", "l", "o" ]
```

* 结合`set`数据结构可以对数组和字符串去重
```javascript
[...new Set('ababbc')].join(''); // 'abc'
```

1.  扩展内容
* 如果一个数组调用`valueOf()`的话返回的还是一个数组：
```javascript
[1, 2].valueOf(); // [1, 2]
```

* 如果数组调用`join()`方法不传入任何参数，或者传入的是一个`undefined`时，返回值类似调用`toString()`返回用,连接的字符串
```javascript
[1, 2].join(); // 1,2
[1, 2].join(undefined); // 1,2
```

11. 用数组实现队列：结合`shift()`和`push()`方法即可
12. 用数组实现栈：结合`push()`和`pop()`方法即可
13. 关于数组的`sort()`方法：如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等 则返回 0，如果第一个参数应该位于第二个之后则返回一个正数
升序：
```javascript
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
      return 0;
    }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
console.log(values); //0,1,5,10,15
```

降序：
```javascript
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
      return 0;
    }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
console.log(values); // 0,1,5,10,15
```

14. `reverse()`方法直接可以翻转（反转）数组元素
```javascript
[1, 2].reverse(); // [2, 1]
```