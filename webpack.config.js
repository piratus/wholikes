/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');


const DEBUG = process.env.NODE_ENV !== 'production';


const PLUGINS = [
  new webpack.NoErrorsPlugin(),
  new WebpackNotifierPlugin({name: 'WhoLikes', alwaysNotify: true}),
  new webpack.DefinePlugin({
    __DEBUG__: DEBUG,
    'process.env': {
      NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
    }
  })
];

const PLUGINS_DEV = [];

const PLUGINS_PROD = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  })
];


const ENTRY = DEBUG ? [
  'webpack-dev-server/client?http://localhost:7777',
  'webpack/hot/only-dev-server'
] : [];


module.exports = {
  devtool: DEBUG ? '#inline-source-map' : 'source-map',
  debug: DEBUG,
  progress: true,

  entry: ENTRY.concat(['./static/js/app.js']),

  output: {
    path: './static/dist',
    filename: 'app.bundle.js',
    pathinfo: DEBUG,
  },

  resolve: {
    root: path.join(__dirname, 'static/js'),
    extensions: ['', '.js']
  },

  plugins: PLUGINS.concat(DEBUG ? PLUGINS_DEV : PLUGINS_PROD),

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'static/js'),
        loader: (DEBUG ? 'react-hot!' : '') + 'babel?cacheDirectory&presets[]=react&presets[]=es2015&presets[]=stage-1'
      },
      {
        test: /\.sass$/,
        loader: 'style!css!autoprefixer!sass?indentedSyntax&includePaths[]=./static/styles'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass&includePaths[]=./static/styles'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
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
};
