var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}
var config = {
    entry: {
        'common': ['./src/page/common/common.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/login.js']
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
                test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=/resource/[name].[ext]'
            }
        ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
}
// 这里是为了处理在不同环境下，要配置不同的参数
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;