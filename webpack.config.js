/* eslint-disable */

const path = require('path')
const webpack = require('webpack')

const BASE_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

console.log('env >', process.env.NODE_ENV)
module.exports = {
  entry: process.env.NODE_ENV === 'production'
    ? ['./src/index.js']
    : [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:4444',
        'webpack/hot/only-dev-server',
        './src/index.js'
      ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 4444,
    hot: true
  },
  plugins: process.env.NODE_ENV === 'production'
    ? BASE_PLUGINS.concat(
        [
          // new webpack.optimize.UglifyJsPlugin({
          //   minimize: true,
          //   sourceMap: false,
          //   compressor: {
          //     warnings: false
          //   },
          //   output: {
          //     comments: false
          //   }
          // })
        ]
      )
    : BASE_PLUGINS.concat([
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
