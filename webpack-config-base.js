const path = require('path');

const webpack = require('webpack');
const glob = require('glob');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
    option.chunks = ['vue2', 'axios', entryName];
    htmls.push(new HtmlWebpackPlugin(option));
  })
  // console.log(htmls);
  return htmls;
})();

module.exports = {
  // mode: 'development', // 'none', 'development' or 'production'
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
    // 提取公共代码(也可用new webpack.optimize.SplitChunksPlugin({})的方式)
    splitChunks: {
      chunks: "async", // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
      minSize: 30000, // 表示在压缩前的最小模块大小，默认为0
      minChunks: 1, //  表示被引用次数，默认为1
      maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为1；
      maxInitialRequests: 3, // 最大的初始化加载次数，默认为1；
      automaticNameDelimiter: '~',
      name: true, // 默认由块名和hash值自动生成
      // 缓存组 抽取node_modules中的第三方库
      cacheGroups: { // 缓存组是一个对象，可以继承上面chunks等配置，还有自己私有的配置
        // priority: 表示缓存的优先级；
        // reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块
        // ...及以下

        // vendors: {
        //   test: /[\\/]node_modules[\\/]/, // 缓存组的匹配规则
        //   name: "vendors",
        //   chunks: "all"
        // },
        // commons: {
        //   name: "commons",
        //   chunks: "initial",
        //   minChunks: 2
        // },
        default: false, // 禁用默认缓存组
        vendors: false, // 禁用vendors缓存组

        vue2: {
          chunks: "initial",
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: 'vue2',
          priority: 1,
        },
        axios: { // 要引用webpack才会打包
          chunks: "initial",
          test: /[\\/]node_modules[\\/]axios[\\/]/,
          name: 'axios',
          priority: 2,
        },
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // 提取公共代码
    // new webpack.optimize.SplitChunksPlugin({
    //   chunks: "async",
    //   minSize: 30000,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     commons: {
    //       name: "commons",
    //       chunks: "initial",
    //       minChunks: 2
    //     },
    //     // vendors: {
    //     //   test: /[\\/]node_modules[\\/]/, // 缓存组的匹配规则
    //     //   name: "vendors",
    //     //   chunks: "all"
    //     // },
    //   }
    // }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    // vue-loader
    new VueLoaderPlugin(),
    // 
    new webpack.NoEmitOnErrorsPlugin(),
    // 拼接htmlWebpackPlugin
    ...htmlWebpackPlugins,
  ]
}

