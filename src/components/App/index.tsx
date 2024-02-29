import { memo } from 'react';

import classes from './styles.module.scss';

const App = (): JSX.Element => {
  console.error('test');

  return (
    <div className={classes.main}>
      <h1>Test</h1>
    </div>
  );
};

export default memo(App);
