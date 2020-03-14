# 正则表达式
用来处理字符串的规则
* 只能处理字符串
* 它是一个规则：可以验证字符串是否符合某个规则（test：reg.test(str)），也可以把字符串中符合规则的内容捕获到(exec:reg.exec(str);match: str.match(reg))。

## 编写正则表达式
创建方式有两种
（1）字面量创建方式（两个斜杠之间包起来的，都是用来描述规则的元字符）
```javascript
let reg1 = /\d+/;
```
(2) 构造函数模式创建，两个参数：元字符字符串，修饰符字符串
```javascript
let reg2 = new RegExp("\\d+"); // \需要转译
console.log(regs); // /\d+/  这是匹配数字的正则表达式
// 如果不转义\的话
let reg3 = new RegExp("\d+");
console.log(reg3); // /d+/  这是匹配1-多个d的正则表达式
```

正则表达式由两部分组成
* 元字符
* 修饰符

常用的元字符：
1. 量词元字符：设置出现的次数
   `*`： 0～多次
   `+`：1～多次
   `?`：0次或1次
   `{n}`：出现n次
   `{n,}`：出现n到多次
   `{n,m}`：出现n到m次
2. 特殊元字符：单个或者组合在一起代表特殊的含义
   `\`  转义字符（普通——>特殊——>普通）
   `.`  除\n（换行符）以外的任意字符
   `^`  以哪一个元字符作为开始，如果`^`放在`[]`中，表示 "非"...
   `$`  以哪一个元字符作为结束
   `\n` 换行符
   `\d` 0~9之间的一个数字
   `\D` 非0~9之间的一个数字（大写和小写的意思是相反的）
   `\w` 数字、字母、下划线中的任意一个字符，`[^\w]`除了字母、数字、下划线之外的任意字符，可用来判断特殊符号
   `\s` 一个空白字符(包含空格、制表符、换页符等)
   `\t` 一个制表符（一个TAB键：四个空格）
   `\b` 匹配一个单词的边界
   `x|y` x或者y中的一个字符
   `[xyz]` x或y或z中的一个字符 e.g: [xy,z] xy,z中的任意一个字符
   `[^xy]` 除了x、y以外的任意字符
   `[a-z]` 指定a-z这个范围中的任意字符 e.g: [0-9a-zA-Z_] 0-9或者a-z或者A-Z或者_中的任意一个字符  ( === \w 数字、字母、下划线中的任意一个字符)
   `[^a-z]` 非指定a-z这个范围中的任意字符（上一个的取反“非”）
   `()` 正则中的分组符号
   `(?:)` 只匹配不捕获
   `(?=)` 正向预查
   `(?!)` 负向预查

3. 普通元字符：代表本身含义的
   `/mm/` 此正则匹配的就是mm

常用的修饰符：`img`
`i` =>ignoreCase 忽略单词大小写匹配
`m` => multiline 可以进行多行匹配
`g` => global 全局匹配
`u`
`y`

## 元字符详细解析
`^ $`
(1) `^/$`两个都不加：字符串中包含符合规则的内容即可
`let reg1 = /\d+/;` // 只要有数字就可以匹配到
(2)`^/$`两个都加：字符串只能是和规则一致的内容
`let reg2 = /^\d+$/;` // 需要以数字开头以数字结尾的字符串才能匹配到
(3) e.g: 验证手机号码（11位，第一个数字是1即可）
`let reg = /^1\d{10}$/` // 必须以1开头，以数字结尾

`\`转义字符
```javascript
    > let reg = /^2.3$/; // . 不是小数点，是除\n外的任意字符
    > console.log(reg.test("2.3"));
    true
    > console.log(reg.test("23")); // 没有特殊字符，.表示除\n以外的任意字符
    false
    undefined
    > console.log(reg.test("2@3"));
    true
    undefined
    > console.log(reg.test("2,3"));
    true
```
```javascript
    > reg = /^2\.3$/; // 基于转义字符，让其只能代表小数点
    > console.log(reg.test("2,3"));
    false
    > console.log(reg.test("2.3"));
    true
```
```javascript
    // 如果要匹配\d的字符串，需要将\d转义，因为\d本身是元字符，有特殊意义
    let str = "\d";
    reg = /^\d$/; // \d代表0-9的数字
    console.log(reg.test(str)); // false
    reg = /^\\d$/; // \把特殊符号转义为普通字符
    console.log(reg.test("\\d")); // true
