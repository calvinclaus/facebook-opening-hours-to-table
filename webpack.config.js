module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'entry.js',
    path: './build',
    library: "facebookOpeningHoursToTable",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  devtool: 'source-map',
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

