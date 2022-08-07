import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import { AppProvider } from "./Contexts/AppContext"
import { ToastProvider } from "./Contexts/ToastContext"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
