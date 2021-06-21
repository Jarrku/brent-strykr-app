import * as React from 'react';
import styles from './IframePreview.css';

function PagePreview({ page }: { page: string }) {
  const previewUrl = `/api/preview?page=${page}`;
  const url = process.env.NODE_ENV === 'production' ? previewUrl : 'http://localhost:3000' + previewUrl;

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe title="page preview" src={url} frameBorder={'0'} />
      </div>
    </div>
  );
}


export function HomePagePreview() {
  return <PagePreview page="/" />;
}

export function AboutPagePreview() {
  return <PagePreview page="/over-mij" />;
}

export function PricingPagePreview() {
  return <PagePreview page="/tarieven" />;
}

export function ContactPagePreview() {
  return <PagePreview page="/contact" />;
}
