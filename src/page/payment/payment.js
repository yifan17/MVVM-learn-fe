require('./payment.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var templatePayment = require('./payment.string');
var _payment = require('service/payment-service.js');
var _mm = require('util/mm.js');
var payment = {
    data : {
        orderNo : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadPayment();
    },
    loadPayment : function(){
        var _this = this,
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo({orderNo : this.data.orderNo},function(res){
            var paymentHtml = _mm.renderHtml(templatePayment,res);
            $pageWrap.html(paymentHtml);
            // 因为不知道用户什么时候会扫码支付，所以做一个订单监听
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    // 监听订单状态
    listenOrderStatus : function(){
        var _this = this;
        // 做一个轮询
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNo,function(res){
                if(res === true){
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNo;
                }
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        },5e3);
    }
}
$(function(){
    payment.init();
})