import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { aboutQuery, IAboutPage } from '@/lib/sanity/resources/aboutPage.resource';

import { footerQuery, IFooter } from '@/lib/sanity/resources/footer.resource';
import { INavbar, navbarQuery } from '@/lib/sanity/resources/navbar.resource';

import { About } from '@/components/about/About';
const AboutPreview = dynamic(() => import('@/components/about/AboutPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IAboutPage>(aboutQuery);

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

export default function AboutPage(props: PageProps) {
  return props.preview ? <AboutPreview {...props} /> : <About {...props} />;
}
