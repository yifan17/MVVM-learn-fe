require('./user-register.css');
require('page/common/nav-simple/nav-simple.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
// 表单里错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}
// 逻辑部分
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        // 验证username是否存在
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        })
        // 点击注册按钮
        $('#submit').click(function(){
            _this.submit();
        });
        // 按回车提交
        $('.user-content').keyup(function(e){
            if(e.code === 13){
                _this.submit();
            }
        })
    },
    submit: function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#passwordConfirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            })
        }else{
            formError.show(validateResult.msg);
        }
    },
    // 验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码最少6位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次密码不同';
            return result;
        }
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '答案不能为空';
            return result;
        }
        // 验证都通过以后
        result = {
            status : true,
            msg : '通过验证'
        }
        return result;
    }
};
$(function(){
    page.init();
})