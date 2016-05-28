module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(noode_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
}

