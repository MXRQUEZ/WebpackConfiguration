/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import devServerConfig from './webpack.server';
import { RuleBuilder } from './builders/rule';
import { PluginBuilder } from './builders/plugin';

const config: Configuration = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    PluginBuilder.createProcessEnvVariablesPlugin({ env: 'development' }),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      RuleBuilder.createBabelTsRule([ReactRefreshTypeScript()]),
      RuleBuilder.createStylesRule(),
    ],
  },
};

const devConfig: Configuration = merge<Configuration>(config, devServerConfig);

export default devConfig;

// this is needed for require imports to work
module.exports = devConfig;
