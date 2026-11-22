import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function mount() {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Target container #root not found');
    return;
  }
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
