var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    }
}
var config = {
    entry: {
        'common'            : ['./src/page/common/common.js'],
        'index'             : ['./src/page/index/index.js'],
        'user-login'        : ['./src/page/user-login/user-login.js'],
        'user-register'     : ['./src/page/user-register/user-register.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/user-pass-reset.js'],
        'user-center'       : ['./src/page/user-center/user-center.js'],
        'user-center-update': ['./src/page/user-center-update/user-center-update.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/user-pass-update.js'],
        'about'             : ['./src/page/about/about.js'],
        'list'              : ['./src/page/list/list.js'],
        'detail'            : ['./src/page/detail/detail.js'],
        'cart'              : ['./src/page/cart/cart.js'],
        'order-confirm'     : ['./src/page/order-confirm/order-confirm.js'],
        'order-list'        : ['./src/page/order-list/order-list.js'],
        'order-detail'        : ['./src/page/order-detail/order-detail.js'],
        'payment'           : ['./src/page/payment/payment.js'],
        'result'            : ['./src/page/result/result.js']
        
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    // 这个就是用来引入外部的模块或者是变量
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            { 
                test: /\.string$/, 
                loader: 'html-loader'
            },
            { 
                test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=/resource/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias : {
            node_modules: __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    // 终于可以抛弃charles了，处理前后端分离的跨域问题，这是最喜欢的webpack里的配置了
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    },
    plugins: [
        // 打包公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 处理css
        new ExtractTextPlugin("css/[name].css"),
        // 处理html
        // 这里的参数千万不要忘记加''
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','忘记密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','用户信息更新')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于网站')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
}
// 这里是为了处理在不同环境下，要配置不同的参数
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;