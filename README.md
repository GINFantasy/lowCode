# low-code

> low-code即低代码，也可以理解为零代码，换句话说即使没有代码基础，也可以实现Web等页面

此项目布局沿用了PS的界面，大致分为四个区域：
- 顶部Tab
- 左栏LeftSide
- 画布Center
- 右栏RightSide

## 其功能有

拖拽组件/图标、对组件添加事件交互、撤回(后退)、xx(前进)、将画布中的内容保存至本地、清空本地所保存的内容、预览功能、对画布中的组件进行设置(antd自带的组件属性、原生CSS样式、Dom事件)、模拟电脑和平板、手机等屏幕尺寸

## 整个项目大致思路为

一个要拖拽的组件就是一个配置项，比如`Button`组件的配置就是

```js
Button: {
    el: '...'
    options: '...'
},
```

`el`为当前组件所对应的`antd`组件(并不使用原生`dom`)

`options`为当前组件的配置项，例如要在`RightSide`中显示的名称、当前组件中的文字(类似于`innerText`)、自带的`antd`属性(比如`Button`的`type`有`default`、`primary`等自定义属性)、要添加的事件(所有组件默认都会自带`onClick`)等

以上是每个组件在第一次加载完页面时所拥有的默认配置(当真正使用时还会对其扩展)

## 拖拽一个组件到画布，经历了什么？

继续以`Button`组件为例，当开始拖拽`Button`时(此时未放入画布中)会将当前组件所对应的默认配置拷贝一份给`curSideDrag`，此操作是用于渲染默认的样式、事件等。当`Button`组件被拖拽至画布中时，根据其`top`、`left`属性定位至对应的位置(当然，默认的`CSS配置`中并不包含`left`、`right`，所以可以放心大胆的使用它们)，拖拽完毕时，会加工一下`curSideDrag`然后将其添加至`editor`中，由于`React Context`的特性，所以添加完成后`center`会经由`diff`算法后重新渲染，至此，`Button`组件拖拽完毕。

当在画布中选中`Button`组件时，`RightSide`会显示当前组件所有的配置项，修改某个配置项的同时也会修改`curSideDrag`、`editor`(前进和后退只是对editor做了处理)

## editor中有哪些内容

画布中所有的组件配置都会一一存在于`editor`这个数组中，数组中的每位成员就是每个组件的配置项

```js
const editor = [{}, {}, {}]
```

再次以`editor`中的`Button`组件为例：

```js
{
    afterRender: '...',
    el: '...',
    events: '...',
    key: '...',
    options: '...',
    originStyle: '...',
    positions: '...',
    style: '...',
}
```

el：为`Button`组件对应的`antd`组件(因为ui为antd，并不是原生dom)

afterRender：由于存储的`session`格式是`JSON`，而`JSON`无法解析函数等特殊类型，显然`el`就失去了作用，所以使用`afterRender`来代替当前函数，目的就是为了在刷新页面时不会导致画布清空(已缓存的情况)

events：`Button`组件的事件，由于事件也是对应着一个函数，且这个函数无法在本地通过其它形式存储，所以在刷新页面后会导致`Button`组件已绑定的事件失效(预览时是否失效，取决于如何进入/preview页面)

key：`Button`组件的标识(也代表着`Button`组件是画布中的第几个组件)

options： `Button`组件的默认配置

originStyle：`Button`组件的原生样式，例如`Button`组件支持自定义属性`type`，其值可以是`default`、`primary`

position： 当前组件在画布中的位置

style： 当前组件的原生样式，例如文字颜色、背景颜色等
