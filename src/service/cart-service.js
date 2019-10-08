var _mm = require('util/mm.js')
var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    // 加入购物车
    addToCart : function(cartInfo, resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/add.do'),
            data : cartInfo,
            success : resolve,
            error : reject
        })
    },
    // 加载购物车列表
    getCartList : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    },
    // 选中购物车商品
    selectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        })
    },
    // 取消选中购物车中的商品
    unSelectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        })
    },
    // 购物车内点击全选
    selectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        })
    },
    // 购物车内取消全选
    unSelectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        })
    },
    // 删除购物车内的商品
    deleteProduct : function(productIds,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/delete_product.do'),
            data : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        })
    },
    // 更新商品数量
    updateProduct : function(productInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _cart;