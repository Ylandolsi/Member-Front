import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/Colors.css';
import './styles/Index.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
