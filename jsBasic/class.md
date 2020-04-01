## es6的Class
## class内部是严格模式，全局环境调用class内湖的方法时，this是undefined
## class类不存在变量提升。
和继承有关系，必须保证子类在父类之后定义。
```javascript
new Foo(); // ReferenceError
class Foo {}
// VM13908:1 Uncaught ReferenceError: Foo is not defined
//    at <anonymous>:1:1
```

```javascript
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```
上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

## this指向
1. 类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 `class` 内部是严格模式，所以 `this` 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

**解决方法一：** 在构造函数`constructor`中绑定this
```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

**方法二：**箭头函数
```javascript
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
```
箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。

2. 如果静态方法包含this关键字，这个this指的是类，而不是实例。
```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar(); // hello
```
静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

## static
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
<font color="red">注意：</font>

1. static方法不会被实例继承，但是可以被子类继承。
  父类的静态方法可以被子类继承
  ```javascript
  class Foo {
    // 父类的静态方法
    static classMethod() {
      return 'hello';
    }
  }s

  class Bar extends Foo {}

  // 可以被子类继承，调用
  Bar.classMethod() // 'hello'
  ```
2. 静态方法可以和非静态方法重名。
3. 静态方法也是可以从super对象上调用的。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

### 实现继承