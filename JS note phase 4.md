# 关于全局对象
- 定义变量时尽量使用var，不然变量会定义到全局变量上(window)
- 定义变量时注意不要覆盖全局变量上的属性（var Document除外）
- JS开始执行的作用域就是全局作用域

# 包装对象
- JS对象的属性和函数之间的区别不是很明显，可以相互改变
```
> var str=new String("abc")
undefined
> typeof str
'object'
> var str ="abc"
undefined
> typeof str
'string'
```
- 包装对象是针对基础类型(number,string,boolean)而说的对象(Number,String, Boolean)。基本类型没有方法，但是其包装类型是有方法和属性的。包装对象和基本类型之间的转换是通过new+构造函数来完成的。
- 一旦包装对象使用完成，就会自动转换成基本类型
```
> var str="abc"
undefined
> typeof str
'string'
> str.indexOf("a")
0
> typeof str
'string'

> var s ="abc"
undefined
> s.len=2
2
> s.len
undefined
```
- 基本类型都是不可变类型，你可以重新赋值，但是不能使值本身发生改变。原始值（null，undefined，数字，字符串，布尔）是不可更改的。
```
> "str"==new String("str")
true
"str"===new String("str")
false
```
- JS中的值比较(如果是基本类型，就是值比较，如果是引用类型，就是内存中的引用比较)
```
> 1==1
true
> new Number(1)==new Number(1)
false
```
- 当使用Object来包装基本类型值时会自动转换成其对应的基本类型
```
> var a = new Object(1)
undefined
> a
[Number: 1]
```