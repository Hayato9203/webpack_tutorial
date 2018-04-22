const htmlWebpackPlugin = require('html-webpack-plugin')
// 把页面src引入文件的方式，改成用script标签嵌入的方式，减少http请求(提高加载性能）
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const path = require('path')

module.exports = {
    entry: {
        main: './src/scripts/main.js',
        a: './src/scripts/a.js',
        b: './src/scripts/b.js',
        c: './src/scripts/c.js'
    },
    // 打包输出
    output: {
        // 输出的绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 上面entry的文件名
        filename: 'js/[name]-[chunkhash].bundle.js',
        // entry的前缀
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        new htmlWebpackPlugin({
            // 全部内嵌
            inlineSource: '.(js|css)$',
            // 生成的文件名
            filename: 'a.html',
            // 使用的模板
            template: 'index.html',
            inject: 'body',
            title: 'this is a.html',
            chunks: ['main', 'a'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new htmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            filename: 'b.html',
            template: 'index.html',
            chunks: ['main', 'b'],
            inject: 'body',
            title: 'this is b.html'
        }),
        new htmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            filename: 'c.html',
            template: 'index.html',
            excludeChunks: ['main', 'a', 'b'],
            inject: 'head',
            title: 'this is c.html'
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    module: {
        rules: [
            {
                // css打包
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
}