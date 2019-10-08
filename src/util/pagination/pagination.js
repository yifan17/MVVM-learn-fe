require('./pagination.css');
var _mm = require('util/mm.js');
var templatePage = require('util/pagination/pagination.string');
var pagination = function(){
    var _this = this;
    this.defaultOption = {
        container : null,
        pageNum : 1,
        pageRange : 3,
        onSelectPage : null
    };
    // 点击事件处理
    $(document).on('click','.pg-item',function(){
        $this = $(this);
        if($this.hasClass('active')|| $this.hasClass('disable')){
            return;
        };
        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;
    })
};
// 渲染分页组件
pagination.prototype.render = function(userInfo){
    this.option = $.extend({},this.defaultOption,userInfo);
    // 这里container有可能传的不是jquery对象，做了一个容错处理
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 只有一页的时候不显示分页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html
pagination.prototype.getPaginationHtml = function(){
    var html = '',
        pageArray= [],
        option = this.option,
        start = (option.pageNum - option.pageRange) > 0
            ? (option.pageNum - option.pageRange) : 1,
        end = (option.pageNum + option.pageRange) < option.pages
            ?(option.pageNum + option.pageRange) : option.pages;
        // 添加上一页按钮的数据
        pageArray.push({
            name : '上一页',
            value : this.option.prePage,
            disable : !this.option.hasPreviousPage
        });
        // 数字显示
        for(var i = start; i <= end; i++){
            pageArray.push({
                name : i,
                value : i,
                active : (i === option.pageNum)
            });
        };
        // 添加下一页按钮的数据
        pageArray.push({
            name : '下一页',
            value : this.option.nextPage,
            disable : !this.option.hasNextPage
        });
        html = _mm.renderHtml(templatePage,{
            pageArray : pageArray,
            pageNum : option.pageNum,
            pages : option.pages
        })
        return html;
}
module.exports = pagination;