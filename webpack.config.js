const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  resolve: {
    extensions: [`.js`, `.jsx`],
    modules: [
      `node_modules`,
      path.resolve(`./src`)
    ]
  },
  output: {
    filename: `bundle.js`,
    path: path.resolve(`./public`)
  },
  devServer: {
    contentBase: path.resolve(`./public`),
    compress: false,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`
};
