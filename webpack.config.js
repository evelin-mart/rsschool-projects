const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const esLint = () => {
  return isProd
    ? [
        new EslintPlugin({
          extensions: ['js'],
        }),
      ]
    : [];
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.json'], //add default extensions to imports
    alias: {
      '~': path.resolve(__dirname, 'src/scripts'), //add default path
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon'), //copy files
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    ...esLint(),
  ],
  devServer: {
    port: 5200,
    hot: isDev,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
};
