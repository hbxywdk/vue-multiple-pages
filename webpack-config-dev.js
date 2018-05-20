const path = require('path');

const webpack = require('webpack');
const glob = require('glob');

const merge = require('webpack-merge');
const baseConfig = require('./webpack-config-base');

// 环境对象(environment)作为第一个参数。有关语法示例，一个选项 map对象（argv）作
// 为第二个参数。这个对象描述了传递给 webpack 的选项
// https://webpack.docschina.org/configuration/configuration-types/
// webpack --env.production    # 设置 env.production == true
// webpack --env.platform=web  # 设置 env.platform == "web"
module.exports = ((env, argv) => {
  console.log(env) // { environment: 'uat' }
  const Env = env.environment; // 
  const devConfig = {
    mode: 'development', // 'none', 'development' or 'production'
    devServer: {
      // contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    plugins: [
      // 定义全局环境变量
      new webpack.DefinePlugin({
        ENV: JSON.stringify(Env),
      }),
    ]
  }

  const config = merge(baseConfig, devConfig);

  return config;
})
