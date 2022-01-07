const { merge } = require('webpack-merge');
const { pathFn } = require('./utils')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack')
/**
 * @type {import('webpack').Configuration}
 */
const proConfig = {
    mode: 'production',
    output: {
        path: pathFn("./dist"),
        filename: `js/[name].[chunkhash].js`,
        chunkFilename: `js/[name].[chunkhash].js`,
        publicPath: "/home/",
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
        // new CopyPlugin({
        //     patterns: [{
        //         from: pathFn('./*'),
        //         to: pathFn('./dist')
        //     }]

        // }),
        new HtmlWebpackPlugin({
            title: '照片墙',
            template: pathFn('./public/index.html'),
            filename: 'index.ejs',
            inject: 'body',
            config: 'window.config = <%- __CONFIG__ %>',
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[name].[contenthash].css",
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                antd: {
                    test: /[\\/]node_modules[\\/](antd)[\\/]/,
                    name: "antd",
                    chunks: "all",
                    priority: 2
                },
                svg:{
                    test:/.svg$/,
                    name:"svg",
                    chunks: "all",
                    priority: 5

                }
            }
        }
    },
}

module.exports = merge(baseConfig, proConfig)