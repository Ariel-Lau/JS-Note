## 1. 获得查询字符串中的每一项
```javascript
 function getQueryStringArgs(){
    // 取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""), // 'name=mm&id=123&q=word'
    //保存数据的对象
    args = {},
    //取得每一项
    items = qs.length ? qs.split("&") : [], // ['name=mm', 'id=123', 'q=word']
    item = null,
    name = null,
    value = null,
    //逐个将每一项添加到args对象中
    for(let i=0; i<items.length; i++){
        item = item[i].split("="); // [name, mm]
        name = decodeURIComponent(item[0]); // name = name
        value = decodeURIComponent(item[1]); // value = mm
        //聪明的条件判断
        if (name.length){
            args[name] = value; // {name: mm}
        }
    }
    return args;
}
```

## 2. js模拟map
map结构：key => value

```javascript
// 用JS模拟JAVA中的map
function Map(){
    // this是map的实例对象
    // 将K-V对存入容器
    this.put = function(key, value) {
        var obj = {}; // 用空对象作为容器来存放K-P对
        obj[key] = value; // 把键值K-V绑定到obj对象上
    };
    // 获得map容器的个数
    this.size = function() {
        var count = 0;
        for(attr in obj){ // 为了严谨起见，还应该判断一下attr是不是obj自己的属性obj.hasOwnProperty(attr)
            count++;
        }
        return count;
    };
    // get方法，根据key取得value
    this.get = function(key) {
        // 要考虑自动转换的情况，作严谨的判断，对于属性值为特殊0和false特殊情况也需要兼容处理，return返回
        if(obj[key] || obj[key] === 0 || obj[key === false]){
            return obj[key];
        } else {
            return null;
        }
    };
    // remove删除方法
    this.remove = function(key) {
        if(obj[key] || obj[key] === 0 || obj[key === false]){
            delete obj[key];
        }
    };
    // eachMap 遍历map容器方法,遍历key:value。参数是回调函数函数
    this.eachMap = function(fn){
        for(var attr in obj){
            fn(attr, obj[attr]); // 直接执行一下回调函数
        }
    };
}

var m = new Map();
m.put('01','mm');
m.put('02','zz');
console.log(m.size());
console.log(m.get('01'));
m.remove('01');
m.get('01');
m.eachMap(
    // 传入一个函数
    function(key, value) {
        console.log(key + ':' + value)
    }
);
```

## 3. 关于继承
### es5的继承和es6的继承有什么区别？
ES5 的继承，<font color="red">实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）。</font>
ES6 的继承机制完全不同，<font color="red">实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。</font>
### 写一个实现继承的方法
如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
实例对象有一个__proto__属性，指向该实例对象对应的原型对象。
### 继承（一）：采用原型链的概念实现继承
```javascript
    /*
     * 构造函数 原型对象 实例对象
     * 1.构造函数.prototype = 原型对象
     * 2.原型对象.constructor = 构造函数模板
     * 3.原型对象.isPrototypeOf(实例对象)  判断实例对象的原型是不是当前对象
     * 4.构造函数 实例对象 （类和实例）
     * 5.Object.getPrototypeOf(实例对象)  获取实例对象上的方法
     */

    // 父类构造函数 sup
    function Sup(name) {
        this.name = name;
    }

    // 父类的原型对象
    // 构造函数.prototype = 原型对象
    Sup.prototype = {
        constructor: Sup, // 注意这里要指明constructor是Sup，将原型对象.constructor = 构造函数关联起来
        sayName : function(){
            console.log(this.name);
        }
    }

    // 子类的构造函数sub
    function Sub(age){
        this.age = age;
    }

    /* 
     * 如果我们让原型对象等于另一个类型的实例，结果会怎么样呢？
     * 如果我们让子类的原型对象等于父类的实例，结果会怎么样呢？（实现了js的继承）
     * 1.显然此时的原型对象将包含一个指向另一个原型的指针
     *   Sup的实例对象 和 Sup的原型对象 有一个关系
     * 2.相应的另一个原型中也包含着一个指向另一个构造函数的指针
     *   Sub.prototype = new Sup('张三')；语句可以理解成：可以把子类的原型对象看成是父类的一个实例对象,而父类的实例对象与父类的原型对象有一个关联关系，从而产生了继承和链的抽象关系，即原型链的关系
     * console.log(Sub.prototype.constructor); // 子类构造函数本身Sub() 
     *   子类的原型对象的构造器变成了父类的构造器
     */
    Sub.prototype = new Sup('张三');
    // console.log(Sub.prototype.constructor); // 父类的构造函数Sup()
    
    //原型链寻找的过程：子类的实例——>子类的原型对象——>父类的实例对象——>父类的原型对象
    var sub1 = new Sub();
    console.log(sub1.name); // 张三 子类的对象继承了父类的属性
    sub1.sayName(); // 张三 子类对象继承了父类原型上的方法
```

