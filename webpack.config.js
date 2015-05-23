/* eslint-env node */
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: './static/js/app.js',

  output: {
    path: './static/dist',
    filename: 'app.bundle.js'
  },

  resolve: {
    modulesDirectories: ['', 'static/js', 'node_modules']
  },

  plugins: [
    new WebpackNotifierPlugin({name: 'WhoLikes'})
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory&optional=runtime'
      }
    ]
  },

  progress: true,
  stats: {
    colors: true,
    reasons: true
  }
};
