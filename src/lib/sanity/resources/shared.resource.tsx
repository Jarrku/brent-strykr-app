import { PageProps } from '@/lib/types';
import { usePreviewSubscription } from '../sanity';
import { getClient } from '../sanity.server';
import { footerQuery, IFooter } from './footer.resource';
import { INavbar, navbarQuery } from './navbar.resource';

export async function getFooterAndNavbar(preview = false) {
  const footer = await getClient(preview).fetch<IFooter>(footerQuery);
  const navbar = await getClient(preview).fetch<INavbar>(navbarQuery);

  return { footer, navbar };
}

export function createPreviewComponent<T>(query: string, Component: (props: PageProps<T>) => JSX.Element) {
  return ({ initialData, footer, navbar, ...props }: PageProps<T>) => {
    const { data } = usePreviewSubscription(query, { initialData: initialData, enabled: true });
    const { data: footerData } = usePreviewSubscription(footerQuery, { initialData: footer, enabled: true });
    const { data: navbarData } = usePreviewSubscription(navbarQuery, { initialData: navbar, enabled: true });

    return <Component initialData={data} navbar={navbarData} footer={footerData} {...props} />;
  };
}
