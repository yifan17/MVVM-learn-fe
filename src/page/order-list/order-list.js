require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./order-list.css');
var Pagination = require('util/pagination/pagination.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var orderListTemplate = require('./order-list.string');
var page  = {
    data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        navSide.init({
            name : 'order-list'
        })
        this.loadOrderList();
    },
    // 渲染列表
    loadOrderList : function(){
        var _this    = this,
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(_this.data.listParam,
            function(res){
                var orderListHtml = _mm.renderHtml(orderListTemplate,res);
                $listCon.html(orderListHtml);
                _this.loadPagination({
                    hasPreviousPage : res.hasPreviousPage,
                    prePage : res.prePage,
                    hasNextPage : res.hasNextPage,
                    nextPage : res.nextPage,
                    pageNum : res.pageNum,
                    pages : res.pages
                })
            },function(errMsg){
                $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>')
            }
        )
    },
    // 渲染分页
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }))
    }
}
$(function(){
    page.init();
})