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
  console.log(entry);
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
    option.chunks = [entryName];
    htmls.push(new HtmlWebpackPlugin(option));
  })
  console.log(htmls);
  return htmls;
})();
module.exports = ((options) => {

  const config = {
    mode: 'development', // 'none', 'development' or 'production'
    entry: entrys,
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    devServer: {
      // contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
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
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      }),
      new VueLoaderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      ...htmlWebpackPlugins,
    ]
  }

  return config;
})
