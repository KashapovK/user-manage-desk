import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { AppProviders } from './services/providers';
import { router } from './configs/router';
import './assets/styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
