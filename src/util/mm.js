var conf = {
    serverHost: ''
};
var Hogan = require('hogan.js');
var _mm = {
    // 请求后端数据的方法
    request : function(param){
        var _this = this;
        $.ajax({
            type    : param.method  || 'get',
            url     : param.url     || '',
            dataType: param.type    || 'json',
            data    : param.data    || '',
            success : function(res){
                if(0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }else if(10 === res.status){
                    _this.doLogin();
                }else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error   : function(err){
                typeof param.error === 'function' && param.error(err.status)
            }
        })
    },
    // 去登录页面
    doLogin: function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    // 去首页
    goHome: function(){
        window.location.href = './index.html'
    },
    // 获取服务器地址
    // 这种写法有利于以后接口修改方便
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    // 获取url的参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        // 这里result的返回值是上面正则里括号里的内容，这里真的很神奇。怎么查都查不到
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html,需要模版和数据，两个参数
    renderHtml: function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg){
        alert(msg || '操作成功')
    },
    // 错误提示
    errorTips: function(msg){
        alert(msg || '哪里不对了呢？')
    },
    // 字段验证
    validate: function(value, type){
        var value = $.trim(value);
        // 必填项验证
        if('require' === type) {
            // 和Boolean(value)写法一样，一般都用!!
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if('email' === type){
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
        }
    }

};
module.exports = _mm;