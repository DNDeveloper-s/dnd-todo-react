import React from 'react';
import classes from './AppLoader.module.scss';

const AppLoader = ({size, containerStyle, noBg, ...props}) => {

  return (
    <div className={classes.container} style={containerStyle}>
      {noBg || <div className={classes.bg} />}
      <div className={classes.clock} style={{zoom: size}} />
    </div>
  );
};

export default AppLoader;
