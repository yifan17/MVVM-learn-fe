require('./result.css');
require('page/common/nav-simple/nav-simple.js');
var _mm = require('util/mm.js')

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        // 显示对应的页面
        $element.show();
})