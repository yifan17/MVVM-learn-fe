var _mm = require('util/mm.js');
var _order = {
    // 获取订单的商品信息
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
    }
}
module.exports = _order;