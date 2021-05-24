import { footerQuery } from '@/lib/sanity/resources/footer.resource';
import { homeQuery } from '@/lib/sanity/resources/homePage.resource';
import { navbarQuery } from '@/lib/sanity/resources/navbar.resource';
import { usePreviewSubscription } from '@/lib/sanity/sanity';
import { Home, HomeProps } from './Home';

export default function HomePreview({ initialData, footer, navbar, ...props }: HomeProps) {
  const { data } = usePreviewSubscription(homeQuery, { initialData, enabled: true });
  const { data: footerData } = usePreviewSubscription(footerQuery, { initialData: footer, enabled: true });
  const { data: navbarData } = usePreviewSubscription(navbarQuery, { initialData: navbar, enabled: true });

  return <Home initialData={data} navbar={navbarData} footer={footerData} {...props} />;
}
