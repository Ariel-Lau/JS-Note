# 关于js中的this
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
## 一、全局环境：this指向window/global
## 二、函数中的this：非严格模式、严格模式
非严格模式下：this 的值不是由该调用设置的，所以 this 的值默认指向全局对象。
```javascript
function f1(){
  return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是window

//在Node中：
f1() === global;
```
在严格模式下，this将保持他进入执行环境时的值，所以下面的this将会默认为`undefined`：
```javascript
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```
在严格模式下，如果 this 没有被执行环境（execution context）定义（即没有被函数f2的执行环境内部定义），那它将保持为 undefined。
## 三、call\apply\bind改变this指向
## 四、箭头函数中的this
```javascript
var obj = {
    props: 'll',
    fn: function () {
        return function () {
            console.log(this.props);
        };
    }
};

var fnn = obj.fn();
fnn(); // undefined 因为fnn相当于是一个全局的方法，非箭头函数的this是由调用该方法的对象决定的，如本例fnn()实际上是window.fnn()，但是window没有props属性，所以是undefined
```

```javascript
var obj = {
    props: 'll',
    fn: function () {
        return () => console.log(this.props);
    }
};

var fnn = obj.fn();
fnn(); // ll 箭头函数中的this永远指向它被创建时的执行环境的this，此例子中也就是：箭头函数的this => fn的this => obj，所以最后输出ll
```
## 五、作为对象的方法
当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
this 的绑定只受最靠近的成员引用的影响
```javascript
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 42
```
最靠近的引用才是最重要的
## 六、原型链中的this
1. 同作为对象的方法：this指向的是调用这个方法的对象
2. getter 与 setter 中的 this：this 绑定到设置或获取属性的对象

## 七、作为构造函数
当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。

## 八、作为一个DOM事件处理函数
当函数被用作事件处理函数时，它的this指向触发事件的元素。

## 九、作为一个内联事件处理函数
类似八：当代码被内联on-event 处理函数调用时，它的this指向监听器所在的DOM元素。

## 以下摘自《高程》
`this`对象是在运行时基于函数的执行环境绑定的：
（1）在全局函数中，`this`等于`window`；
（2）当函数被作为某个对象的方法调用时，`this`等于调用的对象；
（3）匿名函数的执行环境具有全局性，因此匿名函数的`this`对象通常指向`window`

每个函数在被调用时都会自动取得两个特殊变量：`this` 和 `arguments`，内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量。

匿名函数的this：
```javascript
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
console.log(object.getNameFunc()()); //"The Window"
```
匿名函数的this：
```javascript
var name = "The Window";
setTimeout(function() {
    console.log(this.name); // "The Window"
} ,0);
```

如果要访问外部作用域的this可以将this保存之后，在内部函数访问。
```javascript
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
console.log(object.getNameFunc()()); //"My Object"
```
