import Head from 'next/head';

export function JsonLD(jsonLD: any) {
  const jslonld = {
    '@context': 'https://schema.org',
    ...jsonLD,
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jslonld) }}></script>
    </Head>
  );
}
