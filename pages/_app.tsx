import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import { radioAnatomy, checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import Head from 'next/head';
import favicon from '../public/favicon.ico';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    _checked: {
      bg: '#7FB519',
      borderColor: '#7FB519',
      _before: {
        color: 'white',
      },
    },
    _hover: {
      _checked: {
        bg: '#7FB519',
        borderColor: '#7FB519',
        _before: {
          color: 'white',
        },
      },
    },
  },
});

const radioTheme = defineMultiStyleConfig({ baseStyle });

// TODO: add theme when we have the UI
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

// const theme = extendTheme({ colors, components: { Radio: controlTheme, Checkbox: controlTheme } });
const theme = extendTheme({ colors, components: { Radio: radioTheme } });

const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

// ignore in-browser next/js recoil warnings until its fixed.
// Relevant issue: https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
const mutedConsole = memoize(console => ({
  ...console,
  warn: (...args) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
}));
global.console = mutedConsole(global.console);

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href={favicon.src} type='image/x-icon' />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
