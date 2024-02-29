/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import devServerConfig from './webpack.server';
import { RuleBuilder } from './builders/rule';
import { PluginBuilder } from './builders/plugin';
import { ConfigFunc } from './types/env';
import { ENV_MODE_MAP } from './common/constants';

const devConfig: ConfigFunc<'dev'> = ({ env }) => {
  const envMode = ENV_MODE_MAP[env];

  const config: Configuration = {
    mode: envMode,
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      PluginBuilder.createProcessEnvVariablesPlugin({ env: envMode }),
      new ReactRefreshWebpackPlugin(),
    ],
    module: {
      rules: [
        RuleBuilder.createBabelTsRule([ReactRefreshTypeScript()]),
        RuleBuilder.createStylesRule(),
      ],
    },
  };

  return merge<Configuration>(config, devServerConfig);
};

export default devConfig;