### 继承（二）：
#### 1）原型继承（父类构造函数new一个实例对象赋值给子类的原型对象）
**原型继承的特点**：即继承了父类的构造函数（模板）（父类实例对象的所有属性如name、age、sayName()方法等），又继承了父类的原型对象。
继承已经实现了(可以把`子类的原型对象`看成是`父类的一个实例对象`，而`父类的实例对象`与`父类的原型对象`有一个关联关系，从而产生了继承和链的抽象关系)

```javascript
// 父类
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 父类的原型对象属性
Person.prototype.id = 10;

// 子类
function Boy(sex){
    this.sex = sex;
}

// 父类构造函数传递参数的情况
Boy.prototype = new Person('z3');

var b = new Boy();
console.log(b.age); // undefined 因为将父类实例赋值给子类原型对象的时候没有传age
console.log(b.name); // z3 Boy子类的实例对象已经拥有父类中的name属性，因为已经继承了
console.log(b.id); // 10 原型链的寻找过程：子类的实例——>子类的原型对象——>父类的实例对象——>父类的原型对象
for (attr in b){
    console.log(attr); // name age sex id
}
```

**原型继承存在的问题：**
1. 父类的引用类型属性被所有实例共享，如下：
```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}
function Child () {}
// 原型继承
Child.prototype = new Parent();
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy", "yayu"]
```
2. 在创建 Child 的实例时，不能向Parent传参。如果要传参的话只能在原型继承的过程中，将父类new实例赋值给子类原型对象的时候传参。


### 2）类继承（借用构造函数的方式继承）（借用`call` 、`apply`的方式继承）：只继承模板（即构造函数），不继承原型对象。
父类构造函数不传递参数，在子类构造函数new一个对象的时候传递参数

```javascript
// 父类
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 父类的原型对象属性
Person.prototype.id = 10;

//子类
function Boy(name, age, sex){
    // call  apply 
    Person.call(this, name, age); // 接收父类的name 和 age属性  但是原型对象的属性没有继承。
    this.sex = sex;
}

var b = new Boy("张三", 20, "男");
console.log(b.name); // 张三
console.log(b.age); // 20
console.log(b.sex); // 男

console.log(b.id); // undefined  此时父类的原型对象没有继承  只是把父类的构造函数绑定到子类的构造函数中。

for (attr in b){
    console.log(attr); // name age sex
}
```

**优点：**
1. 避免了引用类型的属性被所有实例共享
```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}
function Child () {
    Parent.call(this);
}
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]
```
2. 可以在 Child 中向 Parent 传参
```javascript
function Parent (name) {
    this.name = name;
}
function Child (name) {
    Parent.call(this, name);
}
var child1 = new Child('kevin');
console.log(child1.name); // kevin
var child2 = new Child('daisy');
console.log(child2.name); // daisy
```
**缺点：**
1. 不会继承父类构造函数的原型对象；
2. 由于缺点1不会继承父类构造函数的原型对象，所以父类的`方法都在构造函数中定义，每次创建实例都会创建一遍方法`。


### 3）原型继承 + 借用构造函数式继承 = 混合继承（组合继承）
混合继承共做了三件事：继承了 2次 父类的模板（即构造函数），继承了一次父类的原型对象
**优点：**融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
**缺点：**继承了两次父类的模板，降低了执行效率。
一次是设置子类型实例的原型的时候：`Child.prototype = new Parent();`
一次在创建子类型实例的时候：`var child1 = new Child('kevin', '18');`

