import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#1D0330',
      200: '#3A0360',
      300: '#6622DB',
      400: '#7063BF',
      500: '#D5CEFF',
      600: '#F3D587',
    },
  },
  fontSizes: {
    h2: '2.5rem',
    h1: '3rem',
    h3: '2rem',
    h4: '1.5rem',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
