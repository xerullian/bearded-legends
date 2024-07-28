const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]-[hash:base64]',
              },
            },
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        use: 'yaml-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './site.webmanifest', to: './', context: 'public' },
        { from: './**/*.ico', to: './', context: 'public' },
        { from: './**/*.png', to: './', context: 'public' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    hot: true,
  },
};