```javascript
// 父类
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 父类的原型对象属性
Person.prototype.id = 10;
Person.prototype.sayName = function(){
    console.log(this.name);
}

// 子类
function Boy(name, age, sex){
    // call  apply 
    // 第一步：借用构造函数继承————只继承父类的模板
    Person.call(this, name, age); // 接收父类的name 和 age属性  但是原型对象的属性没有继承   注意：如果把这句话注释掉，然后执行console.log(b.name);//undefined
    this.sex = sex;
}

// 第二步： 原型继承————继承父类的原型
// 不传递参数：（只产生了一个关联关系）只剩下 父类的实例 和 父类的原型对象的关系了，父类的name、age属性都没有被继承
Boy.prototype = new Person(); // 这行代码的目的就是为了继承父类的原型对象  说明这里还是继承了一遍父类的模板，并没有因为没传递参数就完全屏蔽掉父类的模板，b.name为undefined是因为子类构造函数中没有接收父类传递过来的name属性

var b = new Boy("张三", 20, "男");
console.log(b.name); // 张三
console.log(b.sex); // 男
console.log(b.id); // 10 
b.sayName(); // 张三
for (attr in b){
    console.log(attr); // name age sex id sayName
}
```

### 4) Object.create()实现继承：将传入的对象作为创建的对象的原型
`Object.created(A)`：创建一个空对象obj，并且让空对象obj作为A对象所属构造函数的实例（obj._proto_=A），即将A作为obj对象的原型对象
**缺点：**包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

模拟`Object.create()`的实现：
```javascript
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

### 5) 寄生组合式继承
```javascript
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
// 当我们使用的时候：
prototype(Child, Parent);
```

**优点：**
1. 只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
2. 与此同时，原型链还能保持不变；
3. 因此，还能够正常使用 `instanceof` 和 `isPrototypeOf`。


### 6）es6的class extends继承
https://es6.ruanyifeng.com/#docs/class-extends

### 继承的其它方式
https://mp.weixin.qq.com/s/u9STIk4zN-uY_qu2C4790A

## 4. 实现一个闭包
参考mdn、closure.md
```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

### 闭包的应用场景：
1. 用闭包定义能访问私有函数和私有变量的公有函数
   a. 共享的环境创建在一个匿名函数体内，立即执行。
   b. 环境中有一个局部变量一个局部函数，通过匿名函数返回的对象的三个公共函数访问。
```javascript
var counter = (function(){
    var privateCounter = 0; // 私有变量
    function change(val){
        privateCounter += val;
    }
    return {
        increment: function(){ // 三个闭包共享一个词法环境
            change(1);
        },
        decrement: function(){
            change(-1);
        },
        value: function(){
            return privateCounter;
        }
    };
})();

console.log(counter.value()); // 0
counter.increment();
counter.increment(); // 2
```
2. 防抖、节流函数。
3. es6中结合箭头函数经常写的闭包
   ```javascript
   const addX = x => n => n + x
   ```

## 5. 找出数组中的最大值
方法一：`Math.max.apply(null, arr)`
```javascript
var arr = [6, 4, 1, 8, 2, 11, 3];
console.log(Math.max.apply(null, arr)); // 11
```

方法二：`Math.max(...arr)`
```javascript
var arr = [6, 4, 1, 8, 2, 11, 3];
console.log(Math.max(...arr)); // 11
```

方法三：利用数组的`reduce`方法
```javascript
var arr = [6, 4, 1, 8, 2, 11, 3];
console.log(arr.reduce((max, item) => Math.max(max, item))); // 11
```

## 6. 驼峰命名和下划线的转换
### 1） 驼峰命名转下划线
```javascript
var str = 'javaScriptStudy';
str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
console.log(str); // java-script-study"
```

### 2) 下划线转驼峰
```javascript
var str = 'java-script-study';
var reg = /\-(\w)/g; // \w 数字、字母、下划线
str = str.replace(reg, function(arr, letter){
    return letter.toUpperCase();
});
console.log(str); // "javaScriptStudy"
```

