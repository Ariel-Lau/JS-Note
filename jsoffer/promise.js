// 手写promise
class MyPromise() {
    // 构造器
    constructor(executor) {
        // 初始化state为等待状态
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        // 成功存放的数组
        this.onResolvedCbs = [];
        // 失败存放的数组
        this.onRejectedCbs = [];
        // 成功
        let resolve = value => {
            // state改变，resolve调用就会失败
            if (this.state === 'pending') {
                // resolve调用之后，state转化为fulfilled成功状态
                this.state = 'fulfilled';
                // 存储成功的值
                this.value = value;
                // 一旦resolve执行，调用成功数组的函数
                this.onResolvedCbs.forEach(fn => fn());
            }
        };
        // 失败
        let reject = reason => {
            // state改变，reject调用就会失败
            if (this.state === 'pending') {
                // reject调用之后，state转化为rejected失败状态
                this.state = 'rejected';
                // 存储失败的原因
                this.reason = reason;
                // 一旦reject执行，调用失败数组的函数
                this.onRejectedCbs.forEach(fn => fn());
            }
        };
        // 如果executor执行报错，直接reject
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // then方法有两个参数onFulfilled、onRejected
    then(onFulfilled, onRejected) {
        // onFulfilled，onRejected都是可选参数，如果他们不是函数，必须被忽略，所以需要单独判断处理
        // onFulfilled如果不是函数，则忽略onFulfilled，直接返回value，例如onFulfilled是普通值，直接在函数中返回普通值，注意onFulfilled一定得是function
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        // onRejected如果不是函数，则忽略onRejected，直接抛出错误
        // 如果onRejected不是一个函数，则需要返回一个函数并抛出错误，注意onRejected一定得是function
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };
        // 声明返回的promise2
        let promise2 = new MyPromise((resolve, reject) => {
            // 状态为fulfilled，执行onFulfilled，传入成功的值
            if (this.state === 'fulfilled') {
                // 异步
                // onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
                setTimeout(() => {
                    // try catch处理onFulfilled和resolvePromise可能出现的报错异常
                    try {
                        // 如果onFulfilled或onRejected报错，则直接返回reject()
                        let x = onFulfilled(this.value);
                        // resolvePromise函数，处理自己return的promise和默认的promise2的关系，让不同的promise相互套用
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            // 状态为rejected，执行onRejected，传入失败的原因
            if (this.state === 'rejected') {
                // 异步
                setTimeout(() => {
                    // try catch处理报错异常
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            // 当状态state为pending时
            if (this.state === 'pending') {
                // onFulfilled传入到成功数组onResolvedCbs
                this.onResolvedCbs.push(() => {
                    // 异步
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                // onRejected传入到失败数组onRejectedCbs
                this.onRejectedCbs.push(() => {
                    // 异步
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }
        });
        // 返回promise，完成链式
        return promise2;
    }
}

//resolve方法
MyPromise.resolve = function(val){
    return new MyPromise((resolve, reject)=>{
      resolve(val)
    });
}
//reject方法
MyPromise.reject = function(val){
    return new MyPromise((resolve, reject)=>{
        reject(val)
    });
}

/**
 * 首先，要看x是不是promise。
 * 如果是promise，则取它的结果，作为新的promise2成功的结果
 * 如果是普通值，直接作为promise2成功的结果
 * 所以要比较x和promise2
 * resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
 * resolve和reject是promise2的
 * 
 * x 不能是null
 * x 是普通值 直接resolve(x)
 * x 是对象或者函数（包括promise），let then = x.then
 * 2、当x是对象或者函数（默认promise）
 * 声明了then
 * 如果取then报错，则走reject()
 * 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
 * 如果成功的回调还是pormise，就递归继续解析
 * 3、成功和失败只能调用一个 所以设定一个called来防止多次调用
 */

function resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    if(x === promise2){
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') { 
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e); 
      }
    } else {
      resolve(x);
    }
  }
  
 