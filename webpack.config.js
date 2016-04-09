/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const DEBUG = process.env.NODE_ENV !== 'production'


const PLUGINS = [
  new webpack.NoErrorsPlugin(),
]

try {
  const WebpackNotifier = require('webpack-notifier')

  PLUGINS.push(
    new WebpackNotifier({
      title: 'WhoLikes',
      contentImage: './static/favicon/heart@192.png',
      alwaysNotify: true,
    })
  )
}
catch (e) {
  // Do nothing
}

const PLUGINS_DEV = []

const PLUGINS_PROD = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new ExtractTextPlugin('[name].css', {
    allChunks: true,
    disable: DEBUG,
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  })
]


const ENTRY = DEBUG ? [
  'webpack-dev-server/client?http://localhost:7777',
  'webpack/hot/only-dev-server'
] : []


module.exports = {
  devtool: DEBUG ? '#inline-source-map' : 'source-map',
  debug: DEBUG,
  progress: true,

  entry: ENTRY.concat(['./static/js/app.js']),

  output: {
    path: './static/dist',
    filename: 'app.bundle.js',
    pathinfo: DEBUG,
    publicPath: DEBUG ? 'http://localhost:7777/' : '/static/dist',
  },

  resolve: {
    root: path.join(__dirname, 'static/js'),
    extensions: ['', '.js']
  },

  plugins: PLUGINS.concat(DEBUG ? PLUGINS_DEV : PLUGINS_PROD),

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'static/js'),
        loader: (DEBUG ? 'react-hot!' : '') + 'babel?cacheDirectory'
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style',
          'css!autoprefixer!sass?indentedSyntax&includePaths[]=./static/styles')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css!autoprefixer!sass&includePaths[]=./static/styles')
      },
      {
        test: /\.woff$/,
        loader: 'url'
      }
    ]
  },

  devServer: {
    contentBase: './static/dist',
    port: 7777,
    hot: true,
    inline: true,
    noInfo: true,
  },
}
