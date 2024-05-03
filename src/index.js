import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './context/AuthContext';

import './css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(
    <React.StrictMode>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </React.StrictMode>
  );
}