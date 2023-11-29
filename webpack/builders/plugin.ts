/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack';

import { ProcessEnvironmentVariables } from '../types/env';

const createProcessEnvVariablesPlugin = (variables: ProcessEnvironmentVariables) => {
  type Keys = keyof typeof variables;
  type Values = (typeof variables)[Keys];
  type Vars = Record<`__${Uppercase<Keys>}__`, Values>;

  const vars: Vars = Object.keys(variables).reduce(
    (accumulator, currentKey) => ({
      ...accumulator,
      [`__${currentKey.toUpperCase()}__`]: JSON.stringify(variables[currentKey as Keys]),
    }),
    {} as Vars,
  );

  return new DefinePlugin(vars);
};

export const PluginBuilder = {
  createProcessEnvVariablesPlugin,
} as const;
