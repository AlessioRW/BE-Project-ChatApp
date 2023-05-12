import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-z8wbjmnri0hy2nwc.us.auth0.com"
    clientId="zVWxJGyd666hfsOwd82rtO759soWKSls"
    responseType='code'
    
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <App />
  </Auth0Provider>
  </React.StrictMode>
);
