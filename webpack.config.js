module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'entry.js',
    path: './build',
    library: "facebookOpeningHoursToTable",
    libraryTarget: "umd",
    umdNamedDefine: true
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

