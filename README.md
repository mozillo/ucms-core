UCMS Core [![Build Status](https://travis-ci.org/facebook/react-native.svg?branch=master)](https://travis-ci.org/facebook/react-native)
===========

基于Koa、React搭建的CMS系统，拥有良好的性能、可插件化、以及对React Native友好的API。

本模块为UCMS的核心模块，具有如下接口：

### startServer(options)

启动应用并监听服务器。

* options.host 监听服务器的主机名
* options.port 监听服务器的端口号
* 返回一个Promise，包含服务器启动过程中出现的错误，或是成功启动的结果。

### addFilter(name, filter, priority=0)

添加过滤器。

* name      过滤器所监听事件的名字。
* filter    过滤器函数，可以是一个同步函数（返回一个值）或异步函数（async function，或返回一个Promise）
* priority  优先级。相同优先级的过滤器，会按照添加顺序排序。

### applyFilter(name, ...args)

依次调用对应事件的所有过滤器，直到有一个返回真值为止，后续的函数不会被调用。
如果有函数返回真值，则返回该值。如果没有函数返回真值，则返回最后一个过滤器返回的值。
异步：如果过滤器返回的是一个Promise，那么会等到Promise结束之后再调用后续的filter。applyFilter本身是一个异步函数，返回一个Promise。

### doAction(name, ...args)

实际上也是调用过滤器，但它假设所有的过滤器函数都返回假值，这意味着所有的过滤器函数都被执行了。
如果有任何一个过滤器返回了真值，doAction会返回一个被拒绝了的Promise（相当于异步函数抛出了一个异常）。
