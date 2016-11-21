var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var extractCSS = new ExtractTextPlugin('[name].css');
// require('es6-promise').polyfill();

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, '/static/'),
    filename: '[name].bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    //new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel' // 'babel-loader' is also a legal name to reference
        // include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
        //loader: extractCSS.extract(['style', 'css','sass']),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
  },
};