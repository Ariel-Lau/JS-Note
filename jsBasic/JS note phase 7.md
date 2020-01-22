- eval函数会使用调用它的变量作用域环境,如果传入的参数不是字符串，那么返回参数本身。
```
> var a ='abc'
undefined
> eval("a")
'abc'
> eval(1)
1
> eval({})
{}
```
- eval函数在执行传入的字符串时会影响其调用方的作用域环境
```
> eval("var b = {}")
undefined
> b
{}
```

- function是object的一个子类
```
> function abc(){}
undefined
> abc instanceof Object
true
> abc instanceof Function
true
```