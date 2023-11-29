/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';

import path from 'path';

import { FILES_THRESHOLD, PATHS } from './common/constants';

const assetsRule = {
  test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
  type: 'asset',
  generator: {
    filename: 'images/[hash][ext][query]',
  },
  parser: {
    // it converts images that have size less 'limit' option into inline base64-css-format
    dataUrlCondition: {
      maxSize: FILES_THRESHOLD, // if file-size more then limit, file-loader copies one into outputPath
    },
  },
};

const filesRule = {
  test: /\.mp3$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[hash].[ext]',
        outputPath: 'sounds/',
      },
    },
  ],
};

const fontsRule = {
  test: /\.(woff(2)?|eot|ttf|otf|)$/,
  type: 'asset/inline',
};

const svgRule = {
  test: /\.svg$/i,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              },
            },
          ],
        },
      },
    },
  ],
};

const htmlRule = {
  test: /\.(html)$/,
  use: ['html-loader'],
};

const commonConfig: Configuration = {
  entry: path.resolve(PATHS.src, 'index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(PATHS.root, 'tsconfig.json'),
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [assetsRule, filesRule, fontsRule, svgRule, htmlRule],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.public, 'index.html'),
    }),
    new ProgressPlugin((percentage, message, ...args) => {
      console.info(percentage, message, ...args);
    }),
  ],
};

export default commonConfig;

// this is needed for require imports to work
module.exports = commonConfig;
