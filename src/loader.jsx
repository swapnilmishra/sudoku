import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  'zIndex' : 2
}

const Loader = () => (
  <div className="loader">
    <CircularProgress style={style}/>
  </div>
);

export default Loader;