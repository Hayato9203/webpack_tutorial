const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['latest']
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: 'css-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // 生成的文件名
            filename: 'index.html',
            // 使用的模板
            template: 'index.html',
            inject: true
        }),
        new MinifyPlugin()
    ],
    mode: 'development'
}