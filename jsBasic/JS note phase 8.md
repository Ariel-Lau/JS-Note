- eval函数的参数中如果直接传入一个“return”语句，会报错（因为eval中的这个return字符串没有处于函数作用域内）
```
> var foo = function(a){eval(a)}
undefined
> foo("return;")
SyntaxError: Illegal return statement
> return
return
^^^^^^

SyntaxError: Illegal return statement
foo("(function(){return})()")
```
- eval的别名调用使用的作用域是全局作用域，所以修改的也是全局作用域的变量
```
> var geval = eval
undefined
> var x='global',y='global'
undefined
> function f(){var x='local';eval('x += "changed"');return x}
undefined
> function g(){var y='local';geval('y += "changed"');return y}
undefined
> console.info(f(),x)
localchanged global
undefined
> console.info(g(),y)
local globalchanged
undefined
> y
'globalchanged'
```
- 块级作用域是指:
> 任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。
```
(function abc(){
        {
            var x ='block1';
        }

        {
            var y='block2';
            console.info(x);
        }
    })();
    //block1
    //因为var不支持块级作用域，所以能够读取到x

(function abc(){
        {
            let x ='block1';
        }

        {
            let y='block2';
            console.info(x);
        }
    })();
    //Uncaught ReferenceError: x is not defined
    //let表示支持块级作用域，所以不能够读取到x,报x未定义
```