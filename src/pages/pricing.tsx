import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { pricingQuery, IPricingPage } from '@/lib/sanity/resources/pricingPage.resource';
import { footerQuery, IFooter } from '@/lib/sanity/resources/footer.resource';
import { INavbar, navbarQuery } from '@/lib/sanity/resources/navbar.resource';

import { Pricing } from '@/components/pricing/Pricing';
const PricingPreview = dynamic(() => import('@/components/pricing/PricingPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IPricingPage>(pricingQuery);
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

export default function PricingPage(props: PageProps) {
  return props.preview ? <PricingPreview {...props} /> : <Pricing {...props} />;
}
