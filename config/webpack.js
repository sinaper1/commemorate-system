const { pathFn } = require('./utils');
const modules = require('./moduleConfig');
const webpack = require('webpack')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: pathFn('./src/index.jsx'),
    output: {
        path: pathFn('./dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@com': pathFn('./src/components'),
            '@assets': pathFn('./src/assets'),
            '@views': pathFn('./src/views'),
            // '@container': pathFn('./src/store/container'),
            // '@store': pathFn('./src/store'),
            // '@env': pathFn('./src/env'),
            '@api': pathFn('./src/api'),
            '@svg': pathFn('./src/assets/svg'),
            '@utils': pathFn('./src/utils'),
            '@images': pathFn('./src/assets/images'),
            '@mock': pathFn('./src/mock'),
        },
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    //     })
    // ],
    module: modules,
}
