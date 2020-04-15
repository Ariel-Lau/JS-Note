1.
/* 判断2个对象全等
foo1 = {
        a: 1,
        b: '1',
        c: NaN,
        d: [{
            a: 1
        }],
        f: {
            a: 1
        }
    }
foo2 = {
        a: 1,
        b: '1',
        c: NaN,
        d: [{
            a: 1
        }],
        f: {
            a: 1
        }
    }

*/
function isEqual(o1, o2) {
    if (typeof o1 !== 'object' || typeof o2 !== 'object') {
        if (o1 === o2) {
            return true;
        } else {
            return false;
        }
    }
    let res = false;
    for (let props in o1) {
        if (o2[props]) {
            if (Array.isArray(o2[props]) && Array.isArray(o1[props])) {
                for (let i = 0; i < o2[props].length; i++) {
                    let o1Idx = o1[props].indexOf(o2[props][i]);
                    if (o1Idx !== -1) {
                        if (typeof o2[props][i] === 'object' || typeof o1[props][o1Idx] === 'object') {
                            res = isEqual(o2[props][i], o1[props][o1Idx]);
                        }
                        if (typeof o2[props][i] !== 'object') {
                            res = o2[props][i] === o1[props][o1Idx];
                        }
                    }
                }
                o2[props].forEach(ele => {
                    res = isEqual(ele, o1[props]);
                });
            }

            if (!(o2[props] instanceof Object)) {
                if (o2[props] === o1[props]) {
                    res = true;
                }
            }
            if (o2[props] instanceof Object || o1[props] instanceof Object) {
                res = isEqual(o2[props], o1[props]);
            }
        }
    }
    return res;
}


// function isEqual(o1, o2) {
//     return JSON.stringify(o1) === JSON.stringify(o2);
// }

let foo1 = {
    a: 1,
    b: '1',
    c: NaN,
    d: [{
        a: 1
    }],
    f: {
        a: 1
    }
}
let foo2 = {
    a: 1,
    b: '1',
    c: NaN,
    d: [{
        a: 1
    }],
    f: {
        a: 1
    }
}

console.log(isEqual(foo1, foo2));


// 用js代码实现下面的二叉树, 并写一个函数打印出先序深度优先遍历结果
//                   a
//                 /   \
//                b     c
//               / \     \
//              d   e     f
function BinTree(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
}

let f = new BinTree('f', null, null);
let e = new BinTree('e', null, null);
let d = new BinTree('d', null, null);
let c = new BinTree('c', null, f);
let b = new BinTree('b', d, e);
let a = new BinTree('a', b, c);

console.log(a);

// 深度优先搜索就是先序遍历
function walkTree(root) {
    if (!root) {
        console.log('this is an empty tree!');
        return;
    }
    let queue = [];
    queue.push(root);
    while (queue.length) {
        let tmpNode = queue.shift();
        console.log(tmpNode.value);
        if (tmpNode.left) {
            walkTree(tmpNode.left);
        }
        if (tmpNode.right) {
            walkTree(tmpNode.right);
        }
    }
}

walkTree(a);


// 实现 debounce 函数来进行函数节流。
function debounce(fn, imme, delay) {
    let timer = null;
    return (...args) => {
        if (imme && timer === null) {
            fn(...args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
}

function test() {
    console.log(1);
}

document.querySelector('body').addEventListener('click', debounce(test, false, 1000));

// 2面
/*
给定一个整数数组`nums`和一个目标值`target`，
请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
*/

const nums = [2, 11, 7, 15]
const target = 9;

// [0, 2]
// console.log(twoSum(nums, target));
// function arrSum(nums, target){
//     let i = 0;
//     while(i < nums.length - 1){
//         let res = target - nums[i];
//         if(nums.slice(i+1).indexOf(res) !== -1){
//             return [i, nums.indexOf(res) + i];
//         }
//         else {
//             i++;
//         }
//     }
//     return -1;
// }

// console.log(arrSum(nums, target));

function arrSum(nums, target){
    let obj = {};
    let i = 0;
    for(let j = 0; j < nums.length; j++){
        let res = target - nums[i];
        obj[nums[j]] = j;
        if(obj[res]){
            return [i, obj[res]]
        }
    }
    return -1;
}

console.log(arrSum(nums, target));

var nums = [2, 11, 7, 15]
var target = 9;

function arrSum(nums, target){
    let obj = {};
    for(let j = 0; j < nums.length; j++){
        if(obj[target - nums[j]] || obj[target - nums[j]] === 0){
            return [j, obj[target - nums[j]]];
        }
        else {
            obj[nums[j]] = j;
        }
    }
    return -1;
}

console.log(arrSum(nums, target));

function arrSum(arr, target){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = i+1; j<arr.length; j++){
            if(arr[i] + arr[j] === target){
                return [i, j];
            }
        }
    }
    return -1;
}

var nums = [2, 11, 7, 15]
var target = 9;
console.log(arrSum(nums, target));

