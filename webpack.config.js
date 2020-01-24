const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        use: 'raw-loader',
      }
    ]
  },
  resolve: {
    alias: {
      // TODO: Define other local module aliases here
      middleware: path.resolve(__dirname, 'src/middleware/'),
      src: path.resolve(__dirname, 'src/'),
      'input-schemas': path.resolve(__dirname, 'src/input-schemas/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      callbacks: path.resolve(__dirname, 'src/callbacks/'),
      models: path.resolve(__dirname, 'src/models/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  }
};
