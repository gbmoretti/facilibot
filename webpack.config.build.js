const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    devtool: 'eval',
    output: {
        pathinfo: true,
        publicPath: "/facilibot/",
        filename: '[name].js'
    },
    devServer: {
        host: '0.0.0.0'
    }
});
