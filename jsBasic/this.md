# 关于js中的this
## 一、this指向window/global
## 二、函数中的this：非严格模式、严格模式
## 三、call\apply\bind改变this指向
## 四、箭头函数中的this
```
var obj = {
    props: 'll',
    fn: function () {
        return function () {
            console.log(this.props);
        };
    }
};

var fnn = obj.fn();
fnn(); // undefined
```

```
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
this 的绑定只受最靠近的成员引用的影响
```
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 42
```
最靠近的引用才是最重要的
## 六、原型链中的this
1. 同作为对象的方法
2. getter 与 setter 中的 this

## 七、作为构造函数
当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。

## 八、作为一个DOM事件处理函数
当函数被用作事件处理函数时，它的this指向触发事件的元素。

## 九、作为一个内联事件处理函数
类似八：
当代码被内联on-event 处理函数调用时，它的this指向监听器所在的DOM元素：
