import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import BehancePage from './pages/BehancePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BehancePage />
  </StrictMode>,
);
