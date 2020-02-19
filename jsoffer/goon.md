   ![](./imgs/sumary.png)
   ### 1.call和apply的区别是什么，哪个性能好一些?
   call和apply都是Function原型上的方法，都是改变函数的this指向，指向当前绑定的函数。
   1. `fn.cal(obj, 10, 20, 30);` // 第一个参数是绑定的对象，后面可以传入多个参数给fn，一个个参数
   2. `fn.apply(obj, [10, 20, 30]);` // 第二个参数是整体传给fn的，数组的形式传递参数
   3. bind也是用来改变this指向，但是bind并没有把函数立即执行，只是预先处理改变this，返回的是一个函数
   4. call要比apply好一些（尤其传入的参数>3个时）
   5. 通过扩展运算符...可以使call实现apply的效果，如:
   ```
   let arr = [1, 2, 3];
   let obj = {};
   function fn(x, y, z) {}
   fn.apply(obj, arr);
   fn.call(obj, arr); // x=[1, 2, 3], y=z=undefined
   fn.call(obj, ...arr); // 给予ES6的扩展运算符也可以实现把数组中的每一项依次传递给函数
   ```

   ### 2.性能测试: `console.time()`、` console.timeEnd()`
    `console.time()`：可以测试出一段程序执行的时间
    `console.profile()`：在火狐浏览器中安装FireBug，可以更精准的获取到程序的每一个步骤所消耗的时间

   任何代码的性能测试都是和测试的环境有关系的，例如CPU、内存、GPU等电脑当前性能每个时间点都可能不一样；不同的浏览器也会导致数据不同；
   ```
    console.time() 
    for (let i = 0; i < 10000000; i++) {

    }
    console.timeEnd()
   ```

   ### 3.实现(5).add(3).minus(2)，使其输出结果为：6
   ```
   (function () {
       // 每一个方法执行完，都要返回Number类的实例，这样才可以继续调用Number类中的方法（即链式写法）
       // 检查传入的参数是否是数字（容错性处理）
       function checkNum(n) {
           n = Number(n);
           return isNaN(n) ? 0 : n;
       }
       function add(n) {
           return this + n;
       }
       function minus(n) {
           return this - n;
       }
       Number.prototype.add = add;
       Number.prototype.minus = minus;
       // ['add', 'minus'].forEach(item => {
          //  Number.prototype[item] = eval(item);
      //  });
   })();
   console.log((5).add(3).minus(2));
   ```

### 4.箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用生成实例，那么箭头函数可以么？为什么？

#### 箭头函数和普通函数的区别
1. 箭头函数语法上比普通函数更加简洁（ES6中每一种函数都可以使用形参默认值和剩余运算符）
2. 箭头函数没有自己的this，它里面出现的this是继承函数所处上下文中的this（使用call/apply等任何方式都无法改变this的指向）；普通函数有自己的this，可以通过call/apply来改变this指向。
3. 箭头函数中没有arguments(类数组)，只能基于...agr获取传递的参数集合（数组）
4. 箭头函数不能被new执行（因为：箭头函数没有this也没有prototype（重点），因为没有prototype所以也没有原型上的constructor构造函数，故不能new创建实例）
```
var obj = {};
let fn = () => {console.log(this)}
fn.call(obj);
// 结果：Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}

let fn2 = function() {console.log(this)}

fn2.call(obj)
// 结果：{}
```

```
document.body.onclick = () => {
    // this: window 不是当前操作的body了
}
```

```
document.body.onclick = function() {
    // this: body
    // sort()方法的this是arr
    arr.sort(function (a, b)) {
        // this: window 回调函数中的this一般都是window
        // this不是sort的原因：sort只是执行传入的已经创建好的function，而这个创建好的function是在window上创建的函数
        return a - b;
    }
}
```

```
document.body.onclick = function() {
    arr.sort((a, b) => {
        // this: body，箭头函数上下文的this
        return a - b;
    }
}
```

* 回调函数：把一个函数B作为实参传递给另一个函数A，函数A在执行的时候，可以把传递进来的函数B去执行（执行N次，可传值，可改this）
```
function each(arr, callback) {
    // callback: function(item, index){}
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        index = i;
        // 接受回调函数返回的结果，如果是false，结束循环
        let flag = callback(item, index);
        if(flag === false) {
            break;
        }
    }
}
each([10, 20, 30], function(item, index){
    // this：原始操作数组
    return false
})
```

