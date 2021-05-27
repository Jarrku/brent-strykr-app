import { gtagEvent, gtagPageview } from '@/lib/gtag';
import { DefaultSeo } from 'next-seo';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import SEO from '../../next-seo.json';
import '../styles/globals.css';

export function reportWebVitals({ name, value, label, id }: NextWebVitalsMetric) {
  gtagEvent({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    options: {
      non_interaction: true,
    },
  });

  // window.gtag('event', name, {
  //   event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
  //   value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
  //   event_label: id, // id unique to current page load
  //   non_interaction: true, // avoids affecting bounce rate.
  // });
}

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
