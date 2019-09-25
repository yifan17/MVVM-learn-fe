// 模块化的方式引入jquery
// var $$ = require('jquery')
// $$('body').html('index~~~~~~')
// require('./index.css');
require("../common/header/header.js");
require("../common/nav/nav.js");
var _mm = require('util/mm.js');
var html = '<div>{{data}}</div>'
var data = {
    data : 123
}
console.log(_mm.renderHtml(html, data))