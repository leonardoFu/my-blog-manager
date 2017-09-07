import React from 'react';
import { CircularProgress } from 'material-ui';

import './loading.css';

export default () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);
