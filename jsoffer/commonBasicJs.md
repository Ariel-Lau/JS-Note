### js100题：https://mp.weixin.qq.com/s/KEVpdAqAU3oqJ6hTYSduBw
### js的数据类型有哪些？
基本数据类型6种：栈存储
`Boolean`\\`Number`\\`String`\\`Undefined`\\`null`\\`Symbol`

复杂类型、引用类型：堆存储
`Object`\\`Array`\\`Function`

`Symbol`：代表创建后独一无二且不可变的数据类型。出现的原因估计主要是解决可能出现的全局变量冲突的问题。

### undefined和null的区别
https://mp.weixin.qq.com/s/3wuTkzoEY_f6_dmKgj8iXg

1. `Undefined`类型：值`undefined`是全局对象的一个属性；原始值：`window.undefined`
(1) 声明了一个变量，但未对其初始化时，这个变量的值就是`undefined`。
```javascript
var data;
console.log(data === undefined); //true
```
(2) 也可以显式的把一个变量声明为`undefined`
```javascript
var data = undefined;
console.log(data === undefined); //true

var value = 1;
console.log(data); //1

value = undefined;
console.log(data === undefined); // true
```
(3) 对未定义的变量执行`typeof`操作符也会返回`undefined`
```javascript
//data变量未定义
var value;
console.log(typeof data); // "undefined"
console.log(typeof value); // "undefined"
```
对`undefined`直接`typeof`也会返回`undefined`：
```javascript
typeof undefined === 'undefined'; // true
```
(4) 函数如果没有使用`return`语句指定返回值，就会返回一个`undefined`值
(5) 调用函数时没有传参数值，参数同样也会被初始化为`undefined`值

1. `Null`类型：值`null`是一个字面量
`null`表示一个空对象指针，只是变量未指向任何对象。可以把`null`理解为未创建的对象
（1）`null`常出现在返回类型是对象，但没有关联值的地方。
（2）
```javascript
typeof null === 'object'; // true
```
(3) null的应用场景：
a. 如果定义的变量在将来用于保存对象，那么最好将该变量初始化为null，而不是其他值。
b. 当一个数据不再需要使用时，我们最好通过将其值设置为null来释放其引用，这个做法叫做解除引用。

*扩展*：解除引用
1. 解除引用的真正作用是让值脱离执行环境，以便垃圾收集器在下次运行时将其回收。
2. 解除引用还有助于消除有可能出现的循环引用的情况。这一做法适用于大多数全局变量和全局对象的属性，局部变量会在它们离开执行环境时(函数执行完时)自动被解除引用。


#### undefined和null的关系
```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
```