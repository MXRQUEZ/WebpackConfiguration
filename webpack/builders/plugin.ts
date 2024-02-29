/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack';

import { ProcessEnvironmentVariables } from '../types/env';

type Stringify<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : string;
};

const createProcessEnvVariablesPlugin = (variables: ProcessEnvironmentVariables) => {
  type StringifiedProcessEnvironmentVariables = Stringify<typeof variables>;
  type Keys = keyof StringifiedProcessEnvironmentVariables;
  type Values = StringifiedProcessEnvironmentVariables[Keys];
  type Vars = Record<`__${Uppercase<Keys>}__`, Values>;

  const vars: Vars = Object.keys(variables).reduce((accumulator, currentKey) => {
    const value = variables[currentKey as Keys];

    return {
      ...accumulator,
      [`__${currentKey.toUpperCase()}__`]:
        typeof value === 'string' ? value : JSON.stringify(value),
    };
  }, {} as Vars);

  return new DefinePlugin(vars);
};

export const PluginBuilder = {
  createProcessEnvVariablesPlugin,
} as const;
