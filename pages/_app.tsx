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

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))
global.console = mutedConsole(global.console);

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
