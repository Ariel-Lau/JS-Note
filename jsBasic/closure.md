# 闭包
以下学习笔记摘自MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

## 基本概念
### 作用域、作用域链
作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。
作用域链的前端，始终都是当前执行的代码所在环境的变量对象。全局执行环境的变量对象始终都是作用域链中的最后一个对象。

### 什么是作用域？
作用域决定一个变量的生命周期及其可见性
https://juejin.im/post/5c4e6a90e51d4552266576d2

### 什么是词法作用域？
https://juejin.im/post/5c4e6a90e51d4552266576d2

## 什么是闭包？
1. 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
2. 闭包是指有权访问另一个函数作用域中的变量的函数。——《高程》
3. 闭包是一个可以访问外部作用域的内部函数，即使这个外部作用域已经执行结束。

## 实现？在一个函数内部创建另一个函数就会形成闭包。
**千万要注意和明确的一点（非常容易混淆和迷惑的考点，切记闭包的本质是函数内部创建另一个函数才会形成闭包，其它的都不是闭包）：** 闭包是在一个函数内部再创建了另一个函数才会形成闭包，如果在函数A外部创建的函数B，然后在函数A内部调用函数B、返回函数B、返回函数B的调用结果，都不是闭包。
```javascript
var a = 100;
function closure() {
  var a = 200;
  return function() {
    console.log(a);
  }
}
var fn = closure();
fn(); // 200 闭包会保存外层作用域中的变量
```

注意，如果是以下写法也是闭包，只要在函数中定义了另一个函数就会形成闭包
```javascript
var x = 10;
function a(y) {
    var x = 20;
    function b(y) {
        return x + y;
    }
    return b;
}

a(30)(90); // 20 + 90 = 110
a()(70); // 20 + 70 = 90
// 执行a()函数无论是否传了参数都没关系，直接返回的都是b函数，且b函数保存了定义时所在的作用域环境，可以访问该外层作用域中的变量
```

对比非闭包
```javascript
var a = 100;
function fn(f) {
  var a = 200;
  f(); // 注意函数内部的是函数调用还是定义一个函数直接返回一个函数？这关系到是否是闭包
}
function f() {
  console.log(a);
}
fn(f); // 100 因为f函数是定义在全局的，调用时输出的a也是全局的。
```

对比非闭包的另一种写法：
```javascript
var x = 10;
function a(y) {
    var x = 20;
    // 以下写法等价于
    // let res = b(y);
    // return res;
    return b(y); // 注意这里return的是一个函数调用结果，不是一个函数，return出的应该是 x + 20,此时全局调用外层的x为10
}

// 函数b定义在全局，调用的时候也是在全局调用
function b(y) {
    return x + y;
}

a(20); // 30
```

再看下这种写法：非闭包
```javascript
var x = 10;
function a(y) {
    var x = 20;
    // 以下写法直接返回一个在函数a外部定义的函数b
    return b;
}

function b(y) {
  return x + y;
}
a()(60); // 60 + 10(全局变量) = 70，a()返回一个函数b，调用时是window.b(60)，也就是return x + y => return 10 + 60
a(50)(80); // 80 + 10(全局变量) = 90，a(50)返回一个函数b，调用时是window.b(80)，也就是return x + y => return 10 + 80。无论函数a调用时是否传了参数，返回的都是函数b，是否传参数没有关系
// 执行a()函数无论是否传了参数都没关系，直接返回的都是b函数，且b函数保存了定义时所在的作用域环境，可以访问该外层作用域中的变量
```

示例1：闭包
```javascript
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc(); // Mozilla
```

`myFunc` 是执行 `makeFunc` 时创建的 `displayName` 函数实例的引用，而 `displayName` 实例仍可访问其词法作用域中的变量，即可以访问到 name 。由此，当 myFunc 被调用时，name 仍可被访问，其值 Mozilla 就被传递到console中

示例2：闭包
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

在这个示例中，定义了 makeAdder(x) 函数，它接受一个参数 x ，并返回一个新的函数。返回的函数接受一个参数 y，并返回x+y的值。

从本质上讲，makeAdder 是一个**函数工厂** — 它创建了将指定的值和它的参数相加求和的函数。在上面的示例中，使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。

add5 和 add10 都是闭包。**它们共享相同的函数定义，但是保存了不同的词法环境。** 在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。

每次调用其中一个函数时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。因为它们都各自保存了一份不同的词法环境。

## 用闭包模拟私有方法——>使js实现面向对象编程变成可能，特别是数据隐藏和封装。
私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。
下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。这个方式也称为 **模块模式（module pattern）**：

```javascript
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```

在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：`Counter.increment`，`Counter.decrement` 和 `Counter.value`。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 `privateCounter` 的变量和名为 `changeBy` 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 `privateCounter` 变量和 `changeBy` 函数。

### 参考上述实例的衍生思考和常见示例改造：参看goon.md的第16题

## 闭包的性能

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建）。

考虑以下示例：
```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
```

在上面的代码中，并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：

```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName: function() {
    return this.name;
  },
  getMessage: function() {
    return this.message;
  }
};
```

但不建议重新定义原型。可改成如下例子：

```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
```

