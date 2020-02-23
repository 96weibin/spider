const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;

let f = fs.readFileSync('./test.html','utf8')
let dom = new JSDOM(f.toString()).window.document;
console.log(dom)
let t = dom.querySelectorAll('textarea')
console.log(t[0].innerHTML)