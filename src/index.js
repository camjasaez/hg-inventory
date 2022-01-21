import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
const domain = process.env.REACT_APP_AUTH_DOMAIN;
const cliendId = process.env.REACT_APP_AUTH_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={cliendId}
    redirectUri={window.location.origin}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
