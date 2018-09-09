const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;
const devMode = NODE_ENV !== 'production';
const paths = {
  src: path.join(__dirname, 'src'),
  dist: devMode
    ? path.join(__dirname, 'dist_dev')
    : path.join(__dirname, 'dist')
};
const config = {
  entry: {
    main: path.join(paths.src, 'index.tsx')
  },
  devtool: 'source-map',
  output: {
    filename: 'static/js/[name].16.js',
    chunkFilename: devMode
      ? 'static/js/[name].js'
      : 'static/js/[name].[chunkhash:8].js',
    path: paths.dist
  },
  mode: NODE_ENV,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/i,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'vendors'
    }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: path.src,
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=static/media/[name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  plugins: [
    new CleanWebpackPlugin(paths.dist),
    new MiniCssExtractPlugin({
      filename: devMode
        ? 'static/css/[name].css'
        : 'static/css/[name].[hash].css',
      chunkFilename: devMode
        ? 'static/css/[id].css'
        : 'static/css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'react tyepscript starter with babel 7',
      template: 'src/assets/index.html',
      favicon: 'src/assets/icons/favicon.ico'
    })
  ]
};
module.exports = config;
