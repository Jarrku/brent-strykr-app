import type { SanityBlockContent } from '@/components/SanityBlockContent';
import { groq } from 'next-sanity';

export const aboutQuery = groq`
  *[_id == "aboutPage"][0] {
    title,
    subtitle,
    "coverImage": {
      "url": coverImage.asset->url,
      "caption": coverImage.caption,
      "alt": coverImage.alt,
    },
    intro,
    content,
    sectionTitle,
    sectionContent
  }
`;

export interface IAboutPage {
  title: string;
  subtitle: string;
  coverImage: {
    url: string;
    caption: string;
    alt: string;
  };
  intro: string;
  content: SanityBlockContent;
  sectionTitle: string;
  sectionContent: SanityBlockContent;
}
