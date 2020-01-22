- 对in操作符的理解
 1. 如果是for in，那么只会遍历出可枚举的属性，但是继承的不可枚举属性是不会被遍历出来(默认的对象继承方法（内置方法）都是不可枚举的)
 1. 如果用in操作符来判断某个属性是否存在于某个对象中，即使是继承下来的属性或者方法，也会返回true
```
var obj = {x:1}
> console.info('toString' in obj)
true
```
- 使用hasOwnProperty方法来判断对象是否具有某个属性（对于继承下来的属性会返回false）
```
> obj
{ x: 1 }
> obj.hasOwnProperty('x')
true
> obj.hasOwnProperty('toString')
false
```
- propertyIsEnumerable方法大体上和hasOwnProperty表现一致（只有当是自有属性，同时该属性是可配置时才返回true）
```
> obj
{ x: 1 }
> obj.propertyIsEnumerable('x')
true
```
**该理解可能有问题**
- 当对象的其中一个属性的值为undefined的情况，表明该属性的key已经定义，但是值还没有定义
```
> var obj ={x:1}
undefined
> obj.y
undefined
> obj
{ x: 1 }
> obj.y=undefined
undefined
> obj
{ x: 1, y: undefined }
> 'y' in obj
true
```
___