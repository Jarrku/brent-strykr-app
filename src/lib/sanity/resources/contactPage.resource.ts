import { groq } from 'next-sanity';

export const contactQuery = groq`
 *[_id == "contactPage"][0] {
    title,
    intro,
    cta {
      cta,
      ctaFailed,
      ctaFailedInfo,
      ctaPending,
      ctaSuccess
    },
    emailTemplate {
      subject,
      to,
      toName,
      sender,
      senderName,
    }
  }
`;

export interface IContactPage {
  cta: Cta;
  emailTemplate: EmailTemplate;
  intro: string;
  title: string;
}

interface Cta {
  cta: string;
  ctaFailed: string;
  ctaFailedInfo: string;
  ctaPending: string;
  ctaSuccess: string;
}

interface EmailTemplate {
  subject: string;
  to: string;
  toName: string;
  sender: string;
  senderName: string;
}
