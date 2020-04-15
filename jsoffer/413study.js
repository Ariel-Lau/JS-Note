// 实现(5).add(3).add(2)

// 实现字符串的大小写转换
let str = '测试CshAHa!';
let newStr = str.replace(/[a-zA-Z]/g, ele => {
    return ele.toUpperCase() === ele ? ele.toLowerCase() : ele.toUpperCase();
});
console.log(newStr);


// 字符串S中寻找字符串T
function searchT(s, t) {
    let lenS = s.length;
    let lenT = t.length;
    let res = -1;
    if (lenS < lenT) {
        return -1;
    }
    for (let i = 0; i < lenS - lenT + 1; i++) {
        if (s.substr(i, lenT) === t) {
            res = i;
            break;
        }
    }
    return res;
}

console.log(searchT('nshdgdaadeq', 'dgda'));

// 利用对象属性唯一的特性实现数组去重
function unique(arr) {
    let obj = {};
    for (let i of arr) {
        obj[i] = true;
    }
    // 注意用Object.keys()返回无重复的数组时会出现元素顺序调整的情况，这个和Object.keys()遍历对象的属性顺序有关系
    // 如果不想改变顺序的话可以用for in遍历对象的可枚举属性，但是需要注意用for in 来判断需要在判断下是否是对象自身的可枚举属性hasOwnProperty()
    // for in遍历对象的可枚举属性，包括继承的可枚举属性
    return Object.keys(obj);
}
console.log(unique(['m', 'm', 4, 8, 6, 4])); // ["4", "6", "8", "m"]

// 按对象的属性排序
var people = [{
        name: 'Alice',
        age: 21
    },
    {
        name: 'Max',
        age: 20
    },
    {
        name: 'Jane',
        age: 20
    }
];

function groupBy(objectArray, property) {
    return objectArray.reduce((last, obj) => {
        let key = obj[property];
        if (!last[key]) {
            last[key] = [];
        }
        last[key].push(obj);
        // 注意要将lastreturn出去
        return last;
    }, {});
}

console.log(groupBy(people, 'age'));

// 防抖
function debounce(fn, imme, delay) {
    let timer = null;
    return (...args) => {
        if (imme && timer === null) {
            fn(...args);
        }
        clearTimeout(timer);
        timer = setTimeout(args => {
            fn(...args);
            timer = null;
        }, delay, args);
    };
}

// 节流
function throttle(fn, delay) {
    let pre = Date.now();
    let that = this;
    return (...args) => {
        let now = Date.now();
        if (now - pre >= delay) {
            fn.call(that, ...args);
            pre = Date.now();
        }
    };
}

// 洗牌算法：时间复杂度：O(n)
// 思路：http://www.fly63.com/article/detial/5005
// 从最后一个元素开始随机和其他元素交换顺序
// 方法1：直接在原数组上交换元素的顺序
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // 注意这里随机的数要用Math.floor()取整，
        let swapIdx = Math.floor(Math.random() * (i - 1));
        [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
    }
}

let arr = [1, 2, 3, 4, 5, 6];
shuffle(arr);
console.log(arr); // 随机顺序 [4, 6, 1, 5, 2, 3]

// 方法2：开辟新的数组空间
function shuffle(arr) {
    let newArr = [];
    while (arr.length) {
        let swapIdx = Math.floor(Math.random() * (arr.length - 1));
        // 注意splice返回的是一个数组，所以获取数组元素需要通过[0]获取到具体的元素
        newArr.push(arr.splice(swapIdx, 1)[0]);
    }
    return newArr;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));