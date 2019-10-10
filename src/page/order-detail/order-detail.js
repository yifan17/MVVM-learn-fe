require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./order-detail.css');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var orderDetailTemplate = require('./order-detail.string');
var page = {
    data : {
        orderNo : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name : 'order-list'
        })
        this.loadOrderDetail();
        
    },
    bindEvent : function(){
        var _this = this;
        //点击取消订单
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确定取消订单吗？')){
                _order.cancelOrder({orderNo : _this.data.orderNo},
                    function(res){
                        _mm.successTips('取消成功！');
                        _this.loadOrderDetail();
                    },function(errMsg){
                        _mm.errorTips(errMsg)
                    })
            }
        }) 
    },
    // 渲染订单详情
    loadOrderDetail : function(){
        var _this = this,
            $content = $('.content'),
            orderDetailHtml = '';
        _order.getOrderDetail({orderNo : this.data.orderNo},
            function(res){
                _this.dataFilter(res);
                orderDetailHtml = _mm.renderHtml(orderDetailTemplate,res);
                $content.html(orderDetailHtml);
            },function(errMsg){
                $content.html('<p class="err-tip">'+errMsg+'</p>');
            })
    },
    // 根据订单状态渲染模版
    dataFilter : function(data){
        data.needPay = data.status === 10;
        data.isCancelable = data.status === 10;
    }
}
$(function(){
    page.init();
})