## 7. 用正则交换单词的顺序
```javascript
var str = 'hello world';
var reg = /(\w*)\s(\w*)/;
str = str.replace(reg, '$2 $1'); // 单词之间的连接符号是啥，替换返回的时候就用什么符号连接，如果是'hello,world'，那返回就是'$2,$1'，即world,hello
console.log(str); // world hello
```

## 8.原生js判断浏览器是否支持某个css属性
`document.documentElement.style`获取浏览器支持的样式属性
获取到支持的属性如下：带横线的属性需要转成驼峰命名才能找到属性

![](./imgs/documentElementStyl.png)

```javascript
if(attr in document.documentElement.style){
    return true;
}
else {
    return false;
}
```

```javascript
'color' in document.documentElement.style
true
'name' in document.documentElement.style
false
```

`注意：`带横线的属性需要使用首字母小写的驼峰命名法，判断是否支持 text-shadow

```javascript
function hasCss(attr) {
    attr = attr.replace('/\-(\w)/g', function(match, p1){
        return p1.toUpperCase();
    })
    return attr in document.documentElement.style;
}
console.log(hasCss('text-shadow')); // true
console.log(hasCss('color')); // true
console.log(hasCss('ha-ha')); // false
```

带浏览器hack前缀的写法：前缀包括：`webkit`（Chrome、Safari）、`moz`（firefox）、`o`（opera）、`ms`（IE\Edge）
需要将hack前缀都转成驼峰方式，拼接属性之后如：`webkitLineClamp`、`-moz-animation`
```javascript
'mozTransform' in document.documentElement.style  
'webkitTransform' in document.documentElement.style  
'oTransform' in document.documentElement.style 
'msTransform' in document.documentElement.style
```

## 9. js的深拷贝和浅拷贝
### 什么是深拷贝？ 拷贝实例
深拷贝是开辟一块新的内存地址，将原对象的各个属性逐个复制进去。对拷贝对象和源对象各自的操作互不影响。

深拷贝的实现

1.使用JSON转换可以深拷贝一个对象，但是继承的属性会丢失

```javascript
// 将对象转换成JSON字符串又转换成JSON对象
let h = JSON.parse(JSON.stringify(a));
```

2.直接写一个深拷贝的方法
```javascript
//深拷贝
function deepCopy(obj) {
    // string、number、boolean、null、undefined没有深拷贝一说
    // 只有对象类型的如：Object、Array、Function才需要考虑深拷贝
    if(typeof obj !== 'object'){
        return;
    }
    // 初始化新开辟的内存空间时需要判断下是存储对象还是数组
    // 或者通过 var newO = Array.isArray(obj) ? [] : {};
    var newO = obj instanceof Array ? [] : {};
    // for in可以遍历到继承的可枚举属性
    for(let key in obj) {
        // 拷贝只拷贝对象自身的属性即可，所以这里还需要加一层是否是对象自身属性的判断
        if(obj.hasOwnProperty(key)){
            //深拷贝的关键代码：如果对象的属性值仍然是一个引用类型的值，则进行递归，否则直接赋值给新对象
            newO[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    // 或者通过Object.keys()遍历对象自身可枚举的属性
    // Object.keys(obj).forEach(prop => {
    //     newObj[prop] = typeof obj[prop] === 'object' ? deepCopy(obj[prop]) : obj[prop];
    // });
    return newO;
}

var testObj = {
    obj1: {
        obj2: {
            name: 'llmm',
            sex: 'girl'
        }
    },
    school: 'dlut',
    age: 16
};

var copyObj = depCopy(testObj);
console.log('深拷贝之后的对象：', copyObj);

testObj.school = 'ncu';
console.log('改变原对象的属性值：', testObj);
console.log('改变原对象之后的拷贝对象：', copyObj);

copyObj.age = 20;
console.log('改变拷贝对象属性：', copyObj);
console.log('改变拷贝对象之后的原对象：', testObj);

// 深拷贝之后的对象： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'dlut',
//   age: 16 }
// 改变原对象的属性值： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'ncu',
//   age: 16 }
// 改变原对象之后的拷贝对象： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'dlut',
//   age: 16 }
// 改变拷贝对象属性： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'dlut',
//   age: 20 }
// 改变拷贝对象之后的原对象： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'ncu',
//   age: 16 }

// 继承的方法仍然拷贝到新对象中
console.log(copyObj.toString); // [Function: toString]
console.log(testObj.toString); // [Function: toString]
```

