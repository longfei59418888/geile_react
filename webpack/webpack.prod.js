/**
 * Created by DELL on 2017/11/14.
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const srcPathAbsolute = path.resolve('./src'); // 生成html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件


module.exports = {
  context: srcPathAbsolute,
  cache: false,
  devtool: 'source-map',
  entry: {
    app: './client.js',
    vendors: ['react']
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'js/[name].js',
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
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { // 添加css-module
        test: /\.module\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }, 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['js', 'css'], {  // 目录下文件
      root: path.resolve(__dirname, '../dist'),  // 目录
      verbose: true,
      dry: false,
    }),
    new ExtractTextPlugin({
      filename: 'css/main.css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js'
    }),
    new webpack.DefinePlugin({ // 全局变量,在全局可以用
      SERVER_URL: '192.168.0.1'
    }),
    new HtmlWebpackPlugin({  // 生成html文件
      title: 'title',   // 标题
      filename: 'index.html',   // 指定html生成目录
      template: path.resolve(__dirname, '../webpack/template.html'),   // html模板
      inject: true,
      chunks: ['vendors', 'app'], // 加载指定模块中的文件，否则页面会加载所有文件
      hash: true,    // 为静态资源生成hash值
      minify: {    // 压缩HTML文件
        removeComments: false,    // 移除HTML中的注释
        collapseWhitespace: false    // 删除空白符与换行符
      },
    }),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.NoErrorsPlugin()
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
