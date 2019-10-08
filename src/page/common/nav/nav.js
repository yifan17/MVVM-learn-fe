require('./nav.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init: function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //点击登录
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 点击注册
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        })
        // 点击购物车
        
        // 退出登录
        $('.js-logout').click(function(){
            _user.logout(function(){
                window.location.reload();
            },function(errMsg){
                _mm.errorTip(errMsg);
            });
        })
    },
    // 加载用户信息
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        }, function(errMsg){
            console.log(errMsg);
        })
    },
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        },function(errMsg){
            $('.nav .cart-count').text(0);
        })
    }
}
module.exports = nav.init();