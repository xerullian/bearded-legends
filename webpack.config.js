const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.jsx',
  },
  output: {
    filename: `bundle-${version}-${uuidv4()}.js`,
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/bearded-legends',
  },
  module: {
    rules: [
      {
        test: /\.(otf|ttf|woff\woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: './src/typography/fonts/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
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
      template: './public/index.ejs',
      inlineSource: '.(js|css)$',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json', to: './', context: 'public' },
        { from: './service-worker.js', to: './', context: 'public' },
        { from: './**/*.ico', to: './', context: 'public' },
        { from: './**/*.png', to: './', context: 'public' },
        { from: './thirdparty/**/*', to: './', context: 'public' },
        { from: './database/**/*', to: './', context: 'public' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@content': path.resolve(__dirname, 'src/content/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
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
