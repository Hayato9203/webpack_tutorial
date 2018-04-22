const htmlWebpackPlugin = require('html-webpack-plugin')
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
        filename: 'js/[name]-[chunkhash].js',
        // entry的前缀
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        new htmlWebpackPlugin({
            // 生成的文件名
            filename: 'a.html',
            // 使用的模板
            template: 'index.html',
            inject: false,
            title: 'this is a.html'
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            inject: false,
            title: 'this is b.html'
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            inject: false,
            title: 'this is c.html'
        })
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