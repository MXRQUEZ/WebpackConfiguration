const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const filesThreshold = 8192;

module.exports = {
  entry: path.resolve(__dirname, '../', './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    filename: "[name].js",
    chunkFilename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // using import without file-extensions
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../', './tsconfig.json')
      }), // plugin makes mapping from tsconfig.json to webpack:alias
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // we don't type checking during the compilation - it's task for CodeEditor
            },
          }
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'sounds/'
            }
          }
        ]
      },
      {
        test: /\.css$|\.scss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset',
        generator: {
          filename: "images/[name][ext][query]", // [hash][ext][query]",
        },
        parser: {
          // it converts images that have size less 'limit' option into inline base64-css-format
          dataUrlCondition: {
            maxSize: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', './public/index.html'),
    }),
    new CompressionPlugin({
      threshold: filesThreshold,
    }),
  ],
}
