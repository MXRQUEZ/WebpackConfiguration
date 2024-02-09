/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';

import { ConfigFunc } from './types/env';

const config: ConfigFunc = (env, argv) => {
  const { env: currentEnv } = env;

  const commonConfig: Configuration = require('./webpack.common');

  const envConfig: ConfigFunc = require(`./webpack.${currentEnv}`);

  return merge(commonConfig, envConfig(env, argv));
};

export default config