### 什么是浅拷贝？ 拷贝引用
浅拷贝会导致 obj1 和obj2 指向同一块内存地址。改变了其中一方的内容，但是在原来的内存上做修改会导致拷贝对象和源对象都发生改变

浅拷贝的实现：

1. 使用Array的这些方法：`Array.prototype.slice()`、`Array.prototype.concat()`、`扩展运算符（...）`、`Array.from()`都会返回一个数组或者对象的浅拷贝

注意：对字符串、数值、布尔值基础类型可以实现类似的深拷贝（实质上仍然是浅拷贝），但是对于引用类型的值，只会拷贝引用到新的对象中，是浅拷贝，改变了被引用的元素会改变拷贝的新对象。

例子：

使用slice()
```javascript
> var arr1 = [1,2,3,6,9];
> var arr4 = arr1.slice()
> arr4
[ 1, 2, 3, 6, 9 ]
> arr4[3] = "lmy"
'lmy'
> arr4
[ 1, 2, 3, 'lmy', 9 ]
> arr1
[ 1, 2, 3, 6, 9 ]
```

使用concat的例子
```javascript
> arr1
[ 1, 2, 3, 6, 9 ]
> var arr5 = arr1.concat()
undefined
> arr5
[ 1, 2, 3, 6, 9 ]
> arr5[1]="zz"
'zz'
> arr5
[ 1, 'zz', 3, 6, 9 ]
> arr1
[ 1, 2, 3, 6, 9 ]
```

使用ES6新增的Array.from()
```javascript
> var arr1 = [1,2,3,6]
> var arr2 = Array.from(arr1)
> arr2
[ 1, 2, 3, 6 ]
> arr2[1]=5
5
> arr2
[ 1, 5, 3, 6 ]
> arr1
[ 1, 2, 3, 6 ]
```

使用ES6新增的扩展运算符（...）

```javascript
> var arr1 = [1,2,3,6,9];
undefined
> var arr3 = [...arr1]
undefined
> arr3
[ 1, 2, 3, 6, 9 ]
> arr3[2] = "mm";
'mm'
> arr3
[ 1, 2, 'mm', 6, 9 ]
> arr1
[ 1, 2, 3, 6, 9 ]
```

2. `Object.assign()`
![](./imgs/objectassign.jpg)
3. 直接对象赋值
```js
var obj = {a:1}
undefined
var obj1 = obj
undefined
obj1
{a: 1}
obj.a=3
3
obj1
{a: 3}
```
4. 手写一个实现浅拷贝的方法
```javascript
//浅拷贝
function shallowCopy(obj) {
    if(typeof obj !== 'object') {
        return;
    }
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key]; // 拷贝对象的引用，直接赋值，不需要递归拷贝
        }
    }
    return newObj;
}

var testObj = {
    obj1: {
        obj2: {
            name: 'llmm',
            sex: 'girl'
        }
    },
    school: 'dlut',
    age: 16
};

var copyObj = shallowCopy(testObj);
console.log('浅拷贝之后的对象：', copyObj);

testObj.obj1.obj2.sex = 'boy';
console.log('改变原对象的属性值：', testObj);
console.log('改变原对象之后的拷贝对象：', copyObj);

copyObj.obj1.obj2.name = 'zy';
console.log('改变拷贝对象属性：', copyObj);
console.log('改变拷贝对象之后的原对象：', testObj);

// 浅拷贝之后的对象： { obj1: { obj2: { name: 'llmm', sex: 'girl' } },
//   school: 'dlut',
//   age: 16 }
// 改变原对象的属性值： { obj1: { obj2: { name: 'llmm', sex: 'boy' } },
//   school: 'dlut',
//   age: 16 }
// 改变原对象之后的拷贝对象： { obj1: { obj2: { name: 'llmm', sex: 'boy' } },
//   school: 'dlut',
//   age: 16 }
// 改变拷贝对象属性： { obj1: { obj2: { name: 'zy', sex: 'boy' } },
//   school: 'dlut',
//   age: 16 }
// 改变拷贝对象之后的原对象： { obj1: { obj2: { name: 'zy', sex: 'boy' } },
//   school: 'dlut',
//   age: 16 }
```

