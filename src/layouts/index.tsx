import React from 'react';
import { NextSeo } from 'next-seo';

type LayoutProps = {
  meta: any;
};

const DefaultLayout: React.FC<LayoutProps> = ({ children, meta }) => {
  const { title, description, titleAppendSiteName = false, url, ogImage } = meta || {};
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <div className="prose md:prose-xl mt-0 max-w-screen-md mx-auto leading-6">
        {/* <div className="prose md:prose-xl max-w-screen-md mt-0 mx-auto leading-6"> */}
        {title && <h1 className="text-xl leading-tight">{title}</h1>}
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
