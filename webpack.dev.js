const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 8080,
    inline: true,
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true
  }
})
