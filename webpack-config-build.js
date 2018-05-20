const path = require('path');

const webpack = require('webpack');
const glob = require('glob');
const merge = require('webpack-merge');
var baseConfig = require('./webpack-config-base');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


// 环境对象(environment)作为第一个参数。有关语法示例，一个选项 map对象（argv）作为第二个参数。这个对象描述了传递给 webpack 的选项
// https://webpack.docschina.org/configuration/configuration-types/
// webpack --env.production    # 设置 env.production == true
// webpack --env.platform=web  # 设置 env.platform == "web"
module.exports = ((env, argv) => {
  console.log(env) // { environment: 'uat' }
  const Env = env.environment; // 打包环境
  const buildConfig = {
    mode: 'production', // 'none', 'development' or 'production'
    plugins: [
      // 定义全局环境变量
      new webpack.DefinePlugin({
        ENV: JSON.stringify(Env),
      }),
      // 清除文件目录下的dist文件夹
      new CleanWebpackPlugin([path.resolve(__dirname , './dist')]),
      // 压缩js
      new UglifyJsPlugin(),
    ]
  }

  const config = merge(baseConfig, buildConfig);

  return config;
})
