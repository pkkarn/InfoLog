import React from 'react';
import ReactDOM from 'react-dom/client';
import { MenuComponent } from './scriptComponent/MainScript'

const utilEl = document.createElement('div')
utilEl.setAttribute('id', 'menu__ed')
document.body.appendChild(utilEl)

if (utilEl) {
  ReactDOM.createRoot(utilEl).render(<MenuComponent />);
} else {
  console.error('Element not found');
}