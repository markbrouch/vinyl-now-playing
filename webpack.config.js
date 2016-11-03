const path = require('path');
const webpack = require('webpack');


const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve(ROOT_PATH, 'src/index')
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
      include: path.resolve(ROOT_PATH, 'src/index')
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['react-hot-loader/babel'],
        cacheDirectory: true
      },
      include: path.resolve(ROOT_PATH, './src')
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: process.env.NODE_ENV === 'production'
      ? path.resolve(ROOT_PATH, 'dist')
      : path.resolve(ROOT_PATH, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
