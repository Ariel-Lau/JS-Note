- 函数定义和变量一样也会提前，但是和变量不一样的是，变量只是声明提前，但是初始化还是在原来的位置。而函数是可以直接调用
- 以表达式定义的函数赋值给变量之后不能提前调用，因为变量不能提前使用，只能声明提前。
- 在ES3和非严格的ES5模式下，函数的调用上下文是全局对象
- 函数调用和方法调用不同，函数调用的上下文是全局对象，方法调用的上下文是调用的对象。
```
function foo(){
	return {
		add:function(){
			console.info('inner add')
			}
		}
}
foo().add()
inner add
```

```
rect.setSize(width,height)
setRectSize(rect,width,height)
```

- 嵌套的函数调用上下文(this)在非严格模式下是全局对象，在严格模式下是undefined
```
var obj = {
	outter:function(){
	console.info(this); 
	function inner(){
	console.info(this)
	} 
	inner()
	}
}
obj.outter();
{outter: ƒ}
Window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
```

- 构造函数的调用上下文对象是初始化的空对象，所以即使使用对象上的某个方法来创建对象，其创建的对象也是基于当前方法创建的空对象
```
var obj = {Add : function(x,y){return x+y}}
var instance = new obj.Add();
instance
Add {}
```

- 构造函数的初始化过程：当调用到new关键字时，会依照当前构造函数创建一个空对象，这个空对象会继承这个构造函数上的prototype属性，之后会执行这个构造函数的语句进行初始化。