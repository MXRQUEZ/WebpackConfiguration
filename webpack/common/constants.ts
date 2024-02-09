import path from 'path';

export const FILES_THRESHOLD = 8192;

export const PORT = process.env.PORT ?? 8080;

export const { HOST } = process.env;

export const ENV_MODE_MAP = {
  dev: 'development',
  prod: 'production',
} as const;

const root = path.resolve(__dirname, '../', '../');

export const PATHS = {
  public: path.resolve(root, './public'),
  root,
  src: path.resolve(root, './src'),
  output: path.resolve(root, './build'),
} as const;
