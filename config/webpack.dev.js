const { merge } = require('webpack-merge');
const { pathFn } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack');
// const ENV = require('../production')

/**
 * @type {import('webpack').Configuration}
 */
const devConfig = {
    mode: 'development',
    entry: pathFn('./src/index.jsx'),
    output:{
        publicPath:'/home/'
    },
    devServer: {
        // publicPath: '/home/',
        devMiddleware:{
            publicPath: "/home/",
        },
        // contentBase: '/home/', // 指定服务器资源的根目录
        static : {
            directory : '/home/'
        },
        hot: true,
        host: 'localhost',
        port: 3008,
        // disableHostCheck: true,
        historyApiFallback: {
            index:'/home/index.html'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '照片墙',
            template: pathFn('./public/index.html'),
            // config: `window.config = ${JSON.stringify(ENV)}`,
        }),
    ],
    devtool: "inline-source-map",
}

module.exports = merge(baseConfig, devConfig)