```

`x|y`

```javascript
    > let reg3 = /^18|29$/; // 以18开头，或者以29结尾
    > console.log(reg3.test("18"));
    true
    > console.log(reg3.test("29"));
    true
    > console.log(reg3.test("129"));
    true
    > console.log(reg3.test("189"));
    true
    > console.log(reg3.test("1829"));
    true
    > console.log(reg3.test("829"));
    true
    > console.log(reg3.test("182"));
    true
    > console.log(reg3.test("82"));
    false
```
* 直接x|y会存在很乱的优先级问题，一般我们写的时候都伴随着小括号进行分组，因为小括号改变处理的优先级 => 小括号：分组
```javascript
    > reg3 = /^(18|29)$/; // 以18开头结尾或以29开头结尾，只能是18或29中的一个了
    > console.log(reg3.test("18"));
    true
    > console.log(reg3.test("29"));
    true
    > console.log(reg3.test("129"));
    false
    > console.log(reg3.test("189"));
    false
    > console.log(reg3.test("1829"));
    false
    > console.log(reg3.test("829"));
    false
    > console.log(reg3.test("182"));
    false
    > console.log(reg3.test("82"));
    false
```

`[]`
(1) 中括号中出现的字符一般都代表本身的含义
```javascript
// @或+中的任意一个或多个字符
let reg4 = /^[@+]+$/; // 以一个或多个 @开头结尾 或 +开头结尾的字符串
console.log(reg4.test("@@")); // true
console.log(reg4.test("@+")); // true
// @或+中的任意一个字符
> reg4 = /^[@+]$/;
> console.log(reg4.test("@"));
true
> console.log(reg4.test("+"));
true
> console.log(reg4.test("@@"));
false
> console.log(reg4.test("@+"));
false
```

```javascript
reg4 = /^[\d]$/; // \d在中括号中还是0-9
console.log(reg4.test("d")); // false
console.log(reg4.test("\\")); // false
console.log(reg4.test("9")); // true

reg4 = /^[\\d]$/; // \对\d进行转义，匹配\d这个字符串
console.log(reg4.test("d")); // true
console.log(reg4.test("\\")); // true
console.log(reg4.test("9")); // false
```

(2)中括号中不存在多位数
```javascript
reg4 = /^[18]$/;
console.log(reg4.test("1")); // true
console.log(reg4.test("8")); // true
console.log(reg4.test("18")); // false
```

```javascript
reg4 = /^[10-29]$/; // 1或者0-2或者9
console.log(reg4.test("1")); // true
console.log(reg4.test("9")); // true
console.log(reg4.test("0")); // true
console.log(reg4.test("2")); // true
console.log(reg4.test("10")); // false
```

## 常用的正则表达式
1. 验证是否为有效数字
```javascript
/* 规则分析
 * 1. 可能出现+ - 号，也可能不出现 [+-]?
 * 2. 一位0-9都可以，多位首位不能是0 (\d|[1-9]\d+)
 * 3. 小数部分可能有可能没有，一旦有后面必须有小数点+数字 (\.\d+)?
 */
let reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?/;
```

2. 验证密码
```javascript
/* 数字、字母、下划线
 * 6～16位
 */
