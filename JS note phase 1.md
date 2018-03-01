## 对象
a.['']方括号带单（双）引号时，只能是属性值，不能是变量；当方括号中间不带引号（单双）时，是变量而不是属性值。
obj.key 当用.访问对象属性时，.后跟的只能是属性值，不能是变量
```
 var a= {"key":'value'}
undefined
> a
{ key: 'value' }
> a['key']
'value'
> a.key
'value'
> a[key]
ReferenceError: key is not defined
    at repl:1:3
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:73:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:539:10)
    at emitOne (events.js:101:20)
    at REPLServer.emit (events.js:188:7)
> var key ='key'
undefined
> a[key]
'value'
> key='word'
'word'
> a[key]
undefined
> a
{ key: 'value' }
```
# .和[]的区别(在中括号的值有可能是变量，所以可能根据具体的条件进行取值，但是.直接就是值，不能为变量)
```
> var obj ={a:'a',b:'b',x:'x',c:'c'}
undefined
> obj
{ a: 'a', b: 'b', x: 'x', c: 'c' }
> for(var prop in obj)
... console.info(prop+":"+obj[prop]) //此处的prop是for in中的var prop变量，不是属性值
a:a
b:b
x:x
c:c
undefined
> for(var prop in obj)
... console.info(prop+":"+obj.prop) //此处的prop是属性值，不是for in中的var prop变量。
a:undefined
b:undefined
x:undefined
c:undefined
undefined
> for(var prop in obj)
... console.info(prop+":"+obj['prop']) //此处的prop是属性值，不是for in中的var prop变量。
a:undefined
b:undefined
x:undefined
c:undefined
undefined
```
# 对象环引用
```
var b = {key1:'value1'}
undefined
> b.prop={key2:'value2'}
{ key2: 'value2' }
> b
{ key1: 'value1', prop: { key2: 'value2' } }
> b.prop2={key2:b}
{ key2: { key1: 'value1', prop: { key2: 'value2' }, prop2: [Circular] } }
> b
{ key1: 'value1',
  prop: { key2: 'value2' },
  prop2: { key2: [Circular] } }
```
# 动态数组
```
var array = [1,2,3,4]
undefined
> array.length
4
> array[100]=100
100
> array.length
101
> array[99]
undefined
```
# 字符串排序
```
var c=3
undefined
> c/=1
3
> "two">"one"
true
> "ab">"abc"
false
```
## 函数调用
```
var a =function(){console.info("hello")}
undefined
> a()
hello
undefined
> var b =a;
undefined
> b()
hello
undefined
```
## 函数嵌套调用
```
var func1= function(func){func()}
undefined
> func1()
TypeError: func is not a function
    at func1 (repl:1:27)
    at repl:1:1
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:73:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:539:10)
    at emitOne (events.js:101:20)
> func1(function(){console.info('hello')})
hello
undefined
```
# 对象的函数属性
```
var a= {key:'value'}
undefined
> a.key2=function(){console.info('key2')}
[Function]
> a
{ key: 'value', key2: [Function] }
> a.key2()
key2
undefined
> a['key2']()
key2
undefined
```