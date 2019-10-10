require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('./user-center-update.css');
var navSide = require('page/common/nav-side/nav-side.js');
var updateTemplate = require('./user-center-update.string');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var page = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            _this.submit();
        });
        $(document).on('keyup','.user-info',function(e){
            if(e.keyCode === 13){
                _this.submit();
                e.stopPropagation();
            }
        })
    },
    onload : function(){
        navSide.init({name: 'user-center'});
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.getUserInfo(function(res){
            userInfoHtml = _mm.renderHtml(updateTemplate,res);
            $('.panel-body').html(userInfoHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    // 验证用户信息
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确！'
            return result;
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确'
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '请填写问题'
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '请填写问题对应的答案'
            return result;
        }
        result.status = true;
        result.msg = '通过验证';
        return result;
    },
    // 提交
    submit : function(){
        var formData = {
            phone   : $.trim($('#phone').val()),
            email   : $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer  : $.trim($('#answer').val())
        },
            validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.updateUserInfo(formData,function(res,msg){
                console.log('success',msg);
                _mm.successTips(msg)
            },function(errMsg){
                console.log('error',errMsg);
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(validateResult.msg);
        }
    }
}
$(function(){
    page.init();
})