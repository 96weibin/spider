const http = require('http');
const https = require('https');
const urlLib = require('url')
const assert = require('assert')


module.exports = async function (url, reqHeaders) { //处理重定向  返回body、headers
    try {
        while (true) {
            let { statusCode, body, headers } = await sendReqest(url, reqHeaders);
            let location = headers.location;
            if (statusCode == 200) {
                return { body, headers }
            } else {
                assert(statusCode == 301 || statusCode == 302)
                assert(headers.location)
                url = headers.location;
            }
        }
    } catch (err) {
        console.log('失败', err)
    }
}


function sendReqest(url, headers) {     //发送请求的函数
    let urlObj = urlLib.parse(url)
    let protocolSerive = null;
    if (urlObj.protocol == 'http:') {
        protocolSerive = http;
    } else if (urlObj.protocol == 'https:') {
        protocolSerive = https;
    } else {
        throw new Error(`no such protocol ${urlObj.protocol}`)
    }

    return new Promise((resolve, reject) => {
        let req = protocolSerive.request({
            host: urlObj.host,
            path: urlObj.path,
            headers
        }, res => {
            let statusCode = res.statusCode
            if (statusCode >= 200 && statusCode < 300 || statusCode == 304) {
                let arr = [];
                res.on('data', data => {           //成功返回数据
                    arr.push(data)
                })
                res.on('end', () => {
                    let buffer = Buffer.concat(arr)         //buffer.concat
                    resolve({
                        statusCode: 200,
                        body: buffer,
                        headers: res.headers
                    })
                })

            } else if (statusCode == 301 || statusCode == 302) {
                resolve({
                    statusCode: statusCode,
                    body: null,
                    headers: res.headers
                })
            } else {
                reject({
                    statusCode: statusCode,
                    body: null,
                    headers: res.headers
                })
            }
        })
        // req.write()     //post 数据  只能write字符串  stringfy
        req.end()       //关闭连接
    })

}
