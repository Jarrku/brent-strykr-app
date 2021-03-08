import React from 'react';
import { NextSeo } from 'next-seo';
import { Navbar } from '@/components/Navbar';
import { INavbar } from '@/lib/fragments';
import { OpenGraphImages } from 'next-seo/lib/types';
import { Footer } from '@/components/Footer';

type LayoutProps = {
  meta?: {
    title?: string;
    description?: string;
    titleAppendSiteName?: boolean;
    url?: string;
    ogImage?: OpenGraphImages;
  };
  preview: boolean;
  navbar: INavbar;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children, meta = {}, navbar, preview }) => {
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
      <div className="flex flex-col justify-between min-h-screen overflow-hidden bg-white">
        <Navbar preview={preview} navbar={navbar} />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};
