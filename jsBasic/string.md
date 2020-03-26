### 1.slice
使用slice直接copy一个字符串
```javascript
let str1 = 'mmloveyy';
let str2 = str1.slice();
console.log(str2); // 'mmloveyy'
console.log(str1); // 'mmloveyy'
```

### 2.字符串可以直接使用下标索引
```javascript
console.log('mmloveyy'[5]); // e
```

### 3.split
1. 字符串变数组可以这么做
注意：这种处理不是很健壮，存在浏览器兼容性问题，可以看MDN中的String
```javascript
let str1 = 'mmloveyy';
let arr1 = str1.split('');
console.log(arr1); // ["m", "m", "l", "o", "v", "e", "y", "y"]
```

或者
```javascript
console.log(Array.from('foo')); // Array ["f", "o", "o"]
```

2. 反转字符串
```javascript
let str1 = 'mmloveyy';
// 这种处理方式不是很健壮
let newStr = str1.split('').reverse().join(''); 
```

3. split可以使用一个数组来作为分隔符
```javascript
const myString = 'this|is|a|Test';
const splits = myString.split(['|']);

console.log(splits); //["this", "is", "a", "Test"]

const myString = 'ca,bc,a,bca,bca,bc';

const splits = myString.split(['a','b']); 
// myString.split(['a','b']) is same as myString.split(String(['a','b'])) 

console.log(splits);  //["c", "c,", "c", "c", "c"]
```

### `replace`

传给`replace()`的第二个参数可以是一个function
函数的返回值作为替换字符串。如果在函数中没有返回值，则会以`undefined`替换匹配到的子串

| 变量名 | 代表的值 |
| -- | -- |
| `match` | 匹配的子串。（对应于上述的$&。） |
| `p1,p2, ...` | 假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。 |
| `offset` | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1） |
| `string` | 被匹配的原字符串。 |
| `NamedCaptureGroup` | 命名捕获组匹配的对象，即正则匹配的具名分组捕获的对象 |

```javascript
str.replace(reg, function(match, p1, p2, ... , offset, string, NamedCaptureGroup){
    return ...;
})
```

```javascript
var str = 'java-script-study';
var reg = /\-(\w)/g; // \w 数字、字母、下划线
// arr即是匹配到的子串，-s -s，letter是分组1捕获到的内容 s s
// 匹配到的子串是整个字符串匹配整个正则匹配到的子串，分组捕获到的是指括号()中的正则捕获的内容
str = str.replace(reg, function(match, p1, offset, string, NamedCaptureGroup){
    // 函数返回值replace掉正则匹配到的子串，即用S替换调-s
    console.log(match);
    console.log(p1);
    console.log(offset);
    console.log(string);
    console.log(NamedCaptureGroup);
});
// -s
// s
// 4
// java-script-study
// undefined
// -s
// s
// 11
// java-script-study
// undefined

// "javaundefinedcriptundefinedtudy" // 因为function没有返回，所以返回是undefined，替换后的字符串就变成undefined替换掉了-s
```



下划线转驼峰
```javascript
var str = 'java-script-study';
var reg = /\-(\w)/g; // \w 数字、字母、下划线
// arr即是匹配到的子串，-s -s，letter是分组1捕获到的内容 s s
// 匹配到的子串是整个字符串匹配整个正则匹配到的子串，分组捕获到的是指括号()中的正则捕获的内容
str = str.replace(reg, function(arr, letter){
    // 函数返回值replace掉正则匹配到的子串，即用S替换调-s
    return letter.toUpperCase();
});
console.log(str); // "javaScriptStudy"
```

