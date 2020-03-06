### 1.slice
使用slice直接copy一个字符串
```
let str1 = 'mmloveyy';
let str2 = str1.slice();
console.log(str2); // 'mmloveyy'
console.log(str1); // 'mmloveyy'
```

### 2.字符串可以直接使用下标索引
```
console.log('mmloveyy'[5]); // e
```

### 3.split
1. 字符串变数组可以这么做
注意：这种处理不是很健壮，存在浏览器兼容性问题，可以看MDN中的String
```
let str1 = 'mmloveyy';
let arr1 = str1.split('');
console.log(arr1); // ["m", "m", "l", "o", "v", "e", "y", "y"]
```

或者
```
console.log(Array.from('foo')); // Array ["f", "o", "o"]
```

2. 反转字符串
```
let str1 = 'mmloveyy';
// 这种处理方式不是很健壮
let newStr = str1.split('').reverse().join(''); 
```

3. split可以使用一个数组来作为分隔符
```
const myString = 'this|is|a|Test';
const splits = myString.split(['|']);

console.log(splits); //["this", "is", "a", "Test"]

const myString = 'ca,bc,a,bca,bca,bc';

const splits = myString.split(['a','b']); 
// myString.split(['a','b']) is same as myString.split(String(['a','b'])) 

console.log(splits);  //["c", "c,", "c", "c", "c"]
```