箭头函数中没有arguments(类数组)，只能基于...agr获取传递的参数集合（数组）
```
let fn = (...arg) => {
    console.log(arguments); // VM9096:2 Uncaught ReferenceError: arguments is not defined
    console.log(arg); // [10, 20, 30]
}
fn(10, 20, 30);
```

箭头函数不能被new执行（因为：箭头函数没有this也没有prototype（重点），因为没有prototype所以也没有原型上的constructor构造函数，故不能new创建实例）
```
function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function() {};
let f = new Fn(); // {x: 100}
```

```
let Fn = () => {
    this.x = 200;
}
let f = new Fn(); // Uncaught TypeError: Fn is not a constructor
```

### 5.如何把一个字符串中的大小写取反（大写变小写，小写变大写），例如'AbC'变'aBc'
思路一：for循环遍历字符串中的每个元素，性能不好
思路二：用正则匹配捕获到想要的内容，如字母，然后进行转换，性能比for循环好

正则匹配实现：
```
let testStr = 'AbC测试！**HaHa';
// 正则匹配字母：/[a-zA-Z]/g
testStr = testStr.replace(/[a-zA-Z]/g, ele => {
    // ele: 每一项正则匹配的结果
    // 验证是否为大写字母：
    // 1.把字母转换为大写后看和之前是否一样，如果一样，那么该字母是大写的
    // 2.在ASCII表中找到大写字母的取值范围进行判断（65-90）
    // 1.ele.toUpperCase === ele;
    // 2.ele.charCodeAt() >= 65 && ele.charCodeAt() <= 90
    return ele.toUpperCase() === ele ? ele.toLowerCase() : ele.toUpperCase();
})
console.log(testStr);
```

### 6.实现一个字符串匹配算法，从字符串s中，查找是否存在字符串T，若存在则返回所在位置，不存在返回-1!（如果不能基于indexOf/includes等内置的方法，你会如何处理呢？）
方法一：循环遍历
```
/*
 * 循环原始字符串中的每一项，让每一项从当前位置向后截取T.length个字符串，然后和T进行比较，如果不一样，则继续循环；如果一样，则返回当前索引即可（循环结束）
 * 循环到S.length - T.length + 1就可以，不需要循环到最后，因为后面几个字符串个数可以小于T.length，那就不用比较了，直接返回-1就行
*/
function searchIndexOf(T) {
    let lenT = T.length;
    // this就是新建的字符串，也就是S
    let lenS = this.length;
    let res = -1;
    // 如果要找的字符串比字符串还要长，直接返回-1即可，找不到
    if (lenT > lenS) {
        return -1;
    }
    for(let i = 0; i < lenS - lenT + 1; i++) {
        let char = this[i];
        // 判断截取的字符串和传入的字符串是否相等
        // 不用三元运算符，因为找到了就结束了，需要break，减少循环，优化性能，三元运算符不能break
        // res = this.substr(i, lenT) === T ? i : null;
        if (this.substr(i, lenT) == T) {
            res = i;
            break;
        }
    }
    return res;
}

// 放到字符串原型上
String.prototype.searchIndexOf = searchIndexOf;

let s = 'lmmmmyyzyhhgs';
let t = 'zy';
consolelog(s.searchIndexOf(t)); // 7
```

方法二：正则
```
function searchIndexOf(T) {
    let reg = new RegExp(T); // 不能用元字符创建正则，/T/这种方式创建的正则就是字母T字符，不是变量T，new RegExp(T)创建的是传入变量T
    let res = reg.exec(this); // 如果正则捕获到，返回结果有个index值，即字符串匹配到的index
    return res == null ? -1 : res.index;
}

// 放到字符串原型上
String.prototype.searchIndexOf = searchIndexOf;

let s = 'lmmmmyyzyhhgs';
let t = 'zy';
consolelog(s.searchIndexOf(t)); // 7
```

### 7.输出下面代码运行结果
```
// example1
var a = {}, b = '123', c = 123;
a[b]='b';
a[c]='c';
console.log(a[b]); // c a['123'] <=> a[123]

// 举例
let obj = {100: 'mm'}
console.log(obj[100]); // mm
console.log(obj['100']); // mm
let obj = {100: 'kk', '100': 'haha'};
console.log(obj); // {'100': 'haha'}
```

