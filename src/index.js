import React from 'react';
import { render } from 'react-snapshot';
import Routes from './routes/routes.js';
import './index.css';

render(
  <Routes />,
  document.getElementById('root')
);