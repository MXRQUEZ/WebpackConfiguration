/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';

import { WebpackArgv, Mode, WebpackEnvironmentVariables } from './types/env';

export default (_: WebpackEnvironmentVariables, { mode }: WebpackArgv): Configuration => {
  const modeMap: Record<Mode, 'dev' | 'prod'> = {
    development: 'dev',
    production: 'prod',
  } as const;

  const commonConfig: Configuration = require('./webpack.common');

  const envConfig: Configuration = require(`./webpack.${modeMap[mode]}`);

  return merge(commonConfig, envConfig);
};
