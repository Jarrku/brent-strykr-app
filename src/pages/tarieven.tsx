import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getClient } from '@/lib/sanity/sanity.server';
import { pricingQuery, IPricingPage } from '@/lib/sanity/resources/pricingPage.resource';
import { getFooterAndNavbar } from '@/lib/sanity/resources/shared.resource';

import { Pricing } from '@/components/pricing/Pricing';
const PricingPreview = dynamic(() => import('@/components/pricing/PricingPreview'));

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const initialData = await getClient(preview).fetch<IPricingPage>(pricingQuery);
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

export default function PricingPage(props: PageProps) {
  return props.preview ? <PricingPreview {...props} /> : <Pricing {...props} />;
}
