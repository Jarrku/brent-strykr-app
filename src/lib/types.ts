import type { IFooter } from './sanity/resources/footer.resource';
import type { INavbar } from './sanity/resources/navbar.resource';

export interface EmailProps {
  body: string;
  replyTo: string;
  replyToName?: string;
  to: string;
  toName?: string;
  sender: string;
  senderName?: string;
  subject: string;
  attachmentUrl?: string;
}

export interface PageProps<P> {
  initialData: P;
  footer: IFooter;
  navbar: INavbar;
  preview: boolean;
}
