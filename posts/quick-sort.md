---
title: "快速排序的JS实现"
date: 2020-05-18 15:12:16 +0800
categories: JavaScript algorithm sort
---

排序算法（Sorting algorithm）是计算机科学最古老、最基本的课题之一。要想成为合格的程序员，就必须理解和掌握各种排序算法。

目前，最常见的排序算法大概有七八种，其中["快速排序"（Quicksort）](https://zh.wikipedia.org/zh/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)使用得最广泛，速度也较快。

"快速排序"的思想很简单，整个排序过程只需要三步：

1. 在数据集之中，选择一个元素作为"基准"（pivot）。
2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

具体实现：

```js
function quickSort(array) {
  const length = array.length;
  if (length <= 1) {
    return array;
  }

  const pivotIndex = Math.floor(length / 2);
  const pivot = array[pivotIndex];

  const left = [];
  const right = [];

  for (let i = 0; i < length; i++) {
    if (i === pivotIndex) {
      continue;
    }

    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}
```
