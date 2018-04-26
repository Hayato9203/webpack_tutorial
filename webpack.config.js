const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const path = require('path')

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        // 指定dist为root
        publicPath: './'
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
    module: {
        rules: [
            // js文件es转换
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /src/,
                loader: "babel-loader",
                query: {
                    presets: ['latest']
                },
            },
            // 处理css文件
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", {
                    loader: 'css-loader',
                    // 指定css-loader之前有1个postcss-loader还要加载,让css文件中的@import也经过该loader
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        config: {
                            path: path.resolve(__dirname, 'postcss.config.js')
                        },
                        plugins: [
                            require('autoprefixer')({
                                browsers: ['last 5 versions']
                            }),
                            require('cssnano')()
                        ]
                    }
                }]
            },
            // 处理less,注意要有css-loader,不然不会把postcss转换后的的css中的url()绑定静态资源
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            // 处理scss
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            // 处理html模板
            {
                test: /\.html$/,
                exclude: path.resolve(__dirname, 'index.html'),
                loader: 'html-loader'
            },
            // 处理ejs模板
            {
                test: /\.ejs$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ejs-loader'
            },
            // 处理静态资源
            {
                test: /\.(jpg|png|gif|svg)$/i,
                // 使用url-loader当文件>200K时，直接给file-loader,不然就生成base64编码嵌入js中
                use: ['url-loader?limit=20000&name=images/[name].[hash:8].[ext]']
            }
        ]
    }
}