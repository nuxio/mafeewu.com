---
title: "二叉树的表示与遍历"
date: 2020-05-18 15:12:07 +0800
categories: JavaScript Data-structure algorithm
---

## 二叉树是什么

二叉树是一种特殊的树型结构，具有两个特征：

1. 二叉树的每个结点的度都不大于 2
2. 二叉树每个结点的孩子结点次序不能任意颠倒

## 二叉树的 JS 表示

例如有二叉树如下：

![二叉树](https://nuxio-1257867303.cos.ap-chengdu.myqcloud.com/binary-tree.jpg)

使用 JS 描述为：

```js
const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      right: {
        value: 8
      }
    },
    right: {
      value: 5
    }
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: {
        value: 9
      },
      right: {
        value: 10
      }
    },
    right: {
      value: 7
    }
  }
};
```

## JS 中遍历二叉树

二叉树有深度遍历和广度遍历， 深度遍历有前序、 中序和后序三种遍历方法。 广度遍历就是层次遍历。

深度遍历中的前中后指的就是根节点被遍历到的顺序。

### 前序遍历

递归(recursion)实现：

```js
const preListRec = [];
const preOrderRec = function(node) {
  if (node) {
    // 判断二叉树是否为空
    preListRec.push(node.value); // 将节点的值存入数组
    preOrderRec(node.left); // 递归遍历左子树
    preOrderRec(node.right); // 递归遍历右子树
  }
};

preOrderRec(tree);
console.log(preListRec); // [1, 2, 4, 8, 5, 3, 6, 9, 10, 7]
```

非递归实现：

```js
const preListUnRec = [];
const preOrderUnRec = function(node) {
  if (node) {
    const stack = [node]; // 利用栈，先将根节点存入

    while (stack.length > 0) {
      // 循环判断是否为空
      node = stack.pop(); // 取出栈顶节点，按照推入的顺序，取出顺序应该是 左子树 > 右子树
      preListUnRec.push(node.value); // 将value放入结果数组
      if (node.right) stack.push(node.right); // 如果有右子树，先将右子树推入栈中
      if (node.left) stack.push(node.left); // 如果有左子树，将左子树推入栈中
    }
  }
};

preOrderUnRec(tree);
console.log(preListUnRec); // [1, 2, 4, 8, 5, 3, 6, 9, 10, 7]
```

### 中序遍历

递归实现：

```js
const inListRec = [];
const inOrderRec = function(node) {
  if (node) {
    // 判断二叉树是否为空
    inOrderRec(node.left); // 递归遍历左子树
    inListRec.push(node.value); // 将节点的值存入数组 调整了一下位置
    inOrderRec(node.right); // 递归遍历右子树
  }
};

inOrderRec(tree);
console.log(inListRec); // [4, 8, 2, 5, 1, 9, 6, 10, 3, 7]
```

非递归实现：

```js
const inListUnRec = [];
const inOrderUnRec = function(node) {
  if (node) {
    const stack = [];
    while (stack.length > 0 || node) {
      if (node) {
        stack.push(node);
        node = node.left; // 左子树优先
      } else {
        node = stack.pop();
        inListUnRec.push(node.value);
        node = node.right; // 没有左子树的情况，访问一下右子树
      }
    }
  }
};

inOrderUnRec(tree);
console.log(inListUnRec); // [4, 8, 2, 5, 1, 9, 6, 10, 3, 7]
```

### 后序遍历

递归实现：

```js
const postListRec = [];
const postOrderRec = function(node) {
  if (node) {
    // 判断二叉树是否为空
    postOrderRec(node.left); // 递归遍历左子树
    postOrderRec(node.right); // 递归遍历右子树
    postListRec.push(node.value); // 将节点的值存入数组 调整了一下位置
  }
};

postOrderRec(tree);
console.log(postListRec); // [8, 4, 5, 2, 9, 10, 6, 7, 3, 1]
```

非递归实现：

```js
const postListUnRec = [];
const postOrderUnRec = function(node) {
  if (node) {
    const stack = [node];
    let tmp = null;

    while (stack.length > 0) {
      tmp = stack[stack.length - 1];

      if (tmp.left && node !== tmp.left && node !== tmp.right) {
        // 左子树优先
        stack.push(tmp.left);
      } else if (tmp.right && node !== tmp.right) {
        // 右子树其次
        stack.push(tmp.right);
      } else {
        // 左右子树都没有，推入根元素的值
        postListUnRec.push(stack.pop().value);
        node = tmp;
      }
    }
  }
};

postOrderUnRec(tree);
console.log(postListUnRec); // [8, 4, 5, 2, 9, 10, 6, 7, 3, 1]
```

### 广度遍历

广度遍历是从二叉树的根结点开始，自上而下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问。

实现原理：使用数组模拟队列，首先将根结点归入队列。当队列不为空时，执行循环：取出队列的一个结点，如果该节点有左子树，则将该节点的左子树存入队列；如果该节点有右子树，则将该节点的右子树存入队列。

```js
const breadthList = []; //定义保存广度遍历结果的数组
const breadthTraversal = function(node) {
  if (node) {
    //判断二叉树是否为空
    const que = [node]; //将二叉树放入队列
    while (que.length !== 0) {
      //判断队列是否为空
      node = que.shift(); //从队列中取出一个结点
      breadthList.push(node.value); //将取出结点的值保存到数组
      if (node.left) que.push(node.left); //如果存在左子树，将左子树放入队列
      if (node.right) que.push(node.right); //如果存在右子树，将右子树放入队列
    }
  }
};

breadthTraversal(tree);
console.log(breadthList); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
