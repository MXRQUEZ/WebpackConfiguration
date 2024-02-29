import { merge } from 'webpack-merge';

import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';
import { ConfigFunc } from './types/env';
import commonConfig from './webpack.common';

const config: ConfigFunc = (env, argv) => {
  const { env: currentEnv } = env;

  const envConfig = (currentEnv === 'dev' ? devConfig : prodConfig) as ConfigFunc;

  return merge(commonConfig, envConfig(env, argv));
};

export default config;
