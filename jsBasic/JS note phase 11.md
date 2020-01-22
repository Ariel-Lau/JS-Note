- 数组特性
1. 数组的元素是无类型的
1. 数组是动态的，根据需要进行增减
- 数组的length属性是可以更改的，一旦变为比当前最大值还小，就会删除后面的所有元素
- 数组的元素不能使用delete来删除，这不会改变length，而只是置位undefined.应该使用pop或者更改length属性
- 数组排序
```
function Student(name,age,height){
    this.name=name;
    this.age=age;
    this.height=height
}
var students = [new Student('lifei',20,1.5),new Student('linhu',22,1.6),new Student('Cherry Liu',18,100)]
undefined
> students
[ Student { name: 'lifei', age: 20, height: 1.5 },
  Student { name: 'linhu', age: 22, height: 1.6 },
  Student { name: 'Cherry Liu', age: 18, height: 100 } ]
> students.sort(function(e1,e2){return e1.age-e2.age})
[ Student { name: 'Cherry Liu', age: 18, height: 100 },
  Student { name: 'lifei', age: 20, height: 1.5 },
  Student { name: 'linhu', age: 22, height: 1.6 } ]
> students.sort(function(e1,e2){return e1.name-e2.name})
[ Student { name: 'Cherry Liu', age: 18, height: 100 },
  Student { name: 'lifei', age: 20, height: 1.5 },
  Student { name: 'linhu', age: 22, height: 1.6 } ]
```
- forEach和map的区别
1. forEach没有返回值，它只是遍历数组本身
1. map也是遍历，但是它是拿出数组的每一个元素重新生成一个新的数组，它有返回值(即新的数组)，它不会修改原来的数组
```
> arr
[ 1, 2, 3 ]
> arr.map(function(e){return e=e*2})
[ 2, 4, 6 ]
> arr
[ 1, 2, 3 ]
```
```
> var arr=[1,4,2,5,3,7,6,9,0,8]
undefined
> arr.forEach(function(v,i,a){a[i]=v*v;})// v数组元素的值，i数组索引，a数组名称
undefined
> arr
[ 1, 16, 4, 25, 9, 49, 36, 81, 0, 64 ]
> arr.forEach(function(v,i,a){a[i]*=v;})
undefined
> arr
[ 1, 256, 16, 625, 81, 2401, 1296, 6561, 0, 4096 ]
> arr.forEach(function(v,i,a){a[i]*=a[i];})
undefined
> arr
[ 1, 65536, 256, 390625, 6561, 5764801, 1679616, 43046721, 0, 16777216 ]
> var arr=[1,4,2,5,3,7,6,9,0,8]
undefined
> arr.map(function(x){return x*x})
[ 1, 16, 4, 25, 9, 49, 36, 81, 0, 64 ]
>
```
