import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/App.css';
import App from './App.jsx';
import { GlobalProvider } from './store/GlobalContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);