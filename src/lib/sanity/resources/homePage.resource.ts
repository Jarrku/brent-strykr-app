import type { SanityBlockContent } from '@/components/SanityBlockContent';
import { groq } from 'next-sanity';

export const homeQuery = groq`
  *[_id == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroIntro,
    heroCtaPrimary,
    heroCtaSecondary,
    featuresTitle,
    features[] {
      title,
      content,
      icon,
    },
    explainerTitle,
    explainerSubtitle,
    explainerContent,
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
  featuresTitle: string;
  features: FeatureItem[];
  explainerTitle: string;
  explainerSubtitle: string;
  explainerContent: SanityBlockContent;
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
