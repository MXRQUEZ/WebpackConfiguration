const path = require('path');
const assets = path.resolve(__dirname, '../', './public');

module.exports = {
  target: "web",
  devServer: {
    hot: true,
    historyApiFallback: {
      // provide index.html instead of 404:not found error (for SPA app)
      rewrites: [
        { from: /favicon.ico/, to: "public/favicon.ico" }, // provide favicon
      ],
    }, // it enables HTML5 mode: https://developer.mozilla.org/en-US/docs/Web/API/History
    devMiddleware: {
      stats: {
        children: false, // disable console.info for node_modules/*
        modules: false,
      },
    },
    static: {
      directory: assets, // folder with static content
      watch: true, // enable hot-reload by changes in contentBase folder
    },
  },
};
