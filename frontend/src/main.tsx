import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#252B48',
            color: '#F0F4EF',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#16DB93',
              secondary: '#F0F4EF',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF595E',
              secondary: '#F0F4EF',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);