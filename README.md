# spider

## 抓取数据

服务端 http、https 发送请求request 通过设置路径、模拟headers、冒充用户对服务器进行访问，以获得数据的手段

libs/request 模块 可以传host、header 进行爬数据

返回值 

body header

## 数据解析

    获取数据 通过jsdom模块 变成dom对象,进行dom操作获取页面上的数据
    