## 10.ES6 模块与 CommonJS 模块的差异
* CommonJS 模块是`运行时加载`；ES6 模块是`编译时输出接口`；
* CommonJS 模块输出的是一个`值的拷贝`；ES6 模块输出的是`值的引用`；
* CommonJs 是`单个值导出`，ES6 Module可以`导出多个`；
* CommonJS 模块的`顶层this指向当前模块`；ES6 模块`顶层的this指向undefined`；
* CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层；

## 11. VDOM 和真实 DOM 的区别和优化：
* 虚拟 DOM 不会立马进行排版与重绘操作；
* 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗；
* 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部；

虚拟dom的原理流程：
* 用JavaScript模拟DOM树，并渲染这个DOM树
* 比较新老VDOM树，得到比较的差异对象
* 把差异对象应用到渲染的DOM树。

## 12.安全性问题，常见的网站漏洞？
https://mp.weixin.qq.com/s/Lxt0A69QFvQ-OYo1AoxGjg

### XSS(Cross Site Scripting)：跨站点脚本攻击，可理解为一种js代码注入的攻击方式。比如img的src属性是不受同源策略限制的。
利用漏洞提交恶意 JavaScript 代码，比如在input, textarea等所有可能输入文本信息的区域，输入`<script src="http://恶意网站"></script>`等，提交后信息会存在服务器中，当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。

XSS攻击可以做什么事情？
* 获取页面的数据，包括`dom、cookies、localStorage`等
* 劫持前端逻辑
* 发送请求

XSS攻击的类型：
* 反射型（非持久）：通过URL参数直接注入
* 存储型（持久）：存储到数据库后读取时注入
* 基于DOM：被执行的恶意脚本会修改页面脚本结构

XSS注入的特点：
* HTML的节点内容或属性
* javascript代码
* 富文本

防止XSS攻击的技术：
1. `输入验证`：转义、过滤内容（比如表单提交内容的过滤），前后端都需要处理这些过滤，达到双重保证。
   `<script>`转义成`&lt;script&gt;`
2. 对提交到数据库的数据通过`将数据进行JSON序列化处理`
3. `输出编码`：对输入输出的数据编码处理


### CSRF（Cross-Site Request Forgery）：跨站请求伪造（最大的特点是用户无感知）
引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。

`CSRF通常是跨域的`，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险

发起CSFR攻击的三个必要条件：
* 目标站点一定要有 CSRF 漏洞；
* 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
* 需要用户打开一个第三方站点，如黑客的站点等。
* 用户登录a.com，并保留了登录凭证（Cookie）。

栗子：
攻击者引诱用户访问了b.com。
b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会…
a.com接收到请求后，对请求进行验证，并确认是用户的凭证，误以为是用户自己发送的请求。
a.com以用户的名义执行了act=xx。
攻击完成，攻击者在用户不知情的情况下，冒充用户，让a.com执行了自己定义的操作。

类型：
1. GET类型的CSRF:
GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：
```javascript
 <img src="http://bank.example/withdraw?amount=10000&for=hacker"> 
```
在用户访问含有这个img的页面后，浏览器会自动向`http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker`发出一次HTTP请求。`bank.example`就会收到包含用户登录信息的一次`跨域请求`。

2. POST类型的CSRF：通常使用的是一个自动提交的表单
```html
 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming"/>
    <input type="hidden" name="amount" value="10000"/>
    <input type="hidden" name="for" value="hacker"/>
</form>
<script> document.forms[0].submit(); </script>
```
访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

3. 链接类型的CSRF
链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：
```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">重磅消息！！<a/>
```
由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功。

