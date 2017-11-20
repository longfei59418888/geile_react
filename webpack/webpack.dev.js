/**
 * Created by DELL on 2017/11/14.
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const srcPathAbsolute = path.resolve('./src'); // 生成html文件
module.exports = {
  context: srcPathAbsolute,
  cache: false,
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3330/',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client.js'
  ],
  devServer: {
    contentBase: './src/',
    publicPath: '/assets/',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3330
  },
  // entry: './index.js',
  output: {
    path: path.resolve('./dist/assets'),
    filename: 'app.js',
    publicPath: './assets/'
  },
  module: {
    rules: [
      { // babel编译
        enforce: 'pre',
        test: /\.js?$/,
        include: srcPathAbsolute,  // 指定目录下
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|mp4|ttf|ogg|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192&name=./image/[hash].[ext]' // 图片或者
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: srcPathAbsolute,
        loaders: [
          { loader: 'babel-loader' }
        ]
      },
      {// 不是module
        test: /^.((?!module).)*\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { // 添加css-module
        test: /\.module\.(css|scss)$/,
        loaders: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]-[local]-[hash:base64:5]'
          }
        }, 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: { // 设置别名
      actions: `${srcPathAbsolute}/actions/`,
      components: `${srcPathAbsolute}/components/`,
      config: `${srcPathAbsolute}/config/${this.env}.js`,
      images: `${srcPathAbsolute}/images/`,
      sources: `${srcPathAbsolute}/sources/`,
      stores: `${srcPathAbsolute}/stores/`,
      styles: `${srcPathAbsolute}/styles/`
    },
    extensions: ['.js', '.jsx'],  // 自动解析扩展名
    modules: [
      srcPathAbsolute, // 模块默认位置
      'node_modules'
    ]
  }
};
