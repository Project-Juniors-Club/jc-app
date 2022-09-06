import React from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import { RouteGuard } from '../components/RouteGuard';

// TODO: add theme when we have the UI
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
