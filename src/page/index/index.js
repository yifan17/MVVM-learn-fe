require('page/common/header/header.js');
require('page/common/nav/nav.js');
require('./index.css');
require('util/slider/slider.js');
var templateFloor = require('./floor.string');
var templateSlider = require('./index.string');
var _mm = require('util/mm.js');
var floorData = require('./floorData.js');
var page = {
    init : function(){
        this.renderFloor();
        this.renderBanner();
        this.slider();
    },
    // 这里没有动态图片，没法获取动态图片链接，所以都直接只用了一张！
    renderFloor : function(){
        var html = _mm.renderHtml(templateFloor,{
            floorData : floorData
        });
        $('.floor').html(html);
    },
    // 渲染banner的html
    renderBanner : function(){
        var bannerSlider = _mm.renderHtml(templateSlider);
        $('.banner-con').html(bannerSlider);
    },
    // slider轮播
    slider : function(){
        var unslider = $('.banner').unslider({
            dots: true
        });
        $('.banner-arrow').click(function() {
            var fn = this.className.split(' ')[1];
            //  Either do unslider.data('unslider').next() or .prev() depending on the className
            unslider.data('unslider')[fn]();
        });
    }
}
$(function(){
    page.init()
});