let reg = /\w{6,16}/; // ?? \w 数字、字母、下划线中的任意一个字符
// 必须包含数字、字母、下划线
```

3. 真实姓名
```javascript
/*
 * 1. 汉字 /^[\u4E00-\u9FA5]$/ 汉子的unicode编码范围
 * 2. 名字长度2-10位
 * 3. 可能有译名 ·汉字 (·[\u4E00-\u9FA5{2,10}){0,2}
 */
 let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5{2,10}){0,2}$/;
 ```

 4. 验证邮箱
 5. 身份证号码
 ```javascript
 /*
  * 1. 一共18位
  * 2. 最后一位可能是X
  * 3. 身份证前6位，省市县
  * 4. 中间八位：年月日
  * 最后四位：
  *    最后一位：X或者数字
  *    倒数第二位：偶数 女 奇数 男
  *    其余的是经过算法算出来的
  */
  // let reg = /^\d{17}(\d|X)$/;
  // 小括号分组的第二个作用，分组捕获，不仅可以把大正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容
  let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
  reg.exec("11010119900307619X");
  // [ '11010119900307619X',
       '110101',
       '1990',
       '03',
       '07',
       '9',
       'X',
       index: 0,
       input: '11010119900307619X' ]
  // 捕获结果是数组，包含每一个小分组单独获取的内容
  ```

  ## 正则表达式之两种创建正则方式的区别
  ```javascript
  // 1.构造函数因为传递的是字符串，\需要写两个才代表斜杠
  let reg = /\d+/g;
  reg = new RegExp("\\d+", "g");

  // 正则表达式中的部分内容是变量存储的值
  // 两个斜杠中间包起来的都是元字符(如果正则中要包含某个变量的值，则不能使用字面量方式创建)
  let type = "mm";
  reg = /^@"+type+@$/; // 匹配以@开头，一个或多个+，typ，一个或多个e，@结尾；不是直接拼的type变量值mm
  console.log(reg.test("@mm@")); // false
  console.log(reg.test('@"""typeeeee@')); // true
  // 2.这种情况只能使用构造函数方式（因为它传递的规则是字符串，只有这样才能进行字符串的拼接）
  reg = new RegExp("^@+type+@$");
  console.log(reg.test("@mm@")); // true
  ```
  -------

  ## 正则表达式捕获的懒惰性
  实现正则捕获的办法：
  * 正则RegExp.prototype上的方法
    * exec
    * test
  * 字符串String.prototype上支持正则表达式处理的方法
    * replace
    * match
    * split
    * ......

    ```javascript
    let str = "mm2019yy2020";
    let reg = /^\d+$/;
    // 实现正则捕获的前提是：当前正则要和字符串匹配，如果不匹配，捕获的结果是null
    console.log(reg.test(str)); // false
    console.log(reg.exec(str)); // null

    /* 
     * 基于exec实现正则的捕获
     * 1.捕获到的结果是null或者一个数组
     *    数组第一项：本次捕获到的内容
     *    其余项：对应小分组本次单独捕获的内容
     *    index：当前捕获内容在字符串中的起始索引
     *    input：原始字符串
     * 2.每执行一次exec，只能捕获到一个符合正则规则的，但是默认情况下，我们执行一百遍，获取的结果永远都是第一个匹配到的，其余的捕获不到。
     *   “正则捕获的懒惰性”：默认只捕获第一个
     *   出现捕获懒惰性的原因：reg.lastIndex：当前正则下一次匹配的起始索引位置。默认情况下lastIndex的值不会被修改，每一次都是从字符串开始位置查找，所以找到的永远只是第一个
     *   解决办法：全局修饰符g
     */
    reg = /\d+/;
    console.log(reg.exec(str)); // [ '2019', index: 2, input: 'mm2019yy2020' ]

    console.log(reg.lastIndex); // 0 下面匹配捕获是从str索引零的位置开始找
    console.log(reg.exec(str));
    console.log(reg.lastIndex); // 0 第一次匹配捕获完成，lastIndex没有改变，所以下一次exec依然是从字符串最开始找，找到的永远是第一个匹配的。
    ```
    ## 懒惰性的解决办法
    ```javascript
    // 1.处理、取消懒惰性：全局修饰符g
    reg = /\d+/g;
    console.log(reg.lastIndex); // 0
    console.log(reg.exec(str)); // [ '2019', index: 2, input: 'mm2019yy2020' ]
    console.log(reg.lastIndex); // 6 （第一次查找结束的位置，下一个index开始，比如mm2019，下一个y的index是6，所以从6开始）设置全局匹配修饰符g后，第一次匹配完，lastIndex会自己修改
    console.log(reg.exec(str)); // [ '2020', index: 8, input: 'mm2019yy2020' ]
    console.log(reg.lastIndex); // 12
    console.log(reg.exec(str)); // null 当全部捕获后，再次捕获的结果是null，但是lastIndex又回归了初始值0，再次捕获又从第一个开始了......
    // 继续执行，lastIndex又从0开始循环
    console.log(reg.lastIndex); // 0
    ......
    // ==================
    // 2.用两个不同的reg执行，不会相互影响
    let reg = /\d+/g;
    if (reg.test(str)) { // 为了解决test改变lastIndex，可以用两个不同的reg执行，不会相互影响，如reg2 = /\d+/g; reg2.test不会影响reg的lastIndex
        // 验证一下：只有正则和字符串匹配我们再捕获
        console.log(reg.lastIndex); // 6 基于test匹配验证后，lastIndex已经被修改为第一次匹配后的结果，所以下一次捕获不再从头开始了
        console.log(reg.exec(str)); // 2020
    }
    ```

    ```javascript
    // 需求： 写一个方法execAll，执行一次可以把所有匹配的结果捕获到（前提正则一定要设置全局修饰符g）
    function() {
        fucntion execAll(str = "") {
            // str：要匹配的字符串
            // this：RegExp的实例（当前操作的正则）
            // 进来后的第一件事，是验证当前正则是否设置了g，不设置则不能再进行循环捕获了，否则会导致死循环
            if(!this.global){ // 判断正则上的global属性是否为true
                return this.exec(str);
            }
            // ary存储最后所有捕获的信息，res存储每一次捕获的内容
            let ary = [];
            res = this.exec(str);
            while(res) {
                // 把每一次捕获的内容res[0]存放到数组中
                ary.push(res[0]);
                // 只要捕获的内容不为null，则继续捕获下去
                res = this.exec(str);
            }
            return ary.length ? ary : null;
        }
        // 正则的方法exec、execAll
        RegExp.prototype.execAll = execAll;
    }()
    let reg = /\d+/g;
    console.log(reg.execAll(str));

    // 字符串的match方法：可以在执行一次的情况下，捕获到所有匹配的数据（前提：正则得设置g才可以）
    console.log(str.match(reg)); // ["2019", "2020"]
    ```

    `exec`总结：
    （1）返回结果是数组。数组内容：
    索引0：存放第一个匹配的子字符串。
    属性index：匹配文本在字符串中的起始索引位置。
    属性input：整个字符串对象(stringObject)。
    **exec()函数如果没有查找到任何匹配，则返回null。**
    **每次执行exec()函数都只查找最多一个匹配并返回。**
    **如果为正则表达式设置了全局标志(g)，exec()函数仍然只返回最多一个匹配，再次调用该对象的exec()函数就可以查找并返回下一个匹配。**
    如果`regExpObject`（即正则表达式）带有全局标志g，`exec()`函数不是从字符串的开头开始查找，而是从属性`regExpObject.lastIndex`所指定的索引处开始查找。**该属性值默认为0，所以第一次仍然是从字符串的开头查找。当找到一个匹配时，exec()函数会将`regExpObject.lastIndex`的值改为字符串中本次匹配内容的最后一个字符的下一个索引位置。当再次执行exec()函数时，将会从该索引位置处开始查找，从而找到下一个匹配。**

    ## 正则的分组捕获
    ```javascript
        // 身份证号码
        let str = "11010119900307619X";
        let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
        console.log(reg.exec(str));
        console.log(str.match(reg));
        // [ '11010119900307619X',
            '110101',
            '1990',
            '03',
            '07',
            '9',
            'X',
            index: 0,
            input: '11010119900307619X' ]
        // 第一项：大正则匹配的结果
        // 其余项：每一个小分组单独匹配捕获的结果
        // 如果设置了分组（改变优先级），但是捕获的时候不需要单独捕获，可以基于?:来处理，?:只匹配不捕获
    ```

    ```javascript
    // 既要捕获到{数字}，也想单独的把数字也获取到，例如：第一次找到{0} 还需要单独获取0
    let str = "{0}年{1}月{2}日";
    // 不设置g只匹配一次，exec和match获取的结果一致（既有大正则匹配的信息，也有小分组匹配的信息）
    let reg = /\{\d+\}/;
    console.log(reg.exec(str)); // [ '{0}', index: 0, input: '{0}年{1}月{2}日' ]
    console.log(str.match(reg)); // [ '{0}', index: 0, input: '{0}年{1}月{2}日' ]

    let reg = /\{\d+\}/g;
    console.log(str.match(reg)); // [ '{0}', '{1}', '{2}' ]，多次匹配的情况下，match只能把大正则匹配的内容获取到，小分组匹配的信息无法获取

    // aryBig大正则结果，arySmall小分组结果
    let aryBig = [], arySmall = [], reg = reg.exec(str);
    while(res) {
        let [big, small] = res;
        aryBig.push(big);
        arySmall.push(small);
        reg = reg.exec(str);
    }
    console.log(aryBig, arySmall); // [ '{0}', '{1}', '{2}' ] [ '0', '1', '2' ]
    ```

    ```javascript
    // 分许的第三个作用：“分组引用”
    let str = "book"; // "good"、"look"、"moon"、"foot"......
    // 分组引用就是通过“\数字”让其代表和对应分组出现一模一样的内容
    // \1表示和()中分组出现一模一样的内容
    let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/;
    console.log(reg.test("book")); // true
    console.log(reg.test("deep")); // true
    console.log(reg.test("some")); // false
    ```

    ## 正则捕获的贪婪性
    正则捕获的贪婪性：默认情况下，正则捕获的时候，是按照当前的正则所匹配的最长结果来获取的
    ```javascript
    let str = "mm2019yy2020";
    let reg = /\d+/g;
    console.log(str.match(reg)); // ["2019", "2020"]

    // 在量词元字符后面设置? ：取消捕获时候的贪婪性（按照正则匹配的最短结果来获取）
    reg = /\d+?/g;
    console.log(str.match(reg)); // [ '2', '0', '1', '9', '2', '0', '2', '0' ]
    ```

    ### 问号在正则中的五大作用
    * 问号左边是`非量词元字符`：本身代表量词元字符，出现0-1次
    * 问号左边是`量词元字符`如+、*：取消捕获时候的贪婪性
    * `(?:)`只匹配不捕获
    * `(?=)`正向预查（先行断言）
    * `(?!)`负向预查（先行否定断言）
    * `(?<=)`后行断言
    * `(?<!)`后行否定断言
    （1）正向预查(?=pattern)：必须符合该正则规则，要匹配的字符串，必须满足pattern这个条件
    e.g:
    正则表达式/lmm/会匹配lmm，也会匹配lmm2中的lmm，如果只希望lmm只能匹配lmm2中的lmm，则可以这样写：/lmm(?=2)/
    ```javascript
    var reg = /lmm(?=2)/;
    var str = 'lmm6';
    console.log(reg.exec(str)); // null
    var str2 = 'lmm2';
    console.log(reg.exec(str)); // lmm [0: "lmm", index: 0, input: "lmm2", groups: undefined, length: 1]
    ```

    正向预查（es6入门）：x只有在y前面才匹配，必须写成`/x(?=y)/`。
    比如，只匹配百分号之前的数字，要写成`/\d+(?=%)/`。
    ```javascript
    /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
    ```
    **注意**：括号里的内容只是参与匹配的条件，并不参与真正的捕获，只是检查一下后面的字符是否符合要求，如上返回的是lmm，而不是lmm2

    （2）负向预查（?!条件）：形式(?!pattern)和(?=pattern)恰好相反，要求做匹配的时候，必须不满足pattern这个条件，还拿上面的例子：
    ```javascript
    var reg = /lmm(?!2)/
    var str = 'lmm2';
    console.log(reg.exec(str)); // null，因为正则要求，lmm后面不能是2
    var str2 = 'lmm6';
    console.log(reg.exec(str)); // lmm
    ```
    负向预查（es6）: “先行否定断言”指的是，x只有不在y前面才匹配，必须写成`/x(?!y)/`。比如，只匹配不在百分号之前的数字，要写成`/\d+(?!%)/`。
    ```javascript
    /\d+(?!%)/.exec('that’s all 44 of them'); // ["44"]
    ```

    （3）后行断言（es6）：“后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成`/(?<=y)x/`。
    比如，只匹配美元符号之后的数字，要写成`/(?<=\$)\d+/`。
    ```javascript
    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill'); // ["100"]
    ```
    **注意：**“后行断言”的括号之中的部分（(?<=\$)），也是不计入返回结果

    e.g: 只有在美元符号后面的foo才会被替换。

    ```javascript
    const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
    '$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar'); // '$bar %foo foo'
    ```

    “后行断言”的实现，需要先匹配`/(?<=y)x/`的x，然后再回到左边，匹配y的部分。这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。
    后行断言的组匹配，与正常情况下结果是不一样的。
    ```javascript
    /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
    /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]
    ```
    没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。
    而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053。

    （4）后行否定断言（es6）：“后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成`/(?<!y)x/`。
    比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。
    ```javascript
    /(?<!\$)\d+/.exec('it’s is worth about €90'); // ["90"]
    ```

    ## 其它正则捕获的方法
    1.test也能捕获（本意是匹配）
    ```javascript
    let str = "{0}年{1}月{2}日";
    let reg = /\{(\d)+\}/g;
    console.log(reg.test(str)); // true
    console.log(RegExp.$1); // "0" 获得的是第1次分组捕获的内容
    console.log(reg.test(str)); // true
    console.log(RegExp.$1); // "1" 获得的是第2次分组捕获的内容，由于test执行了一次，所以reg.lastIndex自动增加，所以找到第二个匹配的内容
    console.log(reg.test(str)); // true
    console.log(RegExp.$1); // "2" 
    console.log(reg.test(str)); // false
    console.log(RegExp.$1); // "2" 存储的是上次捕获的结果
    ```

    `test`总结：test()函数返回一个布尔值，用于指示在所搜索的字符串中是否存在正则表达式模式对应的匹配。

    ### `RegExp.$1 - RegExp.$9`：获取当前本次正则匹配后，第一到第九个分组信息

    2.replace字符串中实现替换的方法（一般都是伴随正则一起使用的）
    ```javascript
    let str = "mm@2020|mm@2019"; // 把mm替换成yy
    // (1) 不用正则，执行一次只能替换一个
    str = str.replace("mm", "yy");
    console.log(str); // 'yy@2020|mm@2019' 只替换第一个mm，每次执行replace只触发一次捕获
    str = str.replace("mm", "yy");
    console.log(str); // 'yy@2020|yy@2019' 第二次替换

    // (2) 使用正则会简单点
    str = str.replace(/mm/g, "yy");
    console.log(str); // 'yy@2020|yy@2019'
    ```

    ```javascript
    // 有的情况不能依次replace，而是需要用到正则，如下：
    let str = "yy@2020|yy@2019"; // 把yy替换成mmyy
    str = str.replace("yy", "mmyy").replace("yy", "mmyy");
    console.log(str); // 'mmmmyy@2020|yy@2019' 每一次替换都是从字符串第一个位置开始找到的（类似于正则捕获的懒惰性，如第一次替换后变成“mmyy@2020|yy@2019”，第二次会把这两个yy再替换成mmyy），正则的懒惰性，匹配到第一个之后不再继续往后匹配替换

    // 但是基于正则g可以正常实现这个需要
    str = str.replace(/yy/g, "mmyy");
    console.log(str); // 'mmmyy@2020|mmyy@2019'
    ```

    ### 把时间字符串进行处理
    ```javascript
    let time = "2020-01-20";
    // 变成“2020年01月20日”
    let reg = /^(\d{4})-(\d{1,2})-(\d{1,2)$/;
    // 这样可以实现
    time = time.replace(reg, "$1年$2月$3日"); // $1、$2、$3表示第1、2、3个分组捕获的内容
    console.log(time); // "2020年01月20日"

    // 还可以这样处理 [str].replace([reg], [function])
    // 1.首先拿reg和time进行匹配捕获，能匹配到几次就会把传递的函数执行几次（而且是匹配一次就执行一次）
    // 2.不仅把方法执行，而且replace还给方法传递了实参信息（和exec捕获的内容一致的信息，大正则匹配的内容，小分组匹配的信息）
    // big是大正则匹配到的内容
    /* time = time.replace(reg, (bjg, $1, $2, $3) => {
     *      // 这里的$1～$3是我们自己设置的变量
     *       console.log(bjg, $1, $2, $3); // 2020-01-20 2020 01 20
     *  })
     */
    // 3. 在函数中我们返回的是啥，就把当前大正则匹配的内容替换成啥
    time = time.replace(reg, (...arg) => {
        let [, $1, $2, $3] = arg;
        $2.length < 2 ? $2 = "0" + $2 : null;
        $3.length < 2 ? $3 = "0" + $3 : null;
        return $1 + "年" + $2 + "月" + $3 + "日";
    })
    ```

    ### 单词首字母大写
    ```javascript
    let str = "good good study, day day up!";
    let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;
    // 函数被执行了6次，每一次都把正则匹配的信息传递给函数
    // 每一次arg: ["good", "g"] ["good", "g"] ["study", "s"]....
    str = str.replace(reg, (...arg) => {
        let [content, $1] = arg;
        console.log("$1:", $1);
        $1 = $1.toUpperCase();
        content = content.substring(1);
        return $1 + content;
    })
    console.log(str); // "Good Good Study, Day Day Up!"
    ```

    ### 验证一个字符串中哪个字母出现的次数最多，多少次？
    1.去重思维
    ```javascript
    let str = "testllliullyy";
    let obj = {};
    [].forEach.call(str, item => {
        // obj.hasOwnProperty(item)
        if (typeof obj[item]!=="undefined") {
            obj[item]++;
            return;
        }
        obj[item] = 1;
    });
    console.log(obj); // t: 2 e: 1 s: 1 l: 5 i: 1 u: 1 y: 2
    let max = 1;
    let res = [];
    for (let key in obj) {
        let item = obj[key];
        item > max ? max = item : null;
    }
    console.log(max);
    for (let key in obj) {
        let item = obj[key];
        if(item === max) {
            res.push(key);
        }
    }
    console.log(`出现次数最多的字符是：${res}，出现了${max}次`);
    ```
    
    2.排序
    一个字符串直接split('')，以空字符串切割可以得到一个数组；一个字符数组通过join('')可以得到一个普通字符串。
    ```javascript
    e.g：'lmmmy'.split(''); // ['l', 'm', 'm', 'm', 'y']
    ['l', 'm', 'm', 'm', 'y'].join(''); // lmmmy
    ```
    ```javascript
    let str = "testllliullyy";
    // 先将字符串变成数组，再排序
    str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
    console.log(str); // 'eilllllsttuyy'
    let reg = /([a-zA-Z])\1+/g;
    console.log(str.match(reg)); // [ 'lllll', 'tt', 'yy' ]
    let ary = str.match(reg);
    ary.sort((a, b) => b.length - a.length);
    // console.log(`出现次数最多的字符是：${ary[0].slice(0, 1)}，出现了${ary[0].length}次`); // 出现次数最多的字符是：l，出现了5次
    // console.log(ary); // [ 'lllll', 'tt', 'yy' ]
    let max = ary[0].length;
    let res = [ary[0].substr(0, 1)];
    for(let i = 1; i < ary.length; i++) {
        let item = ary[i];
        if(item.length < max) {
            break;
        }
        res.push(item.substr(0, 1));
        console.log(`出现次数最多的字符是：${res[0].slice(0, 1)}，出现了${res[0].length}次`); // 出现次数最多的字符是：l，出现了5次
    }
    ```

    ## compile()函数
    compile()函数用于更改正则表达式模式，并将正则表达式模式编译为内部格式，从而执行得更快。

    ```javascript
    var str = "abc12456def45646ghi";

    // 更改regExp的正则表达式模式，并进行编译
    // 这与下列语句的作用是相同的：regExp = /\d+/;
    regExp.compile("\\d+");
    console.log(regExp.exec(str));
    ```

    ## $1...$9属性(参考文章：https://www.cnblogs.com/ooo0/p/7367719.html)
    RegExp.$1...$9属性用于返回正则表达式模式中某个子表达式匹配的文本。正则表达式中每个小括号内的部分表达式就是一个子表达式。
    
    *注意*：这里的RegExp是全局对象，RegExp.$1...$9是全局属性。当执行任意正则表达式匹配操作时，JavaScript会自动更新全局对象RegExp上的全局属性，用以存储此次正则表达式模式的匹配结果。当再次执行正则表达式匹配时，RegExp上的全局属性又会更新，覆盖掉之前的存储数据，以反映本次正则表达式模式的匹配结果。

    ```javascript
    var str = "X98Y87Z65";
    // 三个数字部分加了小括号，表示子表达式
    var reg = /^X(\d+)Y(\d+)Z(\d+)$/;
    reg.test(str); // 此处使用exec()等其他正则表达式的匹配方法也可
    console.log(RegExp.$1); // 98
    console.log(RegExp.$2); // 87
    console.log(RegExp.$3); // 65
    ```

    ## 具名组匹配: 
    ### 什么是具名组匹配：给匹配组取个名字，具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的。如果组的顺序变了，也不用改变匹配后的处理代码。

    `(?<匹配组的名称>)`，如`(?<group1>)`
    然后就可以在exec方法返回结果的groups属性上引用该组名group1。同时，数字序号（matchObj[1]）依然有效。
    ```javascript
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj.groups.year; // 1999
    const month = matchObj.groups.month; // 12
    const day = matchObj.groups.day; // 31
    ```

    **注意：**如果具名组没有匹配，那么对应的groups对象属性会是undefined。
    ```javascript
    const RE_OPT_A = /^(?<as>a+)?$/;
    const matchObj = RE_OPT_A.exec('');
    matchObj.groups.as // undefined
    'as' in matchObj.groups // true
    ```
    具名组as没有找到匹配，那么matchObj.groups.as属性值就是undefined，并且as这个键名在groups是始终存在的

    ### 具名组的作用：
    * 可以使用解构赋值直接从匹配结果上为变量赋值。
    ```javascript
    let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
    one  // foo
    two  // bar
    ```
    * 字符串替换时，使用`$<组名>`引用具名组。
    ```javascript
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

    '2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
    // '02/01/2015'
    ```

    * 具名组匹配在原来的基础上，新增了最后一个函数参数：具名组构成的一个对象。函数内部可以直接对这个对象进行解构赋值。
    ```javascript
    '2020-01-02'.replace(re, (
        matched, // 整个匹配结果 2015-01-02
        capture1, // 第一个组匹配 2015
        capture2, // 第二个组匹配 01
        capture3, // 第三个组匹配 02
        position, // 匹配开始的位置 0
        S, // 原字符串 2015-01-02
        groups // 具名组构成的一个对象 {year, month, day}
        ) => {
        let {day, month, year} = groups;
        return `${day}/${month}/${year}`;
    }); // 02/01/2020
    ```

    * 如果要在正则表达式内部引用某个“具名组匹配”，可以使用`\k<组名>`的写法。
    ```javascript
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
    ```

    数字引用（\1）依然有效。
    ```javascript
    const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
    ```

    这两种引用语法还可以同时使用。
    ```javascript
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
    RE_TWICE.test('abc!abc!abc') // true
    RE_TWICE.test('abc!abc!ab') // false
    ```

    =========================================   以下摘自MDN    =========================================
    ## 字符串的replace方法
    MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    1. 实现交换字符串中的两个单词
    ```javascript
    var re = /(\w+)\s(\w+)/;
    var str = "John Smith";
    var newstr = str.replace(re, "$2, $1");
    // Smith, John
    console.log(newstr);
    ```

    2. 将驼峰转成中横线连接

    使用行内函数来修改匹配到的字符。
    在这个例子中，所有出现的大写字母转换为小写，并且在匹配位置前加一个连字符。重要的是，在返回一个替换了的字符串前，在匹配元素前进行添加操作是必要的。

    在返回前，替换函数允许匹配片段作为参数，并且将它和连字符进行连接作为新的片段。

    ```javascript
    function styleHyphenFormat(propertyName) {
        // macth是匹配到的字符串
        function upperToHyphenLower(match) {
            return '-' + match.toLowerCase();
        }
        return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
    }
    styleHyphenFormat('borderTop'); // border-top
    ```
    因为我们想在最终的替换中进一步转变匹配结果，所以我们必须使用一个函数。这迫使我们在使用toLowerCase()方法前进行评估。如果我们尝试不用一个函数进行匹配，那么使用toLowerCase() 方法将不会有效。

    ```javascript
        var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work
    ```
    这是因为 `'$&'.toLowerCase()` 会先被解析成字符串字面量（这会导致相同的`'$&'`)而不是当作一个模式。需要用到`replace()`第二个参数是`Function`类型的情况

    3. 使用行内函数和正则来避免循环
    下例把某种模式的字符串转换为一个对象数组（其元素为对象）。

    输入：
    一个由 x，- 和 _ 组成的字符串。

    ```
    x-x_

    ---x---x---x---

    -xxx-xx-x-

    _x_x___x___x___
    ```
    输出：

    一个数组对象。'x' 产生一个 'on' 状态，'-'（连接符）产生一个 'off' 状态，而 '_' （下划线）表示 'on' 状态的长度。
    ```javascript
    [
    { on: true, length: 1 },
    { on: false, length: 1 },
    { on: true, length: 2 }
    ...
    ]
    ```
    代码片段：

    ```javascript
    var str = 'x-x_';
    var retArr = [];
    str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
    if (p1) { retArr.push({ on: true, length: p1.length }); }
    if (p2) { retArr.push({ on: false, length: 1 }); }
    });

    console.log(retArr);
    ```
    该代码片段生成了一个数组，包含三个期望格式的对象，避免了使用 for 循环语句。
