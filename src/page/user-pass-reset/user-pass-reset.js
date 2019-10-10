require('./user-pass-reset.css');
require('page/common/nav-simple/nav-simple.js');
var _user = require('service/user-service.js');
//getQuestion checkAnswer resetPassword
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}
var page = {
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 步骤一
        $('#submit-username').click(function(){
            _this.usernameSubmit();
        });
        // 步骤二
        $('#submit-question').click(function(){
            _this.answerSubmit();
        });
        // 步骤三
        $('#submit-password').click(function(){
            _this.newPassword();
        });
        // 回车提交
        $('.user-content').keyup(function(e){
            var nowId = $(this).attr('id');
            if(e.keyCode === 13){
                if('username' == nowId){
                    _this.usernameSubmit();
                }else if('answer' == nowId){
                    _this.answerSubmit();
                }else if('password' == nowId){
                    _this.newPassword();
                }
            }
        })
    },
    // 第一步提交（输入用户名后提交）
    usernameSubmit : function(){
        var username = $.trim($('#username').val());
        var _this = this;
        if(username){
            _user.getQuestion(username,function(res){
                formError.hide();
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
            },function(errMsg){
                formError.show(errMsg);
            })
        }else{
            formError.show('请输入用户名');
        }
    },
    // 第二步提交（输入问题答案后提交）
    answerSubmit : function(){
        var answer = $.trim($('#answer').val());
        var _this = this;
        var userInfo = {
            username : _this.data.username,
            question : _this.data.question,
            answer   : answer
        }
        if(answer){
            _user.checkAnswer(userInfo,function(res){
                _this.data.answer = answer;
                _this.data.token = res;
                _this.loadStepNewPass();
            },function(errMsg){
                formError.show(errMsg);
            })
        }else{
            formError.show('请输入密码提示问题答案');
        }
    },
    // 第三步提交（输入新密码后提交）
    newPassword : function(){
        var passwordNew = $.trim($('#password').val());
        var _this = this;
        var userInfo = {
            username : _this.data.username,
            passwordNew : passwordNew,
            forgetToken : _this.data.token
        }
        if(passwordNew && passwordNew.length >= 6){
            _user.resetPassword(userInfo,function(res){
                window.location.href = './result.html?type=pass-reset';
            },function(errMsg){
                formError.show(errMsg);
            })
        }else{
            formError.show('密码不能少于6位');
        }
    },
    // 输入用户名（步骤一显示）
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 输入问题答案（步骤二显示）
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 输入新密码（步骤三显示）
    loadStepNewPass : function(){
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
}
$(function(){
    page.init();
})