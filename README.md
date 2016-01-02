UCMS Core [![Build Status](https://travis-ci.org/ucms/ucms-core.svg?branch=master)](https://travis-ci.org/ucms/ucms-core)
===========

基于Koa、React搭建的CMS系统，拥有良好的性能、可插件化、以及对React Native友好的API。

本模块为UCMS的核心模块。

## API 

### startServer(port, host)

启动应用并监听服务器。

* port 监听服务器的端口号
* host 监听服务器的主机名
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

### class UCMSError(message, status)

通常用于抛出一个带有状态码的错误。message会被作为响应体的message字段发送给客户端，而status会作为HTTP状态码发送给客户端。

## 过滤器

### SERVER.INIT: (app)

在服务器启动之前被调用。 

- app: Koa App对象。

### SERVER.INIT_ROUTE + '/': (router)

初始化根路由时调用。

- router: Koa-Router对象。

### SERVER.WILL_LISTEN: (app)

开始监听服务器之前调用。

- app: Koa App对象。

### SERVER.DID_LISTEN: (app)

成功监听服务器之后调用。

- app: Koa App对象。

### OBJECTS.GEN_ID: (type)

为指定类型的对象生成一个新的ID。返回一个新的ID。

### OBJECTS.SAVE: (type, id, doc)

尝试直接保存对象。不论对象之前是否已经存在。

### OBJECTS.LOAD: (type, id)

加载一个对象的详细信息。

### OBJECTS.DELETE: (type, id)

删除一个对象。

### OBJECTS.UPDATE: (type, id, updater)

更新一个对象。

- updater: value=>newValue 更新函数，参数是原来的对象，应返回更新后的对象。当出现写冲突的时候，updater可能会被多次调用。