## 闭包存在的问题：摘自《高程》
1. 占用更多的内存：由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。
```javascript
function createFunctions(){
    var result = new Array();
    // var i变量相当于是在createFunctions函数作用域中的一个变量，类似：
    // function createFunctions(){
    //    var i=0;
    //    for(i; i< 10; i++){
    //      ..........
    //    }
    // }
    for (var i=0; i < 10; i++){
      result[i] = function(){
        return i;
      };
    }
    return result;
}
console.log(createFunctions()[0]()); // 10
console.log(createFunctions()[1]()); // 10
console.log(createFunctions()[2]()); // 10
console.log(createFunctions()[3]()); // 10
console.log(createFunctions()[4]()); // 10
........
```
对以上代码，每个函数的作用域链中都保存着`createFunctions()`函数的活动对象，所以它们引用的都是同一个变量 i。当`createFunctions()`函数返回后，变量 i 的值是 10，此时每个函数都引用着保存变量 i 的同一个变量 对象，所以在每个函数内部 i 的值都是 10

为什么输出10，参考如下：
```javascript
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

如果像让每个函数返回各自对应的索引??
解决：定义一个立即执行的匿名函数，并将索引i的值传给匿名函数，在调用每个匿名函数时传入的都是不同的i，匿名函数内部return的函数形成的闭包会保存每次匿名函数执行之后传入的索引i即参数num
```javascript
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
      result[i] = function(num) {
        return function(){
          return num;
        };
      }(i)
    }
    return result;
}
console.log(createFunctions()[0]()); // 0
console.log(createFunctions()[1]()); // 1
console.log(createFunctions()[2]()); // 2
console.log(createFunctions()[3]()); // 3
console.log(createFunctions()[4]()); // 4
........
```

2. 内存泄漏
（1） 如果闭包的作用域链中保存着一个HTML 元素，那么就意味着该元素将无法被销毁
```javascript
function assignHandler(){
  var element = document.getElementById("someElement");
  element.onclick = function(){
      console.log(element.id);
  };
}
```
以上代码创建了一个作为`element`元素事件处理程序的闭包，而这个闭包又创建了一个循环引用。由于匿名函数保存了一个对`assignHandler()`的活动对象的引用，因此就会导致无法减少`element`的引用数。只要匿名函数存在，`element`的引用数至少也是1，因此它所 占用的内存就永远不会被回收。

解决：可以通过先保存`element.id`为一个变量（即保存为一个副本），然后闭包中引用该变量（消除循环引用），使用完之后强制将`ele`置空（置为`null`），注意这里不是直接将`id`变量置为空。
必须要记住：闭包会引用 包含函数 的整个活动对象，而其中包含着 `element`。即使闭包不直接引用 `element`，包含函数的活动对象中也仍然会保存一个引用。因此，有必要把`element`变量设置为`null`。这样就能够解除对 `DOM` 对象的引用，顺利地减少其引用数，确保正常回收其占用的内存。
```javascript
function assignHandler(){
  var element = document.getElementById("someElement"); // 会导致对dom对象的循环引用
  var id = element.id;
  element.onclick = function(){
      console.log(id);
  };
  element = null;
}
```

3. 多层嵌套，变量或函数的查询速度变慢。

## 扩展1：匿名函数模拟块级作用域（私有作用域）：js利用表示执行的小括号()来模拟块级作用域的概念；ES6的`let`和`const`关键字也可以产生块级作用域
```javascript
(function(){ 
  //这里是块级作用域
})();
```

用`()`将函数声明转成函数表达式：
```javascript
(function(){ 
  
})
```

```javascript
function outputNumbers(count){
    (function () {
        for (var i=0; i < count; i++){
            alert(i);
}
})();
console.log(i); // 导致一个错误!
}
```
在 for 循环外部插入了一个私有作用域。在匿名函数中定义的任何变量，都会在执行结束时被销毁。因此，变量 i 只能在循环中使用，使用后即被销毁。
而在私有作用域中能够访问变量 count，是因为这个匿名函数是一个闭包，它能够访问包含作用域中的 所有变量。

<font color="red">tips：</font>
（1）用小括号()来模拟块级作用域技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。
（2）webpack打包压缩之后的文件内容就被放在一个块级作用域中，用小括号()包裹住。
（3）这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函 数执行完毕，就可以立即销毁其作用域链了。

```javascript
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
      result[i] = function(){
        return i;
      };
    }
    return result;
}
```
以上for循环中定义的var变量i，相当于是在createFunctions函数作用域中的一个变量，类似：
```javascript
function createFunctions(){
    var i=0;
    for(i; i< 10; i++){
      ..........
    }
}
```
使用 var 声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部 环境。

## 扩展2：垃圾收集
1. 标记清除（mark and sweep）
当变量进入环境(例如，在函数中声明一个变量)时，就将这个变量标记为<font color="red">“进入环境”</font>。
从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。
而当变量离开环境时，则将其 标记为<font color="red">“离开环境”</font>。

```javascript
function test () {
  var a = 10; // 被使用
  var b = 20;  // 被使用
}
test(); // 执行完毕之后，a、b又被标记了一次：离开环境。js垃圾回收机制隔一段时间检查一下有哪些变量或者方法被标记为“离开环境”，然后将这些变量或函数回收
```

2. 引用计数
跟踪记录每个值被引用的次数。
主要思想：当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是 1。 如果同一个值又被赋给另一个变量，则该值的引用次数加 1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。

```javascript
function test2 () {
  var a = 10; // count=1
  var b = 20;
  var c;
  c = a; // count=2，变量a被变量c引用
  a = 50; // 变量a被重新赋值，count--，count=1;
}
test2();// 函数执行完毕，当变量或者函数的引用计数为0时，js垃圾回收机制轮询发现引用计数为0，将其回收。
```

**<font color="red">该方法存在的问题、缺点：</font>** 在变量循环引用时变量的引用数永远不会被标记为0，也就是永远不会被垃圾回收。所以在循环引用中最好能够在用完变量之后将其置为null或置空处理，这样就不会继续占用内存。