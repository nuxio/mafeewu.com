---
title: "Learn Redux"
date: 2020-05-27 09:08:51 +0800
categories: Redux React JavaScript
---

# Redux

Redux是一个状态容器。具有以下特点：

1. 可预测，非常容易测试
2. 状态集中管理，可以实现__撤销__/__重做__，状态持久化等功能
3. 可调式的，使用Redux DevTools可以追溯应用状态__何时，何地被改变，以及改变的原因和途径__
4. 可拓展的，灵活的，Redux可以和任意UI框架结合使用



## 动机

__单页应用__发展的越来越复杂，我们需要管理的数据也越来越多。这些数据可能有服务器返回的，或者缓存数据，或者本地输入的还未保存到服务器的数据。UI状态也在变的复杂，我们需要管理激活的路由，选中的tabs，加载状态，分页状态等等。

管理这些不断变化的状态非常困难。比如一个model可以更新另一个model，一个view可以更新一个model，这个model又会引发另一个model的更新。。。在这种情况下，你可能已经分不清发生了什么，因为整个应用的数据已经失控。当系统是不透明且不确定的系统时，将会很难重现错误或添加新功能。

这种复杂性很难处理，因为我们混用了两个难以理解的概念：__mutation__ 和 __asynchronicity__。Redux尝试通过对更新的方式和时间施加限制的方式让state的变更可预测。



## 三项原则

可以用以下三个基本原理来描述Redux：

1. Single source of truth 单一数据来源，应用程序的全局状态（global state）存储在单个存储对象（single store）中。
2. State is read-only 只读的state，更改状态的唯一方法是触发action，一个描述发生了什么的对象。
3. Changes are made with pure functions 使用纯函数进行更改，要指定action如何改变状态树，你需要写纯函数的reducer。



## Actions

Actions是承载发送给store的信息的载体，是store的唯一信息来源，通过 `store.dispatch()` 方法触发。

一个Action可以是这样：

```js
const addTodo = {
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}

dispatch(addTodo);
```

Actions是JS对象，`type`属性表示action的类型，其余属性作为action携带的信息传递给store。



### Action Creators

Action Creators顾名思义就是创建action的函数：

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

dispatch(addTodo(text))
```



## Reducers

Reducers指定如何处理收到的actions和变更state。

Reducers应该是纯函数，接收同样的参数，应该返回同样的结果。不包含副作用，异步请求等。

一个简单的Reducer：

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

注意，不要更改state，而是通过`Object.assign`拷贝属性并返回新的state对象。在`default`case中返回之前的state，表示没有变更。



## Store

Store是存储数据并将actions和reducers结合起来的容器，具有以下职责：

	1. 托管数据
 	2. 提供`getState()`方法访问数据
 	3. 提供`dispatch(action)`方法更新数据
 	4. 提供`subscribe(listener)`方法订阅数据
 	5. `subscribe(listener)`方法返回的函数取消订阅

创建一个store：

```js
import { createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp)
```

`createStore()`方法接收第二个参数作为state的初始值：

```js
const store = createStore(todoApp, window.STATE_FROM_SERVER)
```



### Dispatching Actions

```js

import { addTodo } from './actions'

// Log the initial state
console.log(store.getState())

// state变更后打印state
// 返回了取消订阅的方法
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))

// 取消订阅
unsubscribe()
```



## 和React一起使用

用官方库[react-redux](https://react-redux.js.org/)结合，需要先区分两种组件，容器组件和展示组件。容器组件实现数据获取、业务逻辑的计算等，展示组件只负责呈现数据。

结合Redux在容器组件进行：

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

// 关联state和dispatch
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList
```

注入Store：

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

这是react-redux推荐的使用方式，通过`Provider`组件注入store（内部使用的context实现）,在`connect()`方法内部获取context中的store，再根据`mapStateToProps`和`mapDispatchToProps`将state和dispatch通过props的方式传给子组件。



