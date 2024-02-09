/* eslint-disable import/no-extraneous-dependencies */
import { WebpackConfiguration } from 'webpack-dev-server';

import { HOST, PATHS, PORT } from './common/constants';

const devServerConfig: WebpackConfiguration = {
  target: 'web',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: {
      // provide index.html instead of 404:not found error (for SPA app)
      rewrites: [
        { from: /favicon.ico/, to: 'public/favicon.ico' }, // provide favicon
      ],
    }, // it enables HTML5 mode: https://developer.mozilla.org/en-US/docs/Web/API/History
    devMiddleware: {
      stats: {
        children: false, // disable console.info for node_modules/*
        modules: false,
      },
    },
    port: PORT,
    host: HOST,
    static: {
      watch: {
        ignored: PATHS.output,
        aggregateTimeout: 200,
        poll: 1000,
      },
    },
  },
};

export default devServerConfig;
