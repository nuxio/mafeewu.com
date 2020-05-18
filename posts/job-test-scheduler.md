---
title: "头条面试题 - scheduler"
date: 2020-05-17 21:24:49 +0800
categories: JavaScript Promise
---

## 题目

实现一个调度器，可控制同时执行的任务熟练：

```js
class Scheduler {
  constructor(count) {
    // TODO
  }
  add(task) {
    // TODO
  }
  schedule() {
    // TODO
  }
}

// Usage
const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
```

实现：

```js
class Scheduler {
  constructor(count) {
    this.max = count;
    this.count = 0;
    this.queue = [];
  }
  add(task) {
    return new Promise(resolve => {
      this.queue.push([task, resolve]); // 关键，将 resolve 方法存入数组，执行任务后再调用
      this.schedule();
    });
  }
  schedule() {
    if (this.count < this.max && this.queue.length) {
      const [task, resolve] = this.queue.shift();

      task().then(() => {
        resolve();
        this.count = this.count - 1;
        this.schedule();
      });

      this.count = this.count + 1;
    }
  }
}
```
