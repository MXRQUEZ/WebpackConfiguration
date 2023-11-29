import { memo } from 'react';

import classes from './styles.module.css';

const App = (): JSX.Element => {
  console.error('test');

  return (
    <div className={classes.main}>
      <h1>{__ENV__}</h1>
    </div>
  );
};

export default memo(App);
