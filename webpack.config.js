const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/scripts/mainModule.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [{ 
            test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/
            },
            {
            test: /\.css$/,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),'css-loader',]
            },
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
            },
            {
            test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
                'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader'
                },
                ]
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false, 
            template: './src/index.html',
            filename: 'index.html'
          }),
          new WebpackMd5Hash(),
          new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
       }),
       new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
        }) 
        ]
};