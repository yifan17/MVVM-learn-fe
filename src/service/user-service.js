var _mm = require('util/mm.js');
var _user = {
    //  登录
    login: function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 检查用户登录，获取用户登录信息
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 退出登录
    logout : function(resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 检查用户名是否存在
    checkUsername : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type: 'username',
                str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 获取用户信息
    getUserInfo : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 更新用户信息
    updateUserInfo : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject
        })
    },
    // 注册
    register : function(formData,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : formData,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 忘记密码之获取问题
    getQuestion : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 检查问题答案是否正确
    checkAnswer : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl(' /user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 忘记密码
    resetPassword : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl(' /user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    // 修改密码
    updatePassword : function(passwords,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/reset_password.do'),
            data    : passwords,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _user;