var _mm = require('util/mm.js');
var _address = {
    // 获取地址列表
    getAddressList : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            success : resolve,
            error   : reject
        })
    },
    // 添加收货地址
    addAddress : function(reciverInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : reciverInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 编辑并更新地址
    updateAddress : function(reciverInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : reciverInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 查看具体的地址信息
    selectAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : shippingId,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 删除某个地址
    deleteAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _address;