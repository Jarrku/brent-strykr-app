import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { homeQuery, IHomePage } from '@/lib/sanity/resources/homePage.resource';
import { getFooterAndNavbar } from '@/lib/sanity/resources/shared.resource';

import { Home } from '@/components/home/Home';
const HomePreview = dynamic(() => import('@/components/home/HomePreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IHomePage>(homeQuery);
  const data = await getFooterAndNavbar(preview);

  return {
    props: {
      preview,
      initialData,
      ...data,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage(props: PageProps) {
  return props.preview ? <HomePreview {...props} /> : <Home {...props} />;
}
