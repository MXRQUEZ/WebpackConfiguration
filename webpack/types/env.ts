// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';

export type Mode = 'development' | 'production';

export interface WebpackArgv {
  mode: Mode;
}

export type Env = 'dev' | 'prod';

export interface WebpackEnv<T extends Env = Env> {
  env: T;
}

export type ConfigFunc<T extends Env = Env> = (
  env: WebpackEnv<T>,
  argv: WebpackArgv,
) => Configuration;

export interface ProcessEnvironmentVariables {
  env: Mode;
}
