import { footerQuery } from '@/lib/sanity/resources/footer.resource';
import { navbarQuery } from '@/lib/sanity/resources/navbar.resource';
import { pricingQuery } from '@/lib/sanity/resources/pricingPage.resource';
import { usePreviewSubscription } from '@/lib/sanity/sanity';
import { Pricing, PricingProps } from './Pricing';

export default function PricingPreview({ initialData, footer, navbar, ...props }: PricingProps) {
  const { data } = usePreviewSubscription(pricingQuery, { initialData, enabled: true });
  const { data: footerData } = usePreviewSubscription(footerQuery, { initialData: footer, enabled: true });
  const { data: navbarData } = usePreviewSubscription(navbarQuery, { initialData: navbar, enabled: true });

  console.log({ navbarData });
  return <Pricing initialData={data} footer={footerData} navbar={navbarData} {...props} />;
}
