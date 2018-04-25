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
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                include: /src/,
                loader: "babel-loader",
                query: {
                    presets: ['latest']
                },
            },
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
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
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
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!postcss-loader!sass-loader'
            },{
                test: /\.html$/,
                exclude: path.resolve(__dirname, 'index.html'),
                loader: 'html-loader'
            }
        ]
    }
}