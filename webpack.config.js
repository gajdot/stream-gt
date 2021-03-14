const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    name: 'stream-gt',
    entry: {
        index: './src/scripts/stream-gt.js'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: 'modules/stream-gt/scripts/',
        filename: 'stream-gt.js',
        chunkFilename: 'bundles/[name].[chunkhash:4].js',
        path: path.resolve(__dirname, 'dist/scripts/'),
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};