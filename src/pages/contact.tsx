import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { contactQuery, IContactPage } from '@/lib/sanity/resources/contactPage.resource';

import { Contact } from '@/components/contact/Contact';
import { footerQuery, IFooter } from '@/lib/sanity/resources/footer.resource';
import { INavbar, navbarQuery } from '@/lib/sanity/resources/navbar.resource';
const ContactPreview = dynamic(() => import('@/components/contact/ContactPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IContactPage>(contactQuery);
  const footer = await getClient(preview).fetch<IFooter>(footerQuery);
  const navbar = await getClient(preview).fetch<INavbar>(navbarQuery);

  return {
    props: {
      preview,
      footer,
      navbar,
      initialData,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ContactPage(props: PageProps) {
  return props.preview ? <ContactPreview {...props} /> : <Contact {...props} />;
}
