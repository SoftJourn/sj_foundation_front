var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'bootstrap-loader',
      'font-awesome-loader',
      './src/index'
    ]
  },
  output: {
    path: path.join(__dirname, '/assets/dist/'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/assets/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ],
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   loaders: ['react-hot-loader/webpack'],
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: [path.join(__dirname, 'src')],
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },

      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },

      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loaders: [
      //     'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //     'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //   ]
      // },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader'
      },
    ]
  },
  resolve: {
    root: path.join(__dirname, "src")
  }
};