```
// example2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]); // Symbol是ES6中新增的数据类型，typeof Symbol('123') === 'Symbol'，它创建出来的值是唯一值 Symbol('123') === Symbol('123'); // false

// Symbol类型会创建一个唯一的值
// 如 Symbol('123') === Symbol('123'); // false
// 同 NaN === NaN; // false
// 举例
let obj = {};
let a = Symbol('1');
let b = Symbol('2');
obj[a]=100;
obj[b]=200;
console.log(obj); // {Symbol(1): 100, Symbol(2): 200}
```

```
// example3
var a = {}, b = {key: '123'}, c = {key: '456'};
a[b]='b';
a[c]='c';
console.log(a[b]); // c

// 1. 对象的属性名不能是一个对象（遇到对象属性名，会默认转换为字符串）
// obj = {} arr = [12, 22] obj[arr]="测试" obj => {'12,22': '测试'}
// 2. 普通对象.toString() 调取的是Object.prototype上的方法（这个方法是用来检测数据类型的）
obj = {} obj.toString() => "[object object]"
obj[b]='b' => obj['[object object]'] = 'b';
```

```
example4: 构造函数、普通函数、原型
function Foo() {
    Foo.a = function() {
        console.log(1);
    }
    this.a = function() {
        console.log(2);
    }
}
// 把Foo当作类，在原型上设置实例公有的属性方法 => 实例.a();
Foo.prototype.a = function() {
    console.log(3);
}
// 把Foo当作普通对象设置私有的属性方法 => Foo.a();
Foo.a = function() {
    console.log(4);
}

Foo.a(); // 4 调用普通的Foo.a方法，输出4
let obj = new Foo(); // obj可以调取原型上的方法 Foo.a: f => 1 obj.a: f=>2
obj.a(); // 2 私有属性中有a 构造函数构造的对象的私有属性a: 2
Foo.a(); // 1 调用构造函数中的Foo.a，输出1
```

### 8.在输入框中如何判断输入的是一个正确的网址，例如：用户输入一个字符串，验证是否符合URL网址的格式
```
// 1.协议：// http/https/ftp/...
// 2.域名：www.baidu.com/xxx.cn/xxx.xxx.cn
// 3.请求路径：index.html、stu/index.html
// 4.问好传参：?xxx=xxx&xxx=xxx
// 5.哈希值：#xxx
let str = 'https://www.baidu.com?world=js';
// 协议部分：(?:(http|https|ftp):\/\/)?
// 域名部分：(?:[\w-]+\.)+[a-z0-9]+)
// query部分：((?:\/[^/?#]*)+)?
// hash部分：(\?[^#]+)?(#.+)?
let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i
console.log(reg.exec(str)); 
0: "https://www.baidu.com?world=js"
1: "https"
2: "www.baidu.com"
3: undefined
4: "?world=js"
5: undefined
index: 0
input: "https://www.baidu.com?world=js"
groups: undefined
length: 6
```

### 9. 

### 10. 编写一条正则，用来验证此规则：一个6～16位的字符串，必须同时包含大小写字母和数字
```
// 不能是纯字母（大小写）、不能是纯小写字母和数字、不能是纯大写字母和数字
// (?!^[a-zA-Z]+$)：不能是纯字母开头和结尾
let reg = /(?!^[a-zA-Z]+$)(?!^[a-z0-9]+$)(?!^[A-Z0-9]+$)^[a-zA-Z0-9]{6,16}$/;
```

正则回顾：
（1）正向预查(?=pattern)：必须符合该正则规则，要匹配的字符串，必须满足pattern这个条件
e.g:
正则表达式/lmm/会匹配lmm，也会匹配lmm2中的lmm，如果只希望lmm只能匹配lmm2中的lmm，则可以这样写：/lmm(?=2)/
```
var reg = /lmm(?=2)/;
var str = 'lmm6';
console.log(reg.exec(str)); // null
var str2 = 'lmm2';
console.log(reg.exec(str)); // lmm [0: "lmm", index: 0, input: "lmm2", groups: undefined, length: 1]
```
**注意**：括号里的内容只是参与匹配的条件，并不参与真正的捕获，只是检查一下后面的字符是否符合要求，如上返回的是lmm，而不是lmm2

