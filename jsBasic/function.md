## 尾调用：指某个函数的<font color="red">最后一步</font>是调用另一个函数
尾调用
```
function f(x){
  return g(x);
}
```

以下都不是尾调用
```
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}

// 情况三等价于下面的写法
function f(x){
  g(x);
  return undefined;
}
```

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```
函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

### 尾调用的意义
“尾调用优化”（Tail call optimization）：即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

### 注意：只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
```
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```
上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。