解决方案：
1. `增加验证码`：CSRF的一个特点是`伪造请求不经过网站A`、`用户无感知`，那么可以通过增加网站A的验证手段，例如`增加图形验证码或短信验证码`等，只有通过验证的请求才算合法（保证是用户自己发出的请求，而不是黑客伪造的请求，黑客不知道用户界面的验证码内容是什么）。但是这种方案拥有两个局限性，一个是增加开发成本，另外一个是降低用户体验。
2. `阻止不明外域的访问`：对于CSRF的第二个特点`伪造请求的域名不是网站A`，那么通过限制cookies不被其他域名网站使用，来达到防御的目的，具体的做法是：
   * `Samesite Cookie：strict`
    `Samesite`标明这个 Cookie是个`“同站 Cookie”`，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax
    `Samesite=Strict`：表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie，绝无例外。
   * `同源检测`（浏览器进行的同源检测）
3. `尽量用post请求`，因为伪造post请求比伪造get请求难度大，比如伪造get请求直接打开一个url或者请求一个资源就可以伪造get请求。
4. `验证referer`
    第二个特点`伪造请求的域名不是网站A`同时会造成伪造请求的referer不是网站A，因此我们可以限制不信任的请求来源。具体做法是：
    后端可以根据HTTP请求头的`referer`来判断请求是否来自可信任网站。但是这个方案也有局限性，攻击者可以设置请求不携带referer，所以这个方案适合用于辅助。
5. `CSRF Token`：服务端随机生成token，保存在服务端session中，同时保存到客户端中，客户端发送请求时，把token带到HTTP请求头或参数中，服务端接收到请求，验证请求中的token与session中的是否一致。

扩展：关于cookie的httpOnly、domain、path：
https://juejin.im/post/5e718ecc6fb9a07cda098c2d

### 点击劫持

### SQL注入
试图在目标网站使用的数据库上执行操作的攻击类型。通常是发送一个SQL请求，希望服务器能够执行。

### DNS劫持
### https中间人劫持

## 13. 跨域
https://juejin.im/post/5e948bbbf265da47f2561705?utm_source=gold_browser_extension
1. `CORS`（跨域资源共享）：http的header头配置`Access-Control-Allow-Origin`
2. `JSONP`：JSONP跨域只支持get请求
3. `cookie：domain、sameSite`： `httpOnly`应该不算是跨域，只是js脚本无法直接获取到cookie，从而保护cookie
4. `document.domain`：不同域之间的cookie共享，设置两个页面的document.domain一致之后在A页面种的cookie在B页面也可以访问到。
5. `window.postMessage(data, origin)`
6. 在`webpack`中可以配置`devServer.proxy`来快速获得接口代理的能力。
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        index: "./index.js"  },
        output: {
            filename: "bundle.js", 
            path: path.resolve(__dirname, "dist")  
        },  
        devServer: {    
            port: 8000,    
            proxy: {      
                "/api": {        
                    target: "http://localhost:8080"      
                }    
            } 
        },  
        plugins: [    
            new HtmlWebpackPlugin({      
                filename: "index.html",      
                template: "webpack.html"   
            })
        ]};
