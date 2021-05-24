import { groq } from 'next-sanity';

export const pricingQuery = groq`
  *[_id == "pricingPage"][0] {
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
      body,
      replyTo,
      replyToName,
      sender,
      senderName,
      "attachmentUrl": attachment.asset->url,
    }
  }
`;

export interface IPricingPage {
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
  attachmentUrl: string;
  body: string;
  replyTo: string;
  replyToName: string;
  sender: string;
  senderName: string;
  subject: string;
}
