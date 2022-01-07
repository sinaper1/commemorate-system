const { merge } = require('webpack-merge');
const { pathFn } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack')

/**
 * @type {import('webpack').Configuration}
 */
const devConfig = {
    mode: 'development',
    entry: {
        bundle: pathFn('./src/index.jsx'),
    },
    output: {
        filename: "bundle.js",
        publicPath: '/home/'
    },
    devServer: {
        // publicPath: '/home/',
        devMiddleware:{
            publicPath: "/home/",
        },
        // contentBase: '/home/',
        static : {
            directory : '/home/'
        },
        hot: true,
        host: 'localhost',
        port: 3008,
        // disableHostCheck: true,
        historyApiFallback: {
            index: '/home/index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '照片墙',
            template: pathFn('./public/index.html'),
        }),
    ],
    devtool: "inline-source-map",
}

module.exports = merge(baseConfig, devConfig)