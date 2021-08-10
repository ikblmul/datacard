const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: "es5",
  watch: true,
  mode: 'none',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
      }],
      exclude: /node_modules/,
    }, ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'DataCard.js',
    path: "/Users/ikbalmulyadi/Documents/kerjaan-falah/pothan/public/assets/DataCard",  },
};