（2）负向预查（?!条件）：形式(?!pattern)和(?=pattern)恰好相反，要求做匹配的时候，必须不满足pattern这个条件，还拿上面的例子：
```
var reg = /lmm(?!2)/
var str = 'lmm2';
console.log(reg.exec(str)); // null，因为正则要求，lmm后面不能是2
var str2 = 'lmm6';
console.log(reg.exec(str)); // lmm
```

以下两个正则表达式是等价的：
`var reg1 = /(?=^)\d{2}(?=$)/;` // 正向预查，左边要满足开头，右边要满足结尾
`var reg2 = /^\d{2}$/;`

### 11.实现一个$attr(name, value)遍历，属性为name，值为value的元素集合
```
function getAttr(prop, value) {
    // 获得当前页面中的所有标签
    let eles = document.getElementsByTagName('*');
    let arr = [];
    // [].forEach.call(eles, item => {});
    eles = Array.from(eles);
    eles.forEach(item => {
        // 存储的是当前元素property对应的属性值
        let itemV = item.getAttribute(prop);
        if (prop === 'class') {
            // 样式类属性名要特殊处理，如class="content box"
            new RegExp('\\b' + value + '\\b').test(itemV) ? arr.push(item) : null;
            return;
        }
        // 其它属性可以直接用value对比
        if (itemV === value) {
            // 获取的值和传递的值校验成功：当前就是我们想要的
            arr.push(item);
        }
    });
    return arr;
}
console.log(getAttr('class', 'box'));
```

### 12.英文字母汉子组成的字符串，用正则给引文单词前后加空格
1. 正则实现：
```
let str = 'dc测试aaas+!!dw';
let reg = /\b[a-z]+\b/ig;
str = str.replace(reg, value => {
    return ' ' + value + ' ';
}).trim(); // String.prototype.trim/.trimLeft/.trimRight 去除字符串首尾空格
console.log(str); // 'dc 测试 aaas +!! dw'
```
2. for循环实现

### 13.编写一个程序，将数组扁平化，并去除其中重复部分数据，最终得到一个升序且不重复的数组
```
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// 方法一：
// 第一步扁平化: 使用ES6中提供的Array.prototype.flat处理
arr = arr.flat(Infinity); // //使用 Infinity，可展开任意深度的嵌套数组
console.log(arr); // [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

// 去重排序：基于new Set()去重数组（也可以自己写方法）
// [...new Set(arr)]
// Array.from(new Set(arr));
arr = Array.from(new Set(arr)).sort((a, b) => a - b);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// 整合成一行代码：
arr = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);

// 方法二：
// 第一步：通过转成字符串进行扁平化处理，把数组直接变为字符串即可（数组toString之后，不管你有多少级，最后都会变成以逗号分割的字符串，没有中括号和所谓的层级了），相当于直接扁平化了
arr = arr.toString(); // "1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10"
// 第二步：将字符串切割成数组
arr.toString.split(','); // ["1", "2", "2", "3", "4", "5", "5", "6", "7", "8", "9", "11", "12", "12", "13", "14", "10"]
// 第三步：将数组元素转成数字类型
arr = arr.map(item => Number(item)); // [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
// 第四步：同方法一中的去重排序

// 转成字符串可以不用toString，也可以用join，如下：
arr.join('|').split(/?:,|\|/g);
```

以上方法都会一些问题：如map兼容ie 6 7 8；flat是ES6的语法

```
// 方法三：复杂些
// JSON.stringfy()也可以扁平化数组："[[1, 2, 2], [3, 4, 5, 5], [6...."
// replace(/(\[|\])/g, '')："1,2,2,3,4,5,5,6...."
arr = JSON.stringfy(arr).replace(/(\[|\])/g, '').split(',').map(item => Number(item));
```

#### 基于数组的some方法进行判断检测：验证数组中有没有符合规则的
find和some的区别：
1. some返回的是boolean，find找到符合规则的，返回当前这一项，没找到符合规则的，返回undefined。
```
// 举例：判断质数：只能被1和它本身整除
var a = [1, 2, 3, 4, 5];
var b = a.some(item => item%1 === 0 && item%item === 0); // 质数 true
var c = a.some(item => item > 6); // false
console.log(b);
```
#### 检测某个值是否是数组：Array.isArray(arr); // ES6的方法
比instanceOf靠谱

```
// 方法四：检测数组的每个元素是否还是数组，如果是数组就用...展开，直到所有的元素都不是数组，即不在嵌套
while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
}
```

