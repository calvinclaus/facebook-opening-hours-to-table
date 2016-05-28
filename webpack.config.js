module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'entry.js',
    path: './build',
    library: "facebook-opening-hours-table",
    libraryTarget: "commonjs2"
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

