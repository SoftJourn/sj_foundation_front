const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

let config = require('./webpack.config.js');
const devConfig = require('./webpack.dev.config.js');

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    config = devConfig;
}

console.log(process.env.NODE_ENV);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
}).listen(3001, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }
    
    console.log('Listening at localhost:3001');
});
