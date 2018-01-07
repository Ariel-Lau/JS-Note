- 多维数组的理解(多维数组的理解是在一维数组里面嵌套其他数组)
```
> var arr=[[1,2,3],[4,5],[6]]
undefined
> var array=[[[1,2,3]]]
undefined
> array[0]
[ [ 1, 2, 3 ] ]
> array[1]
undefined
> array=[[[1,2,3]],[[4,5,6]]]
[ [ [ 1, 2, 3 ] ], [ [ 4, 5, 6 ] ] ]
> array[1]
[ [ 4, 5, 6 ] ]
> array[0][2]
undefined
> array[0][0]
[ 1, 2, 3 ]
> array[0][0][2]
3
```

- 对象属性访问的规则
```
> obj
{ '123': 123, 'ab c': 'abc' }
> obj.123
SyntaxError: Unexpected number
    at Object.exports.createScript (vm.js:24:10)
    at REPLServer.defaultEval (repl.js:245:25)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:441:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:212:10)
    at REPLServer.Interface._line (readline.js:551:8)
    at REPLServer.Interface._ttyWrite (readline.js:828:14)
> obj[123]
123
> obj['123']
123
> obj[ab c]
SyntaxError: Unexpected identifier
    at Object.exports.createScript (vm.js:24:10)
    at REPLServer.defaultEval (repl.js:245:25)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:441:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:212:10)
    at REPLServer.Interface._line (readline.js:551:8)
    at REPLServer.Interface._ttyWrite (readline.js:828:14)
> obj['ab c']
'abc'
```
- ==和===的区别(NaN和任何数都不相等)
```
> NaN===NaN
false
> NaN==NaN
false
```