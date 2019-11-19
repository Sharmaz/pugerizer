const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "css/main.css",
      chunkFilename: "[id].css"
      })
  ]

  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin()
    );
    plugins.push(
      new HtmlWebPackPlugin({
        template: "./src/views/pages/index.pug",
        filename: "./index.html",
      }),
    );
  }

  return {
    entry: {
      "home": path.resolve(__dirname, 'src/js/app.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/build.js',
      publicPath: path.resolve(__dirname, '/'),
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          },
        },
        {
          test: /\.pug$/,
          use: [
            "html-loader",
            "pug-html-loader"
          ]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: 'file-loader?name=./fonts/[name].[ext]'
        },
        {
          test: /\.(sa|sc|c)ss$$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'resolve-url-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
    plugins
  }
}
