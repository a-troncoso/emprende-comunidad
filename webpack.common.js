const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            sourceMap: true
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      options: {
        name: './images/[hash].[ext]',
      },
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Emprende Comunidad',
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ]
}
