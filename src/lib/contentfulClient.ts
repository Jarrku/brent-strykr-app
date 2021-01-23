import { createClient, gql } from 'urql';

const previewClient = createClient({
  url: process.env.contentfulPreviewGraphQLUrl!,
});

const client = createClient({
  url: process.env.contentfulGraphQLUrl!,
});

export const getContentfulClient = (preview?: boolean) => (preview ? previewClient : client);

export const homeQuery = gql`
  query homeQuery($id: String!, $preview: Boolean!) {
    home(id: $id, preview: $preview) {
      heroTitle
      heroSubtitle
      heroIntro
      heroCtaPrimary
      heroCtaSecondary
      heroImage {
        title
        description
        url
      }
      featuresTitle
      featuresCollection {
        items {
          ... on FeatureItem {
            sys {
              id
            }
            title
            content
          }
        }
      }
      explainerTitle
      explainerSubtitle
      explainerContentCollection {
        items {
          ... on List {
            sys {
              id
            }
            listItems: content
          }
          ... on Parapgraph {
            sys {
              id
            }
            content
          }
        }
      }
      explainerSectionTitle
      explainerSectionContentCollection {
        items {
          ... on List {
            sys {
              id
            }
            listItems: content
          }
          ... on Parapgraph {
            sys {
              id
            }
            content
          }
        }
      }
      explainerCtaPrimary
      explainerCtaSecondary
      testimonial {
        title
        review
        authorName
        authorSuffix
        authorImage {
          title
          url
        }
      }
    }
    # add your query
  }
`;

export interface HomeResponse {
  home: Home;
}

export interface Home {
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroImage: Image;
  featuresTitle: string;
  featuresCollection: FeaturesCollection;
  explainerTitle: string;
  explainerSubtitle: string;
  explainerContentCollection: ExplainerContentCollection;
  explainerSectionTitle: string;
  explainerSectionContentCollection: ExplainerContentCollection;
  explainerCtaPrimary: string;
  explainerCtaSecondary: string;
  testimonial: Testimonial;
  __typename: string;
}

export interface ExplainerContentCollection {
  items: ExplainerContentCollectionItem[];
  __typename: string;
}

export interface ExplainerContentCollectionItem {
  sys: {
    id: string;
  };
  content?: string;
  __typename: string;
  listItems?: string[];
}

export interface FeaturesCollection {
  items: FeaturesCollectionItem[];
  __typename: string;
}

export interface FeaturesCollectionItem {
  sys: {
    id: string;
  };
  title: string;
  content: string;
  __typename: string;
}

export interface Image {
  title: string;
  description?: null;
  url: string;
  __typename: string;
}

export interface Testimonial {
  title: string;
  review: string;
  authorName: string;
  authorSuffix: string;
  authorImage: Image;
  __typename: string;
}