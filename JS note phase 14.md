# 原型与类：
```
function inherit(p){
    function F(){};
    F.prototype=p;
    return new F();
}

function range(from,to){
    var r=inherit(range.methods);
    r.from= from;
    r.to= to;
    return r;
}

range.methods = {
    includes:function(x){
        return this.from<=x&&x<=this.to;
    },
    foEach:function(f){
        for(var i= Math.ceil(this.from);i<this.to;i++){f(i)}
    },
    toString:function(){
        return "from:"+this.from+"to:"+this.to;
    }
}
```
# 构造函数与类：原型对象是类的唯一标识，而不是构造函数。构造函数是类的公共标识，但是原型对象是类的唯一标识
```
function Range(from, to){
    this.from=from;
    this.to=to
}
Range.prototype={
    include:function(x){
        return this.from<=x&&this.to>=x
    },
    forEach:function(f){
        for(var i = Math.ceil(this.from);i<this.to;i++)
        f(i)
    },
    toString:function(){
        return "from:"+ this.from+" to:"+this.to
    }
}
```
这两个构造函数都继承自同一个原型对象，但是他们有各自的构造函数。用两个构造函数实例化的对象都指向同一个原型对象。
```
function Student(){}
undefined
> var obj = {a:1,b:2}
undefined
> Student.prototype=obj
{ a: 1, b: 2 }
> function Teacher(){}
undefined
> Teacher.prototype=obj
{ a: 1, b: 2 }
> var stu= new Student()
undefined
> stu.a
1
> stu.b
2
> var tea= new Teacher()
undefined
> tea.a
1
> tea.b
2
> typeof stu
'object'
> typeof tea
'object'
> Object.getPrototypeOf(stu)
{ a: 1, b: 2 }
> Object.getPrototypeOf(tea)
{ a: 1, b: 2 }
```
# instanceOf检查机制
> obj instanceOf Range

它并不是检查obj的构造函数是不是Range，而是检查obj是不是继承自Range.prototype

# 实例方法，属性；类方法，属性；构造函数方法，属性
```
// 实例方法，属性
function Student(name,age){
    this.name=name;
    this.age=age
}
// 类方法，属性
Student.prototype={
    man:false,
    speak:function(){
        console.info(this.name)
    },
    constructor:Student
}
// 构造函数方法，属性
Student.play=function(){
    console.info('play')
}
