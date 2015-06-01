/* eslint-env node */
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
  devtool: 'source-map',
  entry: './static/js/app.js',

  output: {
    path: './static/dist',
    filename: 'app.bundle.js'
  },

  resolve: {
    modulesDirectories: ['', 'static/js', 'node_modules'],
    extensions: ['', '.js', '.sass', '.scss', '.css']
  },

  plugins: [
    new WebpackNotifierPlugin({name: 'WhoLikes', alwaysNotify: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory&optional[]=runtime'
      },
      {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax&includePaths[]=./static/styles'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass&includePaths[]=./static/styles'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      }
    ]
  },

  progress: true,
  stats: {
    colors: true,
    reasons: true
  }
};
