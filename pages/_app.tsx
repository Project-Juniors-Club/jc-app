import React from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';

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
// Relevant issue: https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
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
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
