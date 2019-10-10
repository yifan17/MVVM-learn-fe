require('./order-confirm.css');
require('page/common/header/header.js');
require('page/common/nav/nav.js');
var _mm             = require('util/mm.js');
var addressModal    = require('./address-modal.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var page ={
    data : {
        selectAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 地址的添加
        $(document).on('click','.address-add',function(e){
            e.stopPropagation();
            addressModal.show({
                // 判断是新增还是更新
                isUpdate  : false,
                // 成功以后再渲染一遍地址列表
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
        })
        // 编辑地址
        $(document).on('click','.address-update',function(e){
            var shippingId = $(this).parents('.address-item').data('id');
            _address.selectAddress({shippingId : shippingId},function(res){
                addressModal.show({
                    isUpdate  : true,
                    data      : res,
                    onSuccess : function(){
                        _this.loadAddressList();
                    }
                })
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
            
            e.stopPropagation();
        })
        // 选中地址
        $(document).on('click','.address-item',function(e){
            e.stopPropagation();
            _this.data.selectAddressId = $(this).data('id');
            $(this).addClass('active').siblings('.address-item').removeClass('active');
        })
        // 删除地址
        $(document).on('click','.address-delete',function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确定要删除该地址吗？') && shippingId){
               _address.deleteAddress({shippingId : shippingId},function(res){
                    _mm.successTips('删除成功');
                    _this.loadAddressList();
               },function(errMsg){
                    _mm.errorTips('出错啦！');
               })
            }else{
                return;
            }
            
        })
        // 点击提交订单
        $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectAddressId;
            if(!shippingId){
                _mm.successTips('请选择一个收获地址！');
                return;
            }
            _order.addOrder({shippingId : shippingId},function(res){
                window.location.href = './payment.html?orderNumber=' + res.orderNo;
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        })
    },
    // 加载地址列表
    loadAddressList : function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        },function(errMsg){
            $('.address-con').html('<p class="err-tip">' + errMsg + '</p>')
        })
    },
    // 加载商品列表
    loadProductList : function(){
        $('.product-con').html('<div class="loading"></div>');
        _order.getOrderCart(function(res){
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        },function(errMsg){
            window.location.href = './cart.html';
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    },
    // 处理一下小细节，当选中一个地址的时候，再去编辑或者删除另一个一个地址
    // 会影响当前选中地址的选中状态,所以渲染列表的时候要加一个处理列表的函数
    // 这样同时还解决了当选中一个地址以后删除该地址，依然能提交的问题
    addressFilter : function(data){
            if(this.data.selectAddressId){
                var selectAddressIdFlag = true;
                for(var i = 0,length = data.list.length; i < length;i++){
                    if(data.list[i].id === this.data.selectAddressId){
                        data.list[i].isActive = true;
                        selectAddressIdFlag = false;
                    }
                }
            }
            if(selectAddressIdFlag){
                this.data.selectAddressId = null;
            }

    }
}
$(function(){
    page.init();
})