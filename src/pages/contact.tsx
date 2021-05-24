import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { contactQuery, IContactPage } from '@/lib/sanity/resources/contactPage.resource';
import { getFooterAndNavbar } from '@/lib/sanity/resources/shared.resource';

import { Contact } from '@/components/contact/Contact';
const ContactPreview = dynamic(() => import('@/components/contact/ContactPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IContactPage>(contactQuery);

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

export default function ContactPage(props: PageProps) {
  return props.preview ? <ContactPreview {...props} /> : <Contact {...props} />;
}
