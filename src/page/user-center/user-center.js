var userCenterTemplate = require('./user-center.string');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./user-center.css');
var navSide = require('page/common/nav-side/nav-side.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
navSide.init({name : 'user-center'});
var page = {
    // 初始化
    init : function(){
        this.onLoad();
    },
    // 
    onLoad : function(){
        navSide.init({name : 'user-center'});
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        _user.getUserInfo(function(res){
             var userCenterHtml = _mm.renderHtml(userCenterTemplate,res);
             $('.panel-body').html(userCenterHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
}
$(function(){
    page.init();
})