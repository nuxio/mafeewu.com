---
title: "头条面试题 - dependencies inject"
date: 2020-05-17 21:33:40 +0800
categories: JavaScript
---

## 题目

```js
/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function(dependencies) {
  this.dependencies = dependencies;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function(func) {
  // TODO
};

// 用例：
// 要注入的依赖
var deps = {
  dep1: function() {
    return "this is dep1";
  },
  dep2: function() {
    return "this is dep2";
  },
  dep3: function() {
    return "this is dep3";
  },
  dep4: function() {
    return "this is dep4";
  }
};

// 新建一个“注射器”
var di = new DI(deps);

// 注射
var myFunc = di.inject(function(dep3, dep1, dep2) {
  return [dep1(), dep2(), dep3()].join(" -> ");
});

// 测试
Test.assertEquals(myFunc(), "this is dep1 -> this is dep2 -> this is dep3");
```

实现：

```js
DI.prototype.inject = function(func) {
  let args = func.toString().match(/function[\s\w]*\((.*)\)\s*\{/); // 关键，匹配到参数名称，与已有依赖对应
  args = args
    ? args[1].split(",").map(item => this.dependencies[item.trim()])
    : [];

  return function() {
    return func(...args);
  };
};
```
