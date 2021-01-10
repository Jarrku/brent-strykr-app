import React from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.json';
import { GlobalStyles } from 'twin.macro';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
