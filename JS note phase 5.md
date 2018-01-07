- JS会自动转换类型，（当它期望某种类型时，会自动进行转换）
- JS中可能没有将字符转换成数字的特性(存疑)
- null转换成数字是0
```
> null*1
0
> null +1
1
```
- 空字符串转换成数字是0（""-->0）
```
> ""*1
0
```
- 空字符串转换成bool类型为false，但是转换成对象类型是通过它的包装对象，它的包装对象转换成bool类型为true 
- 0和-0转换成bool类型都是false，转换成长字符串都是'0'
- 任何对象（数组）转换成bool值都是true
- 空数组转换成数字的值时0，但是非空数组转换成数字是NaN
```
> [1,2,3,4]+1
'1,2,3,41'
> [1,2,3,4]*1
NaN
> []*1
0
```
- 当数组只有一个元素（且这个元素可以转换数字类型）的时候，转换成数字是这个这个元素转换成数字时候的值（但是需要注意的是+运算符对于字符串相连运算优先）
> [10]+1
'101'
> [10]*1
10
> ['10']*1
10

- 当数组里面是多个非数字值的情况下，会将这个数据遍历并以逗号相连（join）
```
> ['a','b','c']+1
'a,b,c1'
> ['a','b','c']*1
NaN
```
- 数字转换成字符串时会自动省略前后的空格
```
> "1      "*3
3
```
- 当数字字符串里面含有非数字字符并不会忽略,但是parseInt方法会忽略掉数字后面的非数字字符(如果传入的参数开头不是数字转换成NaN)
```
> "1a"*3
NaN
> "a1"*3
NaN
> parseInt("1a")
1
> parseInt("a1")
NaN
```
- Object函数会将null和undefined转换成空对象({})
```
> Object(null)
{}
> Object(undefined)
{}
```
- !运算符会将操作对象转化成bool类型并取反
```
> !1
false
```
- JS原始值只有一下几个（空对象和空数组都不是原始值）
1. undefined
1. null
1. 布尔值
1. 数字
1. 字符串
- JS对象转换为原始值规则
```
> var obj ={}
undefined
> obj.toString=function(){return 1}
[Function]
> obj+'a'
'1a'
> obj.toString=function(){return {a:'a'}}
[Function]
> obj
{ toString: [Function] }
> obj+'a'
TypeError: Cannot convert object to primitive value
    at repl:1:4
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:73:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:539:10)
    at emitOne (events.js:101:20)
    at REPLServer.emit (events.js:188:7)
obj.toString=function(){return {}}
[Function]
> obj+'a'
TypeError: Cannot convert object to primitive value
    at repl:1:4
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:73:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:539:10)
    at emitOne (events.js:101:20)
    at REPLServer.emit (events.js:188:7)
```
- 对象转换成字符串会优先调用toString方法，如果toString方法的返回不是原始值，那么会丢弃这个值，转而调用valueOf方法，如果返回还不是原始值，那么会报错。
- 对象转换成数字会优先调用valueOf方法，如果valueOf方法返回的不是原始值，会调用toString方法，如果返回的还不是原始值，那么会报错。
```
> []*3
0
> ['9']*3
27
> ['9'].valueOf()
[ '9' ]
> ['9'].valueOf=function(){return 10}
[Function]
> ['9']*3
27
> var arr= ['9']
undefined
> arr.valueOf=function(){return 10}
[Function]
> arr*3
30
> "true"*3
NaN
> ["true"]*3
NaN
> [true]*3
NaN
```
**以下仅供瞎搞**
```
> var date = new Date()
undefined
> date.toString=function(){return true}
[Function]
> date.valueOf=function(){return false}
[Function]
> date*3
0
> date
{ 2017-12-20T14:00:44.350Z toString: [Function], valueOf: [Function] }
> var obj ={}
undefined
> obj.valueOf=function(){return false}
[Function]
> obj
{ [Boolean: false] valueOf: [Function] }
> var now = new Date()
undefined
> now
2017-12-20T14:08:18.712Z
> now==now.toString()
true
> obj.toString()
'[object Object]'
> obj.valueOf()
false
```