```
// 方法五：自己递归处理
function ownFlat() {
    let res = [];
    let _this = this;
    // 循环arr中的每一项，把不是数组的存储到新数组中
    let fn = () => {
        for (let i = 0; i< arr.length; i++) {
            let item = arr[i];
            if (Array.isArray(item)) {
                fn(item);
                continue;
            }
            res.push(item);
        }
    }
    fn(_this);
    return res;
}
Array.prototype.ownFlat = ownFlat;
arr = arr.ownFlat();
```

### 14.实现一个new
`let dog = new Dog('欢欢');`
new一个实例的过程：
1. 像普通函数执行一样，形成一个私有的作用域；形参赋值；变量提升；
2. 默认创建一个对象，让函数中的this执行这个对象，这个对象就是当前类的一个实例
3. 代码执行
4. 默认把创建的对象返回

```
function _new(Fn, ...arg) {
    // let obj = {}; // 创建一个空对象，让他的原型链指向Fn.prototype(作为Fn的一个实例)
    // obj._proto_ = Fn.prototype;
    // 上面两行或者合并成下面这行代码
    // Object.created(A)：创建一个空对象obj，并且让空对象obj作为A对象所属构造函数的实例（obj._proto_=A）
    let obj = Object.created(Fn.prototype);
    Fn.call(obj, ...arg); // 代码执行
    return obj; // 默认把创建的对象返回
    
}
```

### 15. 数组合并、排序
let arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
let arr2 = ['A', 'B', 'C', 'D'];
// 合并后的数组为： ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```
// 方法1：在需要合并的arr2的每个元素中都加一个比1，2大的值，如3，Z
arr2 = arr2.map(item => item + '3');
let arr = arr1.concat(arr2);
arr = arr.sort(
    (a, b) => a.localeCompare(b)
).map(
    item => item.replace('3', '')
);
console.log(arr); // [ 'A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D' ]
```

let arr1 = ['D1', 'D2', 'A1', 'A2', 'C1', 'C2', 'B1', 'B2'];
let arr2 = ['B', 'A', 'D', 'C'];
// 合并后的数组为： ['D1', 'D2', 'D', 'A1', 'A2', 'A', 'C1', 'C2', 'C', 'B1', 'B2', 'B']

```
// 思路：在arr1中找到包含arr2中元素的元素下标，记录为n，然后插入arr1
// 注意：在arr1中找包含arr2中元素的元素，所以外层的for循环是以arr2为循环，内层循环才是arr1
// 思考问题可以根据问题本身的特征来思考，如本题中B、A、D、C和arr1中的B1\B2、A1\A2、C1\C2、D1\D2之间直接存在包含关系，故可以从找到包含的元素下标思路开始
let n = 0;
for (let i = 0; i < arr2.length; i++) {
    let item2 = arr2[i];
    for (let k = 0; k <arr1.length; k++) {
        let item1 = arr1[k];
        if (item1.includes(item2)) {
            // 如果包含就记录一下当前这一项的索引位置（后面如果还有包含的会重新记录这个下标值，即会更新下标值）
            n = k;
        }
    }
    // 把当前item2这一项插入到arr1中n的后面
    arr1.splice(n + 1, 0, item2);
}
console.log(arr1);
```

### 16. 经典的for循环、let、var、闭包
定时器是异步编程：每一轮循环设置定时器，无需等定时器触发指向，继续下一轮循环(定时器触发的时候，循环已经结束了)
```
// 所以最后会输出10个10，因为在最后一轮循环结束后i=10，开始执行10个异步console
// 重点：因为i是全局变量，所以每轮循环都会覆盖上一次的i值，故最后的i是10，然后10个异步调用输出10个10
// 为什么循环结束之后i变成10，因为最后一轮循环是跳出循环，当i=9这轮循环结束后，i变成10，然后不满足条件，跳出循环，所以最后全局变量var i为10
for (var i = 0; i < 10; i++) {
    setTimeout(() => {
        // 执行异步的时候，输出的i不是异步的私有变量，会继续往外层找，找到var全局的i，即循环结束后变成10的i
        console.log(i);
    }, 1000);
}
// 10， 10， 10......
```

如果要输出1，2，3，4...

```
// 方法1：利用let的块级作用域
for (let i = 0; i < 10; i++) {
    // let存在块级作用域，每一次循环都会在当前块级作用域中形成一个私有变量i存储0～9
    // 当定时器执行的时候，所使用的i就是所处块级作用域中的i
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
// 0,1,2,3,4, 5,6,7,8,9
```

```
// 方法二：闭包解决：利用闭包自执行函数形成私有作用域
// 每次将循环中的i传入闭包，形成私有作用域中的私有变量
// 第一种写法：将闭包放在异步外层
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    })(i)
}
// 0,1,2,3,4, 5,6,7,8,9
```
```
// 第二种写法：将闭包放在异步箭头函数里
for (var i = 0; i < 10; i++) {
    setTimeout((i => () => {
        console.log(i);
    })(i), 1000); // 外层的i是传入的实参，箭头函数中的i是形参
}
// 0,1,2,3,4, 5,6,7,8,9
```
注意第二种写法如果写成以下形式是错误的：
因为setTimeout里面必须是传入一个函数，如果按下面这种写法，传入setTimeout的是一个函数的执行结果，而且是一个undefined的结果，因为该函数没有return
解决：需要将闭包函数自执行结果以一个函数的形式返回，即:
```
() => {
    console.log(i);
}
```
这种是返回一个函数传入setTimeout
```
// 测试
> let res2 = (i => () => console.log(i))(2)
undefined
> res2
[Function]
>
```

`i => console.log(i);`这种是返回一个函数的执行结果undefined给setTimeout
```
// 测试1
> let res = (i => console.log(i))(2)
2
undefined
> res
undefined
>
```

```
// 测试2
for (var i = 0; i < 10; i++) {
    setTimeout(
        (i => console.log(i))(i),
    1000); // 外层的i是传入的实参，箭头函数中的i是形参
}
// TypeError [ERR_INVALID_CALLBACK]: Callback must be a function
    at setTimeout (timers.js:425:11)
