import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';

const $root = document.querySelector('#root');
const root = createRoot($root);
root.render(<App />);
