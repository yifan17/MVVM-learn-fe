require('page/common/header/header.js');
require('page/common/nav/nav.js');
require('./detail.css');
var templateDetail = require('./detail.string');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var page = {
    data : {
        productId : _mm.getUrlParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadDetail()
        console.log(this.data)
    },
    bindEvent : function(){
        var _this = this;
        // 鼠标划过小图显示相应大图
        $(document).on('mouseenter','.p-img-item',function(){        
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img-con').find('.main-img').attr('src',imgUrl);
        });
        // 点击数量加减按钮
        $(document).on('click','.p-count-btn',function(){
            var $this = $(this),
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.dataDetail.stock || 1;
            if($this.hasClass('plus')){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount)
            }else if($this.hasClass('minus')){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount)
            }
        });
        // 单独填写数量
        $(document).on('blur','.p-count',function(){
            var $pCount = $('.p-count'),
                currCount = parseInt($(this).val()),
                minCount = 1,
                maxCount = _this.data.dataDetail.stock || 1;
            if(currCount){
                if(currCount < minCount){
                    $pCount.val(minCount);
                }
                if(currCount > maxCount){
                    $pCount.val(maxCount);
                }
            }else{
                $pCount.val(minCount);
            }
        })
        // 点击加入购物车按钮
        $(document).on('click','.cart-add',function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count : parseInt($('.p-count').val())
            },function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        })
    },
    loadDetail : function(){
        var _this = this,
            $pageWrap = $('.page-wrap');
        _product.productDetail({
            productId : _this.data.productId
        },function(res){
            _this.filter(res);
            _this.data.dataDetail = res;
            var renderHtml = _mm.renderHtml(templateDetail,res);
            $pageWrap.html(renderHtml);
        },function(errMsg){
            $pageWrap.html("<div class='err-tip'>" + errMsg + "</div>");
        });
    },
    // 处理下subImages这个数据
    filter : function(data){
        // 遇到需要处理的数据就可以写一个这样的函数
        data.subImages = data.subImages.split(',')
    }
}
$(function(){
    page.init();
})