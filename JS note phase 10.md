- 原型
1. 对象直接量的原型是Object.prototype
1. 通过函数创建的对象的原型是函数的prototype
##需要注意的是对象本身没有prototype这个属性##

```
> var obj ={}
undefined
> Object.getPrototypeOf(obj)
{}
> Object.getPrototypeOf(obj)===Object.prototype
true

> var f = new F()
undefined
> Object.getPrototypeOf(f)===F.prototype
true
> f.constructor ===F
true
> F.prototype === f.constructor.prototype
true
> Object.getPrototypeOf(f)===f.constructor.prototype
true

> f.prototype
undefined
```
- 类属性（类属性是用来区分对象的类型，是一个字符串）
- 获取类属性的方式：
```
function classOf(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    Object.prototype.toString.call(o).slice(8,-1);
}
```
- 通过对象直接量或者Object.create()或者**自定义对象的类属性为Object**
```
> function F(){}
undefined
> var f = new F()
> classOf(f)
'Object'
```

- 对象的定义可扩展性有三种方式
1. Object.preventExtensions() 它定义当前对象不可新增属性，但是原型上新增的属性同样会继承下来，同时对象本身已有的属性可以进行配置
1. Object.seal() 它会定义当前对象不可新增属性，且当前所有属性的configurable为false，但是writable还是保持原值
1. Object.freeze() 它在上面定义的基础上新增所有的属性为只读属性，包括writable设为false，但是setter属性不变。