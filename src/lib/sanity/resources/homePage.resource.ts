import type { SanityBlockContent } from '@/components/SanityBlockContent';
import { groq } from 'next-sanity';

export const homeQuery = groq`
  *[_id == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroIntro,
    heroCtaPrimary,
    heroCtaSecondary,
    "heroImage": {
      "url": heroImage.asset->url,
      "caption": heroImage.caption,
      "alt": heroImage.alt,
    },
    featuresTitle,
    features[] {
      title,
      content,
      icon,
    },
    explainerTitle,
    explainerSubtitle,
    explainerContent,
    explainerSectionTitle,
    explainerSectionContent,
    explainerCtaPrimary,
    explainerCtaSecondary,
    testimonial->{
      title,
      review,
      author {
        description,
        name,
        photo {
          alt,
          caption,
          "url": asset->url,
        }
      }
    }
  }
`;

export interface IHomePage {
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroImage: {
    url: string;
    caption: string;
    alt: string;
  };
  featuresTitle: string;
  features: FeatureItem[];
  explainerTitle: string;
  explainerSubtitle: string;
  explainerContent: SanityBlockContent;
  explainerSectionTitle: string;
  explainerSectionContent: SanityBlockContent;
  explainerCtaPrimary: string;
  explainerCtaSecondary: string;
  testimonial: ITestimonial;
}

export interface ITestimonial {
  title: string;
  review: string;
  author: {
    description: string;
    name: string;
    // TODO extract photo?
    photo: {
      alt: string;
      caption: string;
      url: string;
    };
  };
}

interface FeatureItem {
  title: string;
  content: string;
  // TODO narrow
  icon: string;
}