```

方法3：可以基于bind的预先处理机制：在循环的时候把每次执行函数需要输出的结果，预先传给函数即可
```
var fn = function(i) {
    console.log(i);
}
for (var i = 0; i < 10; i++) {
    setTimeout(fn.bind(null, i), 1000);
}
// 0,1,2,3,4, 5,6,7,8,9
```

### 17. 匿名函数
知识点铺垫：
1. 本应匿名的函数如果设置了函数名，在外面还是无法调用，但是在函数里面是可以使用的
```
let fn = function test() {
    console.log(test);
}
// 在外面还是无法调用
test(); // ReferenceError: test is not defined
// 但是在函数里面是可以使用的，输出的是当前的函数
fn(); // [Function: test]
```
2. 而且类似于创建常量一样，这个名字存储的值不能再被修改（非严格模式下不会报错，但是不会有任何的效果，严格模式下直接报错，可以把test理解为是用const创建出来的，即是常量，不可改变）
```
// 非严格模式下没有任何效果
let fn = function test() {
    test = 89;
    console.log(test);
}
fn(); // [Function: test]
```

```
// 严格模式下报错
let fn = function test() {
    'use strict';
    test = 89;
    console.log(test);
}
fn(); // TypeError: Assignment to constant variable.
    at test (repl:3:10)
```

题目：
```
var b = 18;
(
    function b() {
        b = 20;
        console.log(b); // 函数，输出的是匿名函数b
    }
)();
console.log(b); // 18 输出的是全局变量b
```
如果想要闭包中输出b=20可以怎么处理？
```
var b = 18;
(
    function b() {
        // 声明该变量b=20
        var b = 20;
        console.log(b); // 20 里面的b一定需要是私有的，不能是全局的（可以通过声明该变量b=20）
    }
)();
console.log(b); // 18 输出的是全局变量b
```

```
// 将输出的b改为形参第一种
var b = 18;
(
    function b(b) {
        b = 20; // 相当于改变形参的值，也是将b私有化了，不是全局的
        console.log(b); // 20 里面的b一定需要是私有的，不能是全局的（将输出的b改为形参）
    }
)();
console.log(b); // 18 输出的是全局变量b
```

```
// 将输出的b改为形参第二种
var b = 18;
(
    function b(b) {
        console.log(b); // 20 里面的b一定需要是私有的，不能是全局的（将输出的b改为形参）
    }
)(20);
console.log(b); // 18 输出的是全局变量b
```

