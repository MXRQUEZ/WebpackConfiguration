const TerserPlugin = require("terser-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: "[name].[contenthash:8].js", // contenthash-this is version for avoding browser-cache issue: user always has to get the last version of files
    chunkFilename: "[name].[contenthash:8].js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
        // exclude: /\.m?js(\?.*)?$/i, // uncomment if we don't need uglifying (for debug purpose)
        extractComments: false, // disable extracting comments to a different file
        terserOptions: {
          toplevel: true, // https://github.com/terser/terser#minify-options
          output: {
            comments: false, // remove comments from files
          },
          mangle: {
            safari10: true, // for preventing Safari 10/11 bugs in loop scoping and await
          },
          compress: { pure_funcs: ["console.info", "console.debug", "console.warn"] }, // remove this functions when their return values are not used
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
}