```
## 14.事件循环机制、宏任务、微任务
https://juejin.im/post/59e85eebf265da430d571f89

## 15.实现一个sleep函数
参考：https://es6.ruanyifeng.com/#docs/async
```javascript
function sleep(interval) {
  return new Promise(resolve => {
    // 通过setTimeout等待一段时间后再resolve结果实现休眠的效果
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(2000);
  }
}

one2FiveInAsync(); // 每隔两秒输出值，1 2 3 4 5
```

## 16.实现请求重试的方式？

使用`try...catch`结构，实现多次重复尝试。
```javascript
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
```
上面代码中，如果`await`操作成功，就会使用`break`语句退出循环；如果失败，会被`catch`语句捕捉，然后进入下一轮循环。

## 17.如何触发await后面的多个异步操作？
对于多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。


## 18.通过async/await改造Promise.all，遇到reject也会返回，同Promise.allSettled()
```javascript
const p1 = Promise.reject('failed')
const p2 = Promise.resolve('success')
const p3 = Promise.resolve('success')

promiseArr = [p1, p2, p3];
async function asyncAll(){
    let resArr = [];
    let res = null;
    // 用for of遍历数组元素
    for(let p of promiseArr){
        try {
            res = await p;
        }
        catch(err){
            res = err;
        }
        resArr.push(res);
    }
    return resArr;
}
```

## 19.用异步实现每隔1s输出一个值
async/await
```javascript
function sleep(){
    return new Promise((r, j) => {
        setTimeout(resolve, 1000);
    })
}
async function print(){
    for (let i = 0; i < 6; i++){
        await sleep();
        console.log(i);
    }
}
print();
```
let作用域
```javascript
function print(){
    for (let i=0; i<5; i++) {
        // 注意这里的执行时间间隔需要1000*1，因为setTimeout都是异步队列，在执行的时候都是依次放入任务队列，不会立即执行
        // 当执行的时候，如果设置的是1000，则会一起输出，不会每隔1s输出。
        setTimeout(() => console.log(i), 1000 * i);
    }
}
print();
```
es5 var + 闭包
```javascript
function print(){
    for (var i=0; i<5; i++) {
        (function(i){
            setTimeout(() => console.log(i), 1000*i)
        })(i)
    }
}
print();
```

setInterval
```javascript
function print(num, time) {
  var i = 0;
  var fn = setInterval(function () {
    console.log(i++);
    if (i >= num) {
        // 注意这里需要清空计时器 
        clearInterval(fn);
    }
  }, time * 1000);
}
print(5, 2);
```

## 20. 斐波那切数列
斐波那契数列：1、1、2、3、5、8、13、21、34......在数学上，斐波纳契数列以如下被以递归的方法定义：
```javascript
F(1)=1，
F(2)=1, (n <= 2)
F(n)=F(n-1)+F(n-2) (n>=2，n∈N*);
```

方法一： 递归实现
```javascript
function fib(n){
    if(n <= 2){
        return 1;
    }
    return fib(n-1) + fib(n-2);
}
fib(5)
// 5
fib(6)
// 8
fib(7)
// 13
```

方法2：利用数组的`reduce`方法，返回整个斐波那契列表
```javascript
// 参数n默认为2
function fibs(n = 2){
    // 获取长度为n的数组的下标值
    let arr = [...new Array(n).keys()]; // [0, 1, 2, 3, 4, .....]
    let res = arr.reduce((last, value, idx) => {
        // 当下标大于1时，开始执行前两项之和
        idx > 1 ? last.push(last[idx - 1] + last[idx - 2]) : last.push(1);
        // 一定要return last，否则last.push()会报错
        return last;
    }, []);
    return res;
}
fibs(8); // (8) [1, 1, 2, 3, 5, 8, 13, 21]
```

## 21.用reduce实现数组的map方法
```javascript
var arr = [1, 2, 3, 4].reduce((last, v) => [...last, v * 2], []);
```

reduce代替filter
```javascript
const d = arr.reduce((t, v) => v > 1 ? [...t, v] : t, []);
```

## 22.实现多维数组的扁平化
#### reduce实现数组的扁平化，非常简洁
```javascript
function Flat(arr = []) {
    // 如果v是个数组，则继续递归
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}
var arr =[[[1, 'mm', [9, 6]]], [3, false]]
Flat(arr); // (6) [1, "mm", 9, 6, 3, false]
```

## 23.实现字符串翻转
```javascript
// reduce无敌
function ReverseStr(str = "") {
    return str.split("").reduceRight((t, v) => t + v);
}
const str = "reduce最牛逼";
ReverseStr(str); // "逼牛最ecuder"
```

```javascript
str.split('').reverse().join('');
```

## 请从2017-05-15T09:10:23 Europe/Paris提取出结果["2017","05","15","09","10","23"]
```javascript
let str = '2017-05-15T09:10:23 Europe/Paris';
let arr = str.match(/\d{1,}/g); 
//match会返回一个数组，
// \d 查找数字  
// {1,} 表示至少重复几次 
// /g表示全局搜索
```