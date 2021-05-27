import { gtagPageview } from '@/lib/gtag';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import SEO from '../../next-seo.json';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtagPageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
