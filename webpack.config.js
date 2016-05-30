module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'entry.js',
    path: './build',
    library: "facebookOpeningHoursToTable",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    "jquery": "jquery",
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

