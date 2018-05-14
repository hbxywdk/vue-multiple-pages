const path = require('path');

const webpack = require('webpack');
const glob = require('glob');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pagePath = './src/page/';
const entryFolders = glob.sync(`${pagePath}/*`);
// console.log(entryFolders); //[ './src/page/page1', './src/page/page2' ]

const entrys = (() => {
  let entry = {};
  entryFolders.forEach((e, i) => {
    let entryArr = e.split('/');
    let entryName = entryArr[entryArr.length- 1];
    entry[entryName] = e + '/entry.js';
  })
  // console.log(entry);
  return entry;
})();

const htmlWebpackPlugins = (() => {
  let htmls = [];
  entryFolders.forEach((e, i) => {
    let option = {};
    let entryArr = e.split('/');
    let entryName = entryArr[entryArr.length- 1];
    option.filename = entryName + '/' + entryName + '.html';
    option.template = e + '/page.html';
    option.inject = true;
    option.chunks = ['vue', entryName];
    htmls.push(new HtmlWebpackPlugin(option));
  })
  // console.log(htmls);
  return htmls;
})();
// 环境对象(environment)作为第一个参数。有关语法示例，一个选项 map对象（argv）作为第二个参数。这个对象描述了传递给 webpack 的选项
// https://webpack.docschina.org/configuration/configuration-types/
// webpack --env.production    # 设置 env.production == true
// webpack --env.platform=web  # 设置 env.platform == "web"
module.exports = ((env, argv) => {
  console.log(env) // { environment: 'uat' }
  const Env = env.environment; // 打包环境
  const config = {
    mode: 'production', // 'none', 'development' or 'production'
    entry: entrys,
    output: {
      filename: '[name].[hash].js',
      path: __dirname + '/dist',
      chunkFilename: '[name].js',
    },
    resolve:{
      extensions: ['.js','.json','.css' ,'.less' ,'.sass','.scss','.vue'],
      alias: {
          'vue$': 'vue/dist/vue.esm.js' // vue
      }
    },
    module: {

      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader",
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "vue-style-loader"
            },
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            }
          ]
        },
      ]

    },
    optimization: {
      minimizer: [
        // new UglifyJsPlugin({
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true // set to true if you want JS source maps
        // }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      // 清除文件目录下的dist文件夹
      new CleanWebpackPlugin([path.resolve(__dirname , './dist')]),
      // 提取公共模块
      // new webpack.optimize.SplitChunksPlugin({
      //   chunks: "async",
      //   minSize: 30000,
      //   minChunks: 1,
      //   maxAsyncRequests: 5,
      //   maxInitialRequests: 3,
      //   automaticNameDelimiter: '~',
      //   name: true,
      //   cacheGroups: {
      //     vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
      //       test: /node_modules\//,
      //       name: 'dist/vendor',
      //       priority: 10,
      //       enforce: true
      //     },
      //     commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
      //       test: /common\/|components\//,
      //       name: 'dist/commons',
      //       priority: 10,
      //       enforce: true
      //     },
      //     // vue: {
      //     //     test: /[\\/]node_modules[\\/]vue[\\/]/,
      //     //     priority: -10,
      //     //     name: 'dist/vue'
      //     // },
      //   }
      // }),
      // new webpack.optimize.SplitChunksPlugin({
      //   chunks: "async",
      //   minSize: 30000,
      //   minChunks: 1,
      //   maxAsyncRequests: 5,
      //   maxInitialRequests: 3,
      //   automaticNameDelimiter: '~',
      //   name: true,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10
      //     },
      //   default: {
      //       minChunks: 2,
      //       priority: -20,
      //       reuseExistingChunk: true
      //     }
      //   }
      // }),
      // 提取css
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      }),
      // 定义全局变量
      new webpack.DefinePlugin({
        ENV: JSON.stringify(Env),
      }),
      // vue-loader
      new VueLoaderPlugin(),
      // 压缩js
      new UglifyJsPlugin(),
      // 
      new webpack.NoEmitOnErrorsPlugin(),
      // 拼接htmlWebpackPlugin
      ...htmlWebpackPlugins,
    ]
  }

  return config;
})
