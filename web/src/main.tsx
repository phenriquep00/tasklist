import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TasklistProvider } from './hooks/TasklistContext';
import { UserProvider } from './hooks/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <TasklistProvider>
        <App />
      </TasklistProvider>
    </UserProvider>
  </React.StrictMode>
)
