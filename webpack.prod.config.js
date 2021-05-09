const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [ new CssMinimizerPlugin(), new TerserPlugin()],
  },
  module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: false,
            minimize: true,
          },
        },
        {
          test: /\.css$/i,
          exclude: /styles\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /styles\.css$/i,
          use: [MiniCssExtractPlugin.loader,'css-loader']
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
      ],
  },
  plugins: [
    new HtmlWebpackPlugin(
        {
            template: './src/index.html',
            filename: './index.html'
        }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets/" },
      ],
    }),
  ],
};