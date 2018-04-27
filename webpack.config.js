const htmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// const MinifyPlugin = require("babel-minify-webpack-plugin")
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    devtool: 'eval-source-map',
    mode: 'production',
    // 处理async/await
    entry: ['babel-polyfill', './src/app.js'],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        // 指定dist为root
        publicPath: './'
    },
    plugins: [
        new htmlWebpackPlugin({
            // 内联js与css
            // inlineSource: '.(js|css)$',
            // 生成的文件名
            filename: 'index.html',
            // 使用的模板
            template: 'index.html',
            inject: true,
            // 精简html
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true
            }
        }),
        // // 压缩js
        // new MinifyPlugin(),
        // // 内联js与css
        // new HtmlWebpackInlineSourcePlugin()
        new UglifyJSPlugin()
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
                use: ['url-loader?limit=10000&name=images/[name].[hash:8].[ext]',
                    // 'image-webpack-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            optipng: {
                                enabled: true,
                                optimizationLevel: 3
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 2
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    }
}