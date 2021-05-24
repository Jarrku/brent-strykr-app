import { contactQuery } from '@/lib/sanity/resources/contactPage.resource';
import { footerQuery } from '@/lib/sanity/resources/footer.resource';
import { navbarQuery } from '@/lib/sanity/resources/navbar.resource';
import { usePreviewSubscription } from '@/lib/sanity/sanity';
import { Contact, ContactProps } from './Contact';

export default function PricingPreview({ initialData, footer, navbar, ...props }: ContactProps) {
  const { data } = usePreviewSubscription(contactQuery, { initialData, enabled: true });
  const { data: footerData } = usePreviewSubscription(footerQuery, { initialData: footer, enabled: true });
  const { data: navbarData } = usePreviewSubscription(navbarQuery, { initialData: navbar, enabled: true });

  return <Contact initialData={data} navbar={navbarData} footer={footerData} {...props} />;
}
