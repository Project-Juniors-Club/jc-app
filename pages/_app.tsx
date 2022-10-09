import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TODO: add theme when we have the UI
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
