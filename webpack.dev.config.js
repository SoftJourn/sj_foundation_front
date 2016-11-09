var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
  },
  output: {
    path: path.join(__dirname, '/assets/dist/'),
    filename: '[name].bundle.js',
    publicPath: '/assets/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    extractCSS
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'config')],
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
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
        //loader: extractCSS.extract(['css','sass']),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, "src")
  }
};
