# js
### 字符串相关
很多数组有的方法字符串也有，具体可以参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
* 字符串的repeat()方法（String.prototype.repeat()
）：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
* 字符串太长换行可以用反斜杠\换行：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
* 字符串的concat方法，类似数组的concat方法，将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 <font color="red">concat 方法并不影响原字符串。</font>：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/concat
* String.prototype.endsWith()：用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
* String.prototype.includes()判断一个字符串里是否包含其他字符串。
* String.prototype.match()使用正则表达式与字符串相比较。
* String.prototype.padEnd()
在当前字符串尾部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。
* String.prototype.padStart()
在当前字符串头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。
* 一个字符串直接split('')，以空字符串切割可以得到一个数组；一个字符数组通过join('')可以得到一个普通字符串。
  e.g：'lmmmy'.split(''); // ['l', 'm', 'm', 'm', 'y']
  ['l', 'm', 'm', 'm', 'y'].join(''); // lmmmy

* str.substr(start,length)、substring(start,[end])、slice(start,[end])
（1）slice() 第一个参数代表开始位置，第二个参数代表结束位置的下一个位置（即截取只截取到end前一位），截取出来的字符串的长度为第二个参数与第一个参数之间的差；若参数值为负数，则将该值加上字符串长度后转为正值；若第一个参数等于大于第二个参数，则返回空字符串。

（2）substring() 第一个参数代表开始位置，第二个参数代表结束位置的下一个位置（即截取只截取到end前一位）；若参数值为负数，则将该值转为0；两个参数中，取较小值作为开始位置，截取出来的字符串的长度为较大值与较小值之间的差。

（3）substr() 第一个参数代表开始位置，第二个参数代表截取的长度。

* 获取url中的query参数：
    ```
    function getQuery() {
        // 取得查询字符串并去掉开头的问号
        var qs = location.search.length > 0 ? location.search.substring(1) : "",
            // 保存数据的对象
            args = [],
            // 取得每一项
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            // 在for循环中使用
            i = 0,
            len = items.length;
            for(i = 0; i < len; i++) {
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if (name.length) {
                    args[name] = value
                }
            }
        return args;
    }
    ```
  * String.fromCharCode(n) <=> 'z'.charCodeAt() //  String.fromCharCode(122) <=> 'z'.charCodeAt()
  * 字符串可以直接根据下标来找到字符串对应位置的值
    ```
    >'mmloveyy'[5]
    >"e"
    ```

## 函数相关
* 创建一个构造函数时最好写上constructor：
  ```
    function Stu(name) {
        constructor: {
            this.name = name;
        }
    }
    var newStu = new Stu('mm');
    console.log(newStu.name); // mm
  ```
  ```
    // 不写construct的情况也可以正常构造对象
    function Stu(name) {
        this.name = name;
    }
    var newStu = new Stu('mm');
    console.log(newStu.name); // mm
  ```
* 对象也具可以用...展开：
  ```
    var testObjFrom = {
        a: 'mm',
        b: 'yy',
        c: 'zz'
    }
    var afterFrom = {...testObjFrom}; // 展开不会改变原对象，因为testObjFrom、afterFrom都是对象的引用
    console.log('afterFrom', afterFrom); // afterFrom {a: "mm", b: "yy", c: "zz"}
    console.log('testObjFrom', testObjFrom); // testObjFrom {a: "mm", b: "yy", c: "zz"}
    console.log('object.assign', Object.assign({}, {...testObjFrom})); // object.assign {a: "mm", b: "yy", c: "zz"}
  ```

* Object.created(A)：创建一个空对象obj，并且让空对象obj作为A对象所属构造函数的实例（obj._proto_=A）
  ```
  > var obj = Object.create(null)
  > obj
  {}
  ```

*  Object.defineProperty()：可以监听get和set
    Object.defineProperty()，vue的双向数据绑定就是用Object.defineProperty()实现的
    ```
    let obj = {};
    Object.defineProperty(obj, 'name', {
        get: function() {
            console.log('haha');
            return this.value; // this是当前操作的属性，this.value是当前操作属性的value值
        },
        set: function(value) {
            console.log('hehe');
            this.name = value;
        }
    });
    obj.name = '羊羊'; // hehe
    obj.name; // haha
    ```

* console.dir()可以显示一个对象的所有属性和方法，直接dir(obj)也可以
* 
```
    let str = "test regexp";
    [].forEach.call(str, item => {
        console.log(item); // t e s t  r e g e x p
    })
```

### js数组的方法：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
concat可以将值连接到数组

### Set
  ```
  const set = new Set(['foo', 'bar', 'baz', 'foo']);
  undefined
  set
  Set(3) {"foo", "bar", "baz"}[[Entries]]0: "foo"1: "bar"2: "baz"size: (...)__proto__: Set
  typeof set
  "object"
  set[0]
  undefined
  set.size
  3
  ```

