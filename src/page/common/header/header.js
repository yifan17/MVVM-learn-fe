require('./header.css');
var _mm = require('util/mm.js');
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad :function(){
        var keyWord = _mm.getUrlParam('keyword');
        $('#search-input').val(keyWord);
    },
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchProduct();
        })
        $('#search-btn').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchProduct();
            }
        })
    },
    // 执行搜索
    searchProduct : function(){
        var keyword = $.trim(_mm.getUrlParam('keyword'));
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
        
    }
}
$(function(){
    page.init();
})