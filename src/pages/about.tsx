import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { aboutQuery, IAboutPage } from '@/lib/sanity/resources/aboutPage.resource';

import { About } from '@/components/about/About';
import { getFooterAndNavbar } from '@/lib/sanity/resources/shared.resource';
const AboutPreview = dynamic(() => import('@/components/about/AboutPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IAboutPage>(aboutQuery);
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

export default function AboutPage(props: PageProps) {
  return props.preview ? <AboutPreview {...props} /> : <About {...props} />;
}
