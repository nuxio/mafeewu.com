---
title: “React Context文档"
date: 2020-05-26 17:28:17 +0800
categories: React Context JavaScript
---


# Context

Context 提供了一种跨层级，跨组件传递数据的方法，可以避免一层层地传递数据。

在一个典型的React应用中，数据是通过props自顶向下（parent to child）传递的，但是这种方法在传递某些特别的数据时可能会比较繁琐（例如 i18n，主题等），因为这类数据会被处于不同层级的多个组件引用。Context 针对这种情况提供了一种解决方案。



## 使用Context的时机

Context被设计为一个”全局变量“，例如我们有一个主题数据需要传递到任意层级，需要使用主题变量的组件。

```js
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar并不需要主题数据，但是被迫接收了这个Prop，并且将其传递给ThemedButton
  // 如果组件层级再深一些，又会增加中间的无辜的组件
  // 或者又需要增加类似的Prop，我们不得不改动整个传递链路
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用Context后，我们可以避免在中间组件中传递这些数据：

```js
// 创建一个Context变量，默认值为 light
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用 Provider 为子组件树提供数据
    // Context的值是可变的，这里将Context的值设置为 dark
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间组件不再需要传递额外的Props
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 通过指定 contextType 读取 Context 的值
  // React 会取最近的 theme Provider 的值
  // 此处 this.context 为 ”dark“
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```



## 使用Context之前

Context主要用于某些特殊数据，这些数据会被很多处于不同层级的组件所引用。使用Context之前需要谨慎考虑，因为它会让组件的复用和测试变的困难。

如果仅仅是想要避免层层传递数据，[Component composition](https://reactjs.org/docs/composition-vs-inheritance.html) 可能是一个更简单的解决办法。

例如，`Page`组件需要将`user`和`avatarSize`属性向下传递几层到`Link`和`Avatar`组件。

```js
<Page user={user} avatarSize={avatarSize} />
// Page 组件渲染了 PageLayout 组件
<PageLayout user={user} avatarSize={avatarSize} />
// PageLayout 组件渲染了 NavigationBar 组件
<NavigationBar user={user} avatarSize={avatarSize} />
// NavigationBar 组件渲染了...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

这操作非常冗余，中间的组件`PageLayout`和`NavigationBar`并不需要`user`和`avatarSize`属性，但是它们被迫传递了这些属性。更让人烦恼的是，如果`Link`或者`Avatar`组件需要更多Props，你必须在所有中间组件再添加一遍。

这看起来就是Context的使用场景，但是别急，我们可以不使用Context也达到目的：传递Avatar组件本身下去。

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
	// 通过 Props 传递组件
  return <PageLayout userLink={userLink} />;
}

// 现在的 Page 组件
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

这样我们就不用去传递那些只被底层组件使用的Props了。将底层的实现提升至顶层，底层只负责展示，减少传递的Props数量，给顶层组件更多实现&控制，这类操作有个高大上的命名，即 [IoC (Inversion of control)]([https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC](https://zh.wikipedia.org/wiki/控制反转)) 。

这样代码是简洁了不少，很明显这个解决方案也有缺点，顶层组件的复杂度变高了，底层组件的可控性变差了。



## Context API

### React.createContext

```js
const MyContext = React.createContext(defaultValue);
```

创建一个Context对象。当React渲染一个订阅该Context对象的组件时，它将从渲染树上面最近的匹配的`Provider`读取当前Context值。

仅当组件在树上方没有匹配的`Provider`时才使用defaultValue参数，这对于单独测试组件时很有帮助。注意：将`undefined`传递为`Provider`值也不会使用defaultValue。

### Context.Provider

```js
<MyContext.Provider value={/* some value */}>
```

每个Context对象都有一个Provider组件，允许消费（consumer）组件订阅context的更新。

接收`value`属性，作为消费组件所取到的值。一个Provider可以服务多个消费组件，也可以嵌套在别的Provider下，覆盖上层Provider的值。

当`Provider`的`value`产生变化后，在`Provider`下的所有消费组件都会重新渲染，这个变更的通知不受`shouldComponentUpdate`方法的限制，不管消费组件的消费方式如何（.contextType、useContext），也就是说尽管消费组件的父组件通过`shouldComponentUpdate`方法跳过了渲染，消费组件也是会重新渲染的。

`value`是否变化是通过使用与[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)相同的算法比较新值和旧值来确定的。



### Class.contextType

```js
class MyClass extends React.Component {
  componentDidMount() {
    // 取值
    let value = this.context;
  }
  componentDidUpdate() {
    /* ... */
    let value = this.context;
  }
  componentWillUnmount() {
    /* ... */
    let value = this.context;
  }
  render() {
    // 取值
    let value = this.context;
  }
}
// 设置取哪个 context 
MyClass.contextType = MyContext;
```

类组件的`contextType`属性可以指定此组件使用哪个context，在组件内部通过`this.context`访问context的值，在任意声明周期方法内都可以访问到。

> __注意__
>
> Class.contextType 只能订阅一个context，如果你需要读取更多context，查看[订阅多个Context](https://reactjs.org/docs/context.html#consuming-multiple-contexts) 
>
> 如果你使用了实验性质的[public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以指定类的__static__属性来初始化`contextType`

```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
```



### Context.Consumer

在函数组件中订阅Context。

```js
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

需要一个函数作为child，函数接收当前的context的值并返回一个React节点。

> __注意__
>
> 更多关于`函数作为child`这种模式的信息，查看[render props](https://reactjs.org/docs/render-props.html) 



### Context.displayName

Context对象接收一个`displayName`字符串属性。React DevTools将会使用这个字符串作为组件名称。

例如：

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // 在DevTools里显示为 "MyDisplayName.Provider"
<MyContext.Consumer> // 在DevTools里显示为 "MyDisplayName.Consumer"
```



## 栗子:chestnut:

```js
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// 创建context
const ThemeContext = React.createContext(themes.light);

function ThemeButton() {
  // 消费context
  const theme = useContext(ThemeContext);
  console.log('ThemeButton render');
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Theme
    </button>
  );
}

// 中间商
// PureComponent自带shouldComponentUpdate的判断
// 会阻止多余的渲染
class Example extends React.PureComponent {
  render() {
    console.log('Example render');
    return (
      <div>
        <ThemeButton />
      </div>
    );
  }
}

function App() {
  // 初始化为 themes.dark
  const [theme, setTheme] = useState(themes.dark);
  console.log('App render');
  return (
    <ThemeContext.Provider value={theme}>
    	{/** 点击变更context的值，切换主题 */}
      <button onClick={() => setTheme(themes.light)}>Light theme</button>
      <button onClick={() => setTheme(themes.dark)}>Dark theme</button>
      <Example />
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
```

上面的例子中，初始化context为暗黑（theme.dark）模式，渲染后的控制台输出：

```
App render 
Example render 
ThemeButton render 
```

点击切换时`App`会重新render，中间商`Example`继承了`PureComponent`，Props和State都无变化，会跳过render。消费组件直接收到Context变更的信息，也会重新render，所以点击切换后的日志输出会是：

```
App render
ThemeButton render
```



## 注意事项

由于context使用引用标识来决定是否需要重新渲染，在某些情况下可能会导致意外的渲染。例如下面的例子，App重新渲染时会导致所有订阅context的组件重新渲染，因为App渲染后`Provider`的值都是新的引用：

```js
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

为了避免这种情况，可以提升变量至state：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

