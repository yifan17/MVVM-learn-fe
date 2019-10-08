require('./cart.css');
require('page/common/header/header.js');
var nav             = require('page/common/nav/nav.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateCart    = require('./cart.string');
var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // 点击复选框,选中或者取消商品选择
        $(document).on('click','.cart-select',function(e){
            var productId = $(this).parents('.cart-table').data('product-id');
            // 判断复选框的状态
            if($(this).is(':checked')){
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showError(errMsg);
                })
                e.stopPropagation();
            }else{
                _cart.unSelectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showError(errMsg);
                })
                e.stopPropagation();
            }
        })
        // 选中或者取消全选
        $(document).on('click','.cart-select-all',function(e){
            if($(this).is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showError(errMsg);
                })
            }else{
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showError(errMsg);
                }) 
            }
            e.stopPropagation();
        })
        // 删除单个商品
        $(document).on('click','.cart-delete',function(e){
            if(window.confirm('确认要删除该商品吗？')){
                // 这里报了500的错，因为productId值不对
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteProduct(productId);
            }
            e.stopPropagation();
        })
        // 点击删除选中
        $(document).on('click','.delete-selected',function(e){
            if(window.confirm('是否要删除选中的商品？')){
                var productIdsArr = [],
                $selectItem = $('.cart-select:checked');
                for(var i = 0,len = $selectItem.length;i < len;i++){
                    // 这里记得在外层加$()
                    productIdsArr.push($($selectItem[i]).parents('.cart-table').data('product-id'));
                }
                if(productIdsArr.length){
                    _this.deleteProduct(productIdsArr.join(','));
                }else{
                    _mm.errorTips('请您选择要删除的商品')
                }
            }
            e.stopPropagation();
        })
        // 更新商品数量
        $(document).on('click','.count-btn',function(e){
            var $this = $(this),
                $count = $this.siblings('.count-input'),
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($count.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                newCount = 0,
                minCount = 1,
                maxCount = parseInt($count.data('max'));
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已经达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            _this.updateProduct(productId,newCount);
            e.stopPropagation();
        })
        // 商品数量文本框直接修改数量
        $(document).on('blur','.count-input',function(e){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($this.val()),
                newCount = 1,
                minCount = 1,
                maxCount = parseInt($this.data('max'));
            if(!currCount){
                $this.val(newCount);
            }
            if(currCount <= minCount){
                $this.val(minCount);
            }else if(currCount >= maxCount){
                $this.val(maxCount);
            }
            newCount = parseInt($this.val())
            _this.updateProduct(productId,newCount);
            e.stopPropagation();
        })
        // 点击去结算
        $(document).on('click','.btn-submit',function(){
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品以后再结算');
            }
            e.stopPropagation();
        })
    },
    loadCart : function(){
        var _this = this;
        _cart.getCartList(function(res){
            _this.renderCart(res);
        },function(errMsg){
            _mm.errTips(errMsg);
        });
    },
    // 更新商品数量
    updateProduct : function(productId,newCount){
        var _this = this;
        _cart.updateProduct({
            productId : productId,
            count     : newCount
        },function(res){
            _this.renderCart(res);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    // 渲染购物车
    renderCart : function(data){
        this.filter(data);
        this.data.cartInfo = data;
        var cartHtml= _mm.renderHtml(templateCart,data);
        $('.page-wrap').html(cartHtml);
        nav.loadCartCount();
    },
    // 删除商品
    deleteProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds,function(res){
            _this.renderCart(res);
        },function(errMsg){
            _this.showError(errMsg);
        })
    },
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length
    },
    // 错误信息显示
    showError : function(errMsg){
        $('page-wrap').html('<p class="err-tip">' + errMsg + '</p>')
    }
}
$(function(){
    page.init();
})