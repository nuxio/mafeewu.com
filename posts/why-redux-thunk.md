---
Title: "为什么需要redux-thunk?"
Date: 2020-06-01 15:20:55 +0800
Description: Redux Redux-Thunk JavaScript
---

# 为什么需要redux-thunk ?



## 问题起源

Redux的`store.dispatch`方法接收一个`action`对象：

```js
const LOGIN = "LOGIN"
store.dispatch({ type: LOGIN, user: { name: 'Lady GaGa' } });
```

为了避免重复写`type`和其它字段名称，我们一般会写’action creators’：

```js
// in an action creator module
const login = user => ({ type: LOGIN, user })

// in some component
store.dispatch(login({ name: 'Lady GaGa' })) // still dispatching an action object
```

问题来了，如果我们需要做一些异步操作，例如AJAX，setTimeout等，一个简单的action creator就不能胜任了：

```js
// in an action creator module:
const asyncLogin = () =>
  axios.get('/api/auth/me')
  .then(res => res.data)
  .then(user => {
    // how do we use this user object?
  })

// somewhere in component:
store.dispatch(asyncLogin()) // 关键; `asyncLogin()` 返回了一个 promise, 而不是 action 对象
```

Redux的dispatch方法并不接收promise，怎么办？

## 解决方法1

我们可以在actions模块引入`store`不就可以在异步回调里面使用dispatch了么：

```js
// action模块
import store from '../store'

const simpleLogin = user => ({ type: LOGIN, user })

const asyncLogin = () =>
  axios.get('/api/auth/me')
  .then(res => res.data)
  .then(user => {
    store.dispatch(simpleLogin(user))
  })

// 组件内调用
asyncLogin()
```

这么做也可以达到目的，但是有几个缺点。

### 缺点1，不一致的API

使用解决方法1时，我们的同步action是在组件内这样调用：`store.dispatch(login())`，异步action在组件内这样调用：`asyncLogin()`。

- 在组件内一眼看过去（比如看到`asyncLogin()`方法）无法确定这是否是一个异步aciton，更不知道dispatch的内容，使得应用数据变的不透明。
- 如果想要改变action，比如从同步action改成异步action，那么需要同时改造实现和使用的地方，非常繁琐。

我们的期望就是继续使用`store.dispatch(actionCreator())`，即使是异步action也是。

### 缺点2，不是纯函数

`asyncLogin`不是纯函数，它包含一个网络调用，这会让组件变的难以测试，你想想，如果想要进行单元测试，就必须对axios进行拦截（返回mock数据，麻烦）或者真的调用接口（万一接口需要认证才能调用？就很痛苦）。

### 缺点3，紧耦合

`asyncLogin`和一个`store`有了紧密的耦合。非常不利于代码复用、测试。



## 解决方法2，thunks

返回一个可以稍后执行的函数，而不是立即执行网络接口调用：

```js
// in an action creator module:
import store from '../store'   // 目前为止还是耦合的

const simpleLogin = user => ({ type: LOGIN, user })

const thunkedLogin = () =>     // action creator, when invoked…
  () =>                        // …returns a thunk, which when invoked…
    axios.get('/api/auth/me')  // …performs the actual effect.
    .then(res => res.data)
    .then(user => {
      store.dispatch(simpleLogin(user))
    })

// 组件内调用
store.dispatch(thunkedLogin()) // 将 thunk dispatch 到 store

// The thunk itself (`() => axios.get…`) has not yet been called.
```

目前为止，只是强行将写法改成了我们所期望的方式`store.dispatch(actionCreator())`，上面的代码其实是不能运行的，因为Redux只接受`action`对象，而我们dispatch的是一个函数。

接下来就要引入Redux中间件了：每次dispatch到store的值，都会先传递给中间件(middlewares)处理。



## Redux-Thunk 中间件

`redux-thunk`中间件的实质操作：

```js
actionOrThunk =>
  typeof actionOrThunk === 'function'
    ? actionOrThunk(dispatch, getState)
    : passAlong(actionOrThunk);
```

- 如果dispatch了一个普通的action对象，则redux-thunk会简单地将其传递（例如传入reducer），就好像redux-thunk不存在一样。
- 如果dispatch了一个函数（例如一个thunk），则redux-thunk会调用该函数，并传入store的dispatch和getState。它不会将thunks转发给reducers。

正是我们需要的！现在，我们的action creators可以返回对象或函数。在前一种情况下，一切正常。在后一种情况下，该函数将被拦截并调用。

当我们的示例thunk被中间件调用时，它将执行异步效果。异步完成后，回调或处理程序可以将normal action dispatch到store。因此，Thunks让我们暂时“逃脱”了正常的Redux循环，并通过异步处理程序最终重新进入了循环。

### 依赖注入

我们已经看到Redux中的thunks使我们可以使用统一的API，并使action creators保持纯函数。但是，我们仍然引入了特定的store。使用`redux-thunk`中间件为我们提供了解决该问题的方法：依赖注入。

Thunks通常不带任何参数-它们是延迟的计算，无需进一步输入即可执行。但是，`redux-thunk`改变了该规则，实际上将两个参数传递给了thunk：dispatch和getState。因此，我们不用再引入特定的store：

```js
// in an action creator module:
const simpleLogin = user => ({ type: LOGIN, user })

// Look, no store import!

const thunkedLogin = () =>     // action creator, when invoked…
  dispatch =>                  // …returns thunk; when invoked with `dispatch`…
    axios.get('/api/auth/me')  // …performs the actual effect.
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })

// somewhere in component:
store.dispatch(thunkedLogin()) // dispatches the thunk to the store.

// The thunk itself (`dispatch => axios.get…`) has not yet been called.
// When it reaches the middleware, `redux-thunk` will intercept & invoke it,
// passing in the store's `dispatch`.
```

disptach是从何而来的？

简短的答案是`redux-thunk`中间件可以访问store，因此可以在调用thunk时传入store的`dispatch`和`getState`。中间件负责将这些依赖项注入到thunk中。action creators模块不需要手动引入store，因此该action creator可以用于其他store，甚至可以用于mocked dispatch。

最简化的的`redux-thunk`代码：

```js
export default function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}
```



#### `getState`

我们没有展示在thunk中使用`getState`，因为它很容易滥用。在大多数Redux应用程序中，使用以前的状态来确定新状态是*reducers*（而非actions）的责任。



## 什么是thunk？

“ thunk”的确切定义因上下文而异。通常，thunks是一种用于延迟计算的函数式编程技术。

对比以下两种调用方式：

```js
// Eager version
function yell (text) {
  console.log(text + '!')
}

yell('bonjour') // 'bonjour!'

// Lazy (or "thunked") version
function thunkedYell (text) {
  return function thunk () {
    console.log(text + '!')
  }
}

const thunk = thunkedYell('bonjour') // no action yet.

// wait for it…

thunk() // 'bonjour!'
```

命名函数有助于突出显示thunk，但是使用箭头可以使区别更加明显。

```js
const yell        = text =>       console.log(text + '!')
const thunkedYell = text => () => console.log(text + '!')
//                          \___________________________/
//                                       |
//                                   the thunk
```



## 最后

Thunks对于具有简单异步请求的应用程序是有效的解决方案。

原文链接：https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60