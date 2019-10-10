var navSideTemplate = require('./nav-side.string');
var _mm = require('util/mm.js');
require('./nav-side.css');
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center',desc : '个人中心',href : './user-center.html'},
            {name : 'order-list',desc : '我的订单',href : './order-list.html'},
            {name : 'user-pass-update',desc : '修改密码',href : './user-pass-update.html'},
			{name : 'about',desc : '关于网站',href : './about.html'}
        ]
    },
    init : function(option){
        // this.option.name = option
        // 用extend实现一下，这里接收的应该是一个对象了{name : user-center}
        $.extend(this.option,option)
        this.renderNav();
        
    },
    // 渲染侧边导航
    renderNav : function(){
        // 判断active
        for(var i = 0,iLen = this.option.navList.length; i < iLen; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        // 渲染list数据
        var navHtml = _mm.renderHtml(navSideTemplate,{
            navList : this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
}
module.exports = navSide;