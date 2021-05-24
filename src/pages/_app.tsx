import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import SEO from '../../next-seo.json';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  console.log({ pageProps });
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
