const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');

function html2$(str){
    let document = new JSDOM(str).window.document;
    return document.querySelectorAll.bind(document)
}

fs.readFile('./tmp/taobao.html',(err,buffer)=>{
    if(err){
        console.log('读取失败')
    } else {
        let $ = html2$(   html2$(buffer.toString())('textarea.f1')[0].value)
        let datas = Array.from($('li')).map(li=>{
            return {
                url : li.children[0].children[0].href,
                name : li.children[0].children[1].children[0].innerText,
                cpu : li.children[0].children[1].children[1].innerText,
                // price : li.children[0].children[2].children[0].innerText.replice('¥',''),
                // sales : li.children[0].children[2].children[2].innerText.replice('已售:','')  
            }
            
        })
        // console.log(html2$(buffer.toString())('textarea.f1')[0].value)
        console.log(datas)
    }
})

// let json = Array.from(oUl.children).map(li=>{
//     return{
//         url : li.children[0].children[0].href,
//         name : li.children[0].children[1].children[0].innerText,
//         cpu : li.children[0].children[1].children[1].innerText,
//         price : li.children[0].children[2].children[0].innerText.replice('¥',''),
//         sales : li.children[0].children[2].children[2].innerText.replice('已售:','')  
        

//     }
// })
// console.log(oUl)