const path = require('path')
module.exports = function (env) {
  return {
    entry: {
      js: './src/index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    }
  }
}
