import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { homeQuery, IHomePage } from '@/lib/sanity/resources/homePage.resource';

import { Home } from '@/components/home/Home';
import { footerQuery, IFooter } from '@/lib/sanity/resources/footer.resource';
import { INavbar, navbarQuery } from '@/lib/sanity/resources/navbar.resource';
const HomePreview = dynamic(() => import('@/components/home/HomePreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IHomePage>(homeQuery);
  const footer = await getClient(preview).fetch<IFooter>(footerQuery);
  const navbar = await getClient(preview).fetch<INavbar>(navbarQuery);

  return {
    props: {
      preview,
      initialData,
      footer,
      navbar,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage(props: PageProps) {
  return props.preview ? <HomePreview {...props} /> : <Home {...props} />;
}
