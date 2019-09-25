require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./user-pass-update.css');
var navSide = require('page/common/nav-side/nav-side.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var page = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        navSide.init({name : 'user-pass-update'})
    },
    bindEvent : function(){
        var _this = this;
        $('.btn-submit').click(function(){
            var formData = {
                passwordOld : $.trim($('#password').val()),
                passwordNew : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
                validateResult = _this.formValidate(formData);
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld : formData.passwordOld,
                    passwordNew : formData.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validate(formData.passwordOld,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew < 6){
            result.msg = '密码不能少于6位';
            return result;
        }
        if(formData.passwordConfirm != formData.passwordNew){
            result.msg = '两次密码不同';
            return result;
        }
        result.status = true
        result.msg = '设置成功'
        return result;
    }
}
$(function(){
    page.init();
})