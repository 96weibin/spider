const request = require('./libs/request')

const fs = require('fs');
const pathLib = require('path');

(async()=>{     //抓淘宝首页
    let {statusCode,body,headers} = await request('https://shouji.tmall.com/')
    fs.writeFile('./tmp/taobao.html',body,err=>{
        if(err){
            console.log(err)
        }
    })
})()

