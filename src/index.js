import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas';


ReactDOM.render(
  <Canvas height={500} width={500}/>,
  document.getElementById('app')
);

module.hot.accept();