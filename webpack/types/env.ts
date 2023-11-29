export type Mode = 'development' | 'production';

export interface WebpackArgv {
  mode: Mode;
}

export interface WebpackEnvironmentVariables {}

export interface ProcessEnvironmentVariables {
  env: Mode;
}
