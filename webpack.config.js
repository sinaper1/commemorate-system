// const { pathFn } = require('./utils');
const path = require('path');
// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // 定义输出目录
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/',
    // filename: 'commemorate-system.bundle.js'  // 定义输出文件名称
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   '@com': pathFn('./src/components'),
    //   '@assets': pathFn('./src/assets'),
    //   '@views': pathFn('./src/views'),
    //   '@container': pathFn('./src/store/container'),
    //   '@store': pathFn('./src/store'),
    //   '@reducers': pathFn('./src/reducers'),
    //   // '@env': pathFn('./src/env'),
    //   // '@api': pathFn('./src/store/api'),
    //   // '@svg': pathFn('./src/assets/svg'),
    //   '@utils': pathFn('./src/utils'),
    //   '@images': pathFn('./src/assets/images'),
    //   '@mock': pathFn('./src/mock'),
    // },
  },
  module: {
    rules: [
      {
        test: /\.js|jsx/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // plugins: [
              //   ['import', { libraryName: 'antd', style: true }],
              // ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                  }
                ],
                '@babel/preset-react'
              ]
            },
          },
        ],
      },
    ]
  },
  devServer: {
    // hot: true, // 热替换
    // contentBase: path.join(__dirname, 'dist'), // server文件的根目录
    // compress: true, // 开启gzip
    // port: 8080, // 端口
    hot: true, // 热替换
    static : {
      directory : path.join(__dirname, "public/")
    },
    compress: true, // 开启gzip
    host: 'localhost',
    port: 8080,
    devMiddleware:{
      publicPath: "https://localhost:3000/dist/",
    },
    // disableHostCheck: true,
    // historyApiFallback: {
    //   index.js:'/home/index.js.html'
    // },
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
    new HtmlWebPackPlugin({
      title: '照片墙',
      template: './public/index.js.html',
      filename: path.resolve(__dirname, 'dist/index.js.html'),
    })
  ]
};