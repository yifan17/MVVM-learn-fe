var _mm = require('util/mm.js');
var _order = {
    // 获取购物车订单的商品信息
    getOrderCart : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        })
    },
    // 创建新订单
    addOrder : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        })
    },
    // 获取我的订单里的订单列表
    getOrderList : function(pageInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : pageInfo,
            success : resolve,
            error   : reject
        })
    },
    // 订单详情
    getOrderDetail : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : orderNo,
            success : resolve,
            error   : reject
        })
    },
    // 取消订单
    cancelOrder : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : orderNo,
            success : resolve,
            error   : reject
        })
    },
}
module.exports = _order;