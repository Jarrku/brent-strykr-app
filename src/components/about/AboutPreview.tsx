import { aboutQuery } from '@/lib/sanity/resources/aboutPage.resource';
import { footerQuery } from '@/lib/sanity/resources/footer.resource';
import { navbarQuery } from '@/lib/sanity/resources/navbar.resource';
import { usePreviewSubscription } from '@/lib/sanity/sanity';
import { About, AboutProps } from './About';

export default function AboutPreview({ initialData, footer, navbar, ...props }: AboutProps) {
  const { data } = usePreviewSubscription(aboutQuery, { initialData, enabled: true });
  const { data: footerData } = usePreviewSubscription(footerQuery, { initialData: footer, enabled: true });
  const { data: navbarData } = usePreviewSubscription(navbarQuery, { initialData: navbar, enabled: true });

  return <About initialData={data} footer={footerData} navbar={navbarData} {...props} />;
}
