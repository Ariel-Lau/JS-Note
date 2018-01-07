- 构造函数指向的对象和通过构造函数创建的对象是两个不同的对象
```
> function Person(){
    if (arguments.callee.instanceCount) 
        arguments.callee.instanceCount+=1;
    else 
        arguments.callee.instanceCount=1;}
undefined
> Person.instanceCount
undefined
> new Person()
Person {}
> Person.instanceCount
1
> new Person()
Person {}
> Person.instanceCount
2
> var person = new Person()
undefined
> person.instanceCount
```
- 函数闭包就是函数调用时形成一个闭环，在查找变量时会依据词法作用域规则查找一层一层往上找，即使是一个函数，也会是包含至少一层的作用域。
- 函数闭包有两种形式，一种是函数声明作用域链和调用作用域链相同，一个是函数声明作用域链和调用作用域链不同。大多数情况下他们是相同的，但是有些情况下是不同的。
```
var scope ='global scope'
function checkScope(){
    var scope = 'local scope'; 
    function f(){
        return scope;
    } 
    return f
}
checkScope()()
'local scope'
/**
对于上面的例子，
1. 每一个函数在声明时都有自己的函数作用域链，f和checkScope的函数作用链不是同一个
2. 函数声明作用域链在调用时大多时候是不变的(函数调用作用域链和函数声明作用域链保持一致)

所以这里即使f函数被提取出来执行，也还是按照之前的声明作用域链来寻找变量定义。
*/
```
- 当闭包返回的是一个对象时，调用多次所生成的对象是不同的，这些不同的对象所对应的作用链需要相同，但是作用域链上的对象上变量不会互相影响。
```
function counter(){
    var n=0;
    return {
        count: function (){return n++;}
        reset: function（）{n=0;}
    }
}
var c=counter(),d=counter();
c.count();//0
d.count();//0
c.reset();
d.count();//1
```
