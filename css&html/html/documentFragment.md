# DocumentFragment：
## DocumentFragment是什么？
  文档碎片接口，表示一个没有父级文件的最小文档对象。
  **DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。**

  使用文档片段可以将所有的节点会被一次插入到文档中，仅发生一个重渲染的操作；如果普通的将每个节点分别被插入到文档中，会发生多次重渲染的操作，影响页面的性能。

  DocumentFragments `是DOM节点`。它们`不是主DOM树的一部分`。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

  因为`文档片段存在于内存中，并不在DOM树中`，所以将子元素插入到文档片段时`不会引起页面回流`（对元素位置和几何上的计算）。因此，使用文档片段通常会带来`更好的性能`。

## 创建DocumentFragment
使用`document.createDocumentFragment` 方法或者构造函数来创建一个空的 `DocumentFragment`。

```
let fragment = document.createDocumentFragment();
```

fragment 是一个指向空DocumentFragment对象的引用，即创建了一个空的文档片段。