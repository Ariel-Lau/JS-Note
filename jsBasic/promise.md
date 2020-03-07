# Promise
内容摘自MDN和《ES6入门》
# 语法
```
new Promise( function(resolve, reject) {...} /* executor */  );
```
`Promise.length`：length属性，其值总是为 1 (构造器参数的数目)。

# Promise的几种状态

`pending`: 初始状态，既不是成功，也不是失败状态。
`fulfilled`: 意味着操作成功完成。
`rejected`: 意味着操作失败

# 链式调用：.then()
1. 因为 Promise.prototype.then 和  Promise.prototype.catch 方法返回 一个全新的 Promise 对象， 所以它们可以被链式调用。
2. Promise的链式调用可以优化以前的函数回调地狱问题
3. 通常，一遇到异常抛出，Promise 链就会停下来，直接调用链式中的 catch 处理程序来继续当前执行。

# Promise.resolve()、Promise.reject()

### Promise.reject()
    返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法。
    即：
    Promise.reject()方法返回一个带有拒绝原因的Promise对象。

### Promise.resolve(value)
`Promise.resolve(value)`方法返回一个以给定值解析后的Promise 对象。
* 如果该值为promise，返回这个promise；
* 如果这个值是thenable（即带有"then" 方法)），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
* 否则返回的promise将以此值完成。
* 此函数将类promise对象的多层嵌套展平。
* 需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```
上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

# Promise.all()、Promise.race()
### Promise.all()
**作用：**常见于处理多个请求并发执行
`Promise.all(iterable)` 方法返回一个新的 Promise 实例（对象）。
此实例（对象）在 iterable 参数对象内所有的 promise对象 `都“完成（成功）（resolved）”`或`参数中不包含 promise `时回调`完成（resolve）`，这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，`顺序跟iterable的顺序保持一致`；
一旦有任何一个iterable里面的 promise 对象失败（rejected），此实例回调失败（reject），`失败原因是第一个失败 promise 的结果`，即它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。

Promise.all方法常被用于处理多个promise对象的状态集合。

**返回值：**
* 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise。
**注意：**Promise.all `当且仅当` 传入的可迭代对象为空时为同步。
* 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise。
* 其它情况下返回一个处理中（pending）的Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败。返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。

**完成（Fulfillment）状态的返回值：**
* 如果传入的可迭代对象为空，Promise.all 会同步地返回一个已完成（resolved）状态的promise。
* 如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。
* 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。

**失败/拒绝（Rejection）状态的返回值：**
* 如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。

### Promise.race(iterable)
一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
即：
当iterable参数里的`任意一个子promise`被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。

* race 函数返回一个 Promise，它将与`第一个`传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于`第一个`完成的方式是两个中的哪个。
* 如果`传的迭代是空的`，则`返回的 promise 将永远等待`。

* 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

可以用setTimeout测试race()

# Async/Await
async/await的目的是简化使用多个 promise 时的同步行为，并对一组 Promises执行某些操作。正如Promises类似于结构化回调，async/await更像结合了generators和 promises。

## Await
* await 表达式会暂停当前 `async function` 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。

* 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

* 另外，如果 await 操作符后的表达式的值`不是一个 Promise，则返回该值本身`。

* 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
```
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

如果希望即使前一个异步操作失败，也不要中断后面的异步操作。
方法一：
可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。因为第一个await的异常被catch了，所以不会阻塞后面的代码继续执行。

```
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```

方法二：
await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

```
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

## 错误处理
难点是错误处理机制：
async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
```
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
```

## 使用注意点
1. 最好把await命令放在`try...catch`代码块中
2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
   同时触发的写法：
   ```
   // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);

    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
   ```

   而不是以继发的形式写，如下：
   ```
   let foo = await getFoo();
   let bar = await getBar();
   ```
3. async 函数可以保留运行堆栈。（参看：https://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/async）