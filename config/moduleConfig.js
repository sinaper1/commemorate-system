const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { pathFn } = require('./utils');

module.exports = {
    rules: [
        {
            test: /\.js|jsx/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['import', { libraryName: 'antd', style: true }],
                        ],
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
        // antd样式文件
        {
            test: /\.less$/,
            include: /[\\/]node_modules[\\/](antd)[\\/]/,
            use: [
                process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader', 'css-loader',
                {
                    loader: 'less-loader', options: {
                        lessOptions: {
                            javascriptEnabled: true,
                        }
                    }
                }
            ],
        },
        {
            test: /\.less$/,
            include: pathFn("./src"),
            use: [
                process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader', 'css-loader', 'less-loader',
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [pathFn('./src/assets/style/theme.less'), pathFn('./src/assets/style/util.less')],
                    },
                },
            ],
        },
        {
            test: /\.css$/,
            use: [
                process.env.NODE_ENV === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader', 'css-loader',
                ]
        },
        {
            test: /\.svg$/,
            loader: "svg-sprite-loader",
            include: pathFn("./src/assets/svg"),
            options: {
                symbolId: "icon-[name]"
            }
        },
        // img优化
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            include: pathFn('./src'),
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // 默认单位为bytes
                        outputPath: 'images/',
                    },
                },
            ],
        },
    ],
};