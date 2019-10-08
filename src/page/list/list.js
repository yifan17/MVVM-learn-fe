require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./list.css');
var _pagination = require('util/pagination/pagination.js');
var templateList = require('./list.string');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var page = {
    data : {
        listParam : {
            keyword : _mm.getUrlParam('keyword') || '',
            categoryId : _mm.getUrlParam('categoryId') || '',
            pageNum : _mm.getUrlParam('pageNum') || 1,
            pageSize : _mm.getUrlParam('pageSize') || 20,
            orderBy : _mm.getUrlParam('orderBy') || 'default'
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 点击排序
        $('.sort-item').click(function(){
            var $this = $(this);
            if($this.data('type') === 'default') {
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active');
                if($this.hasClass('asc')){
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc';
                }else{
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
            }
            _this.loadList();
        })
    },
    // 加载分页
    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new _pagination());
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    },
    // 渲染list
    loadList : function(){
        var _this = this,
            listRender = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
			? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.productList(listParam,function(res){
            // 这里渲染记得传参数要用key : value的形式
                listRender = _mm.renderHtml(templateList,{
                    list : res.list
                });
                $pListCon.html(listRender);
                _this.loadPagination({
                    hasPreviousPage : res.hasPreviousPage,
                    prePage : res.prePage,
                    hasNextPage : res.hasNextPage,
                    nextPage : res.nextPage,
                    pageNum : res.pageNum,
                    pages : res.pages
                });
        },function(errMsg){
           $pListCon.text(errMsg);
        })
    }
}
$(function(){
    page.init()
})