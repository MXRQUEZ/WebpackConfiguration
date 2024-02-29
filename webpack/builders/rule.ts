/* eslint-disable import/no-extraneous-dependencies */
import { SourceFile, TransformerFactory } from 'typescript';

const createBabelTsRule = (transformers?: TransformerFactory<SourceFile>[]) => ({
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        getCustomTransformers: transformers?.length
          ? () => ({
              before: transformers,
            })
          : undefined,
      },
    },
  ],
});

const createStylesRule = (styleLoader = 'style-loader') => ({
  test: /\.css$|\.scss$/,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[hash:base64:8]',
        },
      },
    },
    'sass-loader',
  ],
});

export const RuleBuilder = {
  createBabelTsRule,
  createStylesRule,
} as const;
