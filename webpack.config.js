/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')


const DEBUG = process.env.NODE_ENV !== 'production'


const PLUGINS = [
  new webpack.NoErrorsPlugin(),
  new WebpackNotifierPlugin({
    title: 'Who Likes',
    contentImage: './static/favicon/heart@192.png',
    alwaysNotify: true,
  }),
]

const PLUGINS_DEV = []

const PLUGINS_PROD = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
]


module.exports = {
  devtool: DEBUG ? '#inline-source-map' : 'source-map',
  debug: DEBUG,
  progress: true,

  entry: ['./static/js/app.js'],

  output: {
    path: './static/dist',
    filename: 'app.bundle.js',
    pathinfo: DEBUG,
    publicPath: DEBUG ? 'http://localhost:7777/static/' : '/static/',
  },

  resolve: {
    extensions: ['', '.js'],
    root: path.join(__dirname, 'static/js'),
  },

  plugins: PLUGINS.concat(DEBUG ? PLUGINS_DEV : PLUGINS_PROD),

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'static/js'),
          path.join(__dirname, 'node_modules/react-icons'),
        ],
        loader: (DEBUG ? 'react-hot!' : '') + 'babel?cacheDirectory',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass?sourceMap',
      },
      {
        test: /\.(woff|png)$/,
        loader: 'url',
      },
    ],
  },

  devServer: {
    contentBase: './static',
    port: 7777,
    hot: true,
    inline: true,
    noInfo: true,
  },
}