### Map
```
const mapper = new Map([['1', 'a'], ['2', 'b']]);

undefined
mapper
Map(2) {"1" => "a", "2" => "b"}
typeof mapper
"object"
mapper.size
2
```
### json()：https://developer.mozilla.org/zh-CN/docs/Web/API/Body/json


# css
* css的repeat()函数：https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat
* css的minmax()函数：https://developer.mozilla.org/zh-CN/docs/Web/CSS/minmax
minmax(min,max)
如果定义的最大值小于最小值，它将会被忽略，函数会被视为只设置了一个最小值。
* css的getBoundingClientRect(): https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
* css动画卡顿：
  ```
  ele.setAttribute('style', 'left: 20px')
    .class
    position: relative;
    left: 0;
    transition: left .5s ease;
```
这样右移20px的动画会卡顿

解决方案：
// 用transform处理动画卡顿
```ele.style.transform = translateX(20px);
    .class:
    transition: transform .5s ease;
```
文章参考：
深入浏览器理解CSS animations 和 transitions的性能问题：https://blog.csdn.net/leer168/article/details/25917093
 css动画卡顿解决方案：https://segmentfault.com/a/1190000006708777
 * iphoneX刘海屏的问题：
    添加viewport-fit=cover meta标签，使页面占满整个屏幕。
    跳出了安全区域的框框之后，第二步当然需要设置动态的边距来避开屏幕圆角、顶部传感器以及虚拟指示条，IOS11 提供了一个新的 css 变量——constant(safe-area-inset-※)。
    constant(safe-area-inset-*) 提供了四个方向的值：
    constant(safe-area-inset-top)：在 Viewport 顶部的安全区域内设置量。
    constant(safe-area-inset-bottom)：在 Viewport 底部的安全区域内设置量。
    constant(safe-area-inset-left)：在 Viewport 左边的安全区域内设置量。
    constant(safe-area-inset-right)：在 Viewport 右边的安全区域内设置量。

* viewport
* css的width具有类似继承的性质，height则无这种性质；内联元素不可以继承width属性，因为行内元素不能设置宽高，块级元素可以。
  参考：https://blog.csdn.net/nqxcwl/article/details/102879722
* position: sticky
  https://developer.mozilla.org/zh-CN/docs/Web/CSS/position
* background-clip  设置元素的背景（背景图片或颜色）是否延伸到边框下面：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip
* grid布局：http://houdunren.gitee.io/note/css/11%20%E6%A0%85%E6%A0%BC%E7%B3%BB%E7%BB%9F.html#%E6%A0%85%E6%A0%BC%E4%BB%8B%E7%BB%8D
* 浏览器元素的outerHeight\outerWidth\offset().top偏移等
  ```
  $(window).outerHeight; // 整个浏览器的高度
  let imgEle = $('.imgBox');
  imgEle.offset().top; // body离元素上边距离
  imgEle.outerHeight; // imgEle元素的高度
  ```
* 浏览器的onload、onready、scroll等事件

## 关于window中的一些高度、宽度等的概念
一个页面的展示，从外到内的容器：屏幕 -> 浏览器 -> 页面
HTML元素展现在页面内，页面展现在浏览器内，而浏览器展现在屏幕内。
### 整体展示：
![](./imgs/wh1.jpg)

### 屏幕信息：
![](./imgs/screeninfo.jpg)
`screen.height`：屏幕高度。
`screen.width`：屏幕宽度。
`screen.availHeight`：屏幕可用高度。即屏幕高度减去上下任务栏后的高度，可表示为软件最大化时的高度。
`screen.availWidth`：屏幕可用宽度。即屏幕宽度减去左右任务栏后的宽度，可表示为软件最大化时的宽度。
`任务栏高/宽度` ：可通过屏幕高/宽度 减去 屏幕可用高/宽度得出。如：`任务栏高度 = screen.height - screen.availHeight`。

### 浏览器信息
![](./imgs/browserinfo.jpg)
`window.outerHeight`：浏览器高度。
`window.outerWidth`：浏览器宽度。
`window.innerHeight`：浏览器内页面可用高度；此高度包含了水平滚动条的高度(若存在)。可表示为：浏览器当前高度去除浏览器边框、工具条后的高度。
`window.innerWidth`：浏览器内页面可用宽度；此宽度包含了垂直滚动条的宽度(若存在)。可表示为：浏览器当前宽度去除浏览器边框后的宽度。
`工具栏高/宽度`：包含了地址栏、书签栏、浏览器边框等范围。如：高度，可通过浏览器高度 - 页面可用高度得出，即：`window.outerHeight - window.innerHeight`。

### 页面信息
![](./imgs/pageinfo.jpg)
`body.offsetHeight`：body总高度。
`body.offsetWidth`：body总宽度。
`body.clientHeight`：body展示的高度；表示body在浏览器内显示的区域高度。
`body.clientWidth`：body展示的宽度；表示body在浏览器内显示的区域宽度。
`滚动条高度/宽度`：如高度，可通过浏览器内页面可用高度 - body展示高度得出，即`window.innerHeight - body.clientHeight`。