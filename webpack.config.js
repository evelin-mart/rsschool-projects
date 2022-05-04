const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    "css-loader",
  ];
  if (extra) {
    loaders.push(extra);
    loaders.push({
      loader: "sass-resources-loader",
      options: {
        resources: [
          // "src/vars.scss", //abstracts
          // "src/mix.scss"
        ],
      },
    });
  }
  return loaders;
};

const esLint = () => {
  return isProd
    ? new EslintPlugin({
        extensions: ["js"],
      })
    : [];
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  devtool: isDev ? "inline-source-map" : false,
  entry: {
    app: "./index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json"], //add default extensions to imports
    // alias: {
    //   "@models": path.resolve(__dirname, "src/models")  //add default path
    // }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, ""),  //copy files
    //     to: path.resolve(__dirname, "dist")
    //   },
    // ]),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
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
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
};
