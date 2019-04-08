var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      'font-awesome-loader',
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, '/static/'),
    filename: '[name].bundle.js',
    publicPath: 'http://sj-foundation-static.testing.softjourn.if.ua/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': "'http://sj-foundation.testing.softjourn.if.ua:3000/'"
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },

      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
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
  externals: {
      config: JSON.stringify({
          apiUrl: 'http://172.17.0.1:3000'
      })
  }
};
