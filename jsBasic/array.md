1. Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
**浅拷贝**
`console.log(Array.from('foo')); // ["f", "o", "o"]`

伪数组、类数组：拥有一个 length 属性和若干索引属性的任意对象
可迭代对象：可以获取对象中的元素，如 Map和 Set等

* 数组去重合并
```
function combine(){ 
    let arr = [].concat.apply([], arguments); //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n)); // [1, 2, 3]
```

* 将类数组对象转成真正的数组

2. `[].concat.apply(obj, args)`将数组的concat方法指定给某个对象或者数组等

```
[].concat.apply([], [[1, 2, 2], [2,3,3]]); // [1, 2, 2, 2, 3, 3]
``` 

3. isArray()
* 鲜为人知的事实：其实 Array.prototype 也是一个数组
```
Array.isArray(Array.prototype); // true
```
* 当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes。

```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'; // [object Array]、[object Object]注意第一个是object，第二个是Object
  };
}
```

4. Array.of()用于将一组值转换为数组
Array.of(ele1, ele2, ele3...); // [ele1, ele2, ele3]
Array.of()的出现是为了弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
```
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

* Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）
```
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

* 创建数组的方式
```
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

```
let arr = [1, 2];
let arr1 = arr.slice();
console.log(arr); // [1, 2]
console.log(arr1); // [1, 2]
```

5. concat
**浅拷贝**
* concat不会改变this或任何作为参参数提供的数组，而是返回一个浅拷贝，包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中。

```
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
```
[].concat(...[1,2,[3,4]]); // [1, 2, 3, 4]
// 等价于
[].concat(1, 2, [3, 4]); // [1, 2, 3, 4]
```

6. Array.prototype.entries()，返回一个Array迭代器对象，该迭代器对象上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]，如下：

```
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

```
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

```
var arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]
```

8. reduce
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

* 用reduce将二维数组转化成一维数组

```
// 传入[]作为第一次调用回调函数时的第一个参数的值
[[0, 1], [2, 3], [4, 5]].reduce((a, b) => a.concat(b), []);
// [0, 1, 2, 3, 4, 5]
```

* 统计数组中每个元素出现的次数
```
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
```
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
```
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
```
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```

(5) 按顺序执行promise（参考mdn）

8. slice
**浅拷贝**
把类数组转成真正的数组，不会改变原来的类数组，返回一个新的真正的数组

```
var slice = Array.prototype.slice;
slice.apply(arguments);
```

```
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

### `[].slice.call()`和`Array.prototype.call()`的区别：
`[].slice.call()`：（1）先建一个空数组[]，（2）然后在数组的原型对象上找到slice方法，（3）最后通过call绑定到需要调用slice()方法的对象上（如类数组对象）。
`Array.prototype.call()`: （1）直接在数组的原型对象上找到slice方法，（2）然后通过call绑定到需要调用slice()方法的对象上（如类数组对象）。
`Array.prototype.call()`找到slice方法的性能要优于`[].slice.call()`，因为是直接在数组原型对象上找的。
9. ...扩展运算符
**浅拷贝**
* 解构赋值
```
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
```
> const [...butLast, last] = [1, 2, 3, 4, 5];
const [...butLast, last] = [1, 2, 3, 4, 5];
       ^^^^^^^^^^

SyntaxError: Rest element must be last element

>
> const [first, ...middle, last] = [1, 2, 3, 4, 5];
const [first, ...middle, last] = [1, 2, 3, 4, 5];
              ^^^^^^^^^

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
```
[...'hello']; // [ "h", "e", "l", "l", "o" ]
```
