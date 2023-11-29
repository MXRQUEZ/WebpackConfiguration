import path from 'path';

export const FILES_THRESHOLD = 8192;

const root = path.resolve(__dirname, '../', '../');

export const PATHS = {
  public: path.resolve(root, './public'),
  root,
  src: path.resolve(root, './src'),
  output: path.resolve(root, './build'),
} as const;
