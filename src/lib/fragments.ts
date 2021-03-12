import { gql } from 'urql';

interface SysId {
  sys: {
    id: string;
  };
}

const AssetFragment = gql`
  fragment AssetFragment on Asset {
    sys {
      id
    }
    title
    description
    url
  }
`;

export interface IAsset extends SysId {
  title: string;
  description?: null | string;
  url: string;
}

const CtaFragment = gql`
  fragment CtaFragment on FormCta {
    cta
    ctaFailed
    ctaPending
    ctaSuccess
    ctaFailedInfo
  }
`;

export interface ICta {
  cta: string;
  ctaFailed: string;
  ctaPending: string;
  ctaSuccess: string;
  ctaFailedInfo: string;
}

const FeatureItemFragment = gql`
  fragment FeatureItemFragment on FeatureItem {
    sys {
      id
    }
    title
    content
  }
`;

export interface IFeatureItem extends SysId {
  title: string;
  content: string;
}

const ListItemFragment = gql`
  fragment ListItemFragment on List {
    sys {
      id
    }
    listItems: content
  }
`;

export interface IListItem extends SysId {
  listItems: string[];
  content: undefined;
}

const ParagraphFragment = gql`
  fragment ParagraphFragment on Parapgraph {
    sys {
      id
    }
    content
  }
`;

export interface IParagraph extends SysId {
  content: string;
  listItems: undefined;
}

const TestimonialFragment = gql`
  fragment TestimonialFragment on Testimonial {
    sys {
      id
    }
    title
    review
    authorName
    authorSuffix
    authorImage {
      ...AssetFragment
    }
  }

  ${AssetFragment}
`;

export interface ITestimonial extends SysId {
  title: string;
  review: string;
  authorName: string;
  authorSuffix: string;
  authorImage: IAsset;
}

export interface HomepageQueryVariables {
  id: string;
  preview: boolean;
}

export const homeQuery = gql`
  query homeQuery($id: String!, $preview: Boolean!) {
    home(id: $id, preview: $preview) {
      heroTitle
      heroSubtitle
      heroIntro
      heroCtaPrimary
      heroCtaSecondary
      heroImage {
        ...AssetFragment
      }
      featuresTitle
      featuresCollection {
        items {
          ... on FeatureItem {
            ...FeatureItemFragment
          }
        }
      }
      explainerTitle
      explainerSubtitle
      explainerContentCollection {
        items {
          ... on List {
            ...ListItemFragment
          }
          ... on Parapgraph {
            ...ParagraphFragment
          }
        }
      }
      explainerSectionTitle
      explainerSectionContentCollection {
        items {
          ... on List {
            ...ListItemFragment
          }
          ... on Parapgraph {
            ...ParagraphFragment
          }
        }
      }
      explainerCtaPrimary
      explainerCtaSecondary
      testimonial {
        ...TestimonialFragment
      }
    }
    # add your query
  }

  ${AssetFragment}
  ${ListItemFragment}
  ${FeatureItemFragment}
  ${ParagraphFragment}
  ${TestimonialFragment}
`;

export type IContentListItem = IListItem | IParagraph;

interface IHomepage {
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroImage: IAsset;
  featuresTitle: string;
  featuresCollection: {
    items: IFeatureItem[];
  };
  explainerTitle: string;
  explainerSubtitle: string;
  explainerContentCollection: {
    items: IContentListItem[];
  };
  explainerSectionTitle: string;
  explainerSectionContentCollection: {
    items: IContentListItem[];
  };
  explainerCtaPrimary: string;
  explainerCtaSecondary: string;
  testimonial: ITestimonial;
}

export interface HomepageResponse {
  home: IHomepage;
}

const NavLinkFragment = gql`
  fragment NavLinkFragment on NavLink {
    sys {
      id
    }
    url
    label
  }
`;

export interface INavLink extends SysId {
  url: string;
  label: string;
}

export interface NavbarQueryVariables {
  id: string;
  preview: boolean;
}

export const navbarQuery = gql`
  query navbarQuery($id: String!, $preview: Boolean!) {
    navbar(id: $id, preview: $preview) {
      icon {
        ...AssetFragment
      }
      linksCollection {
        items {
          ... on NavLink {
            ...NavLinkFragment
          }
        }
      }
    }
    # add your query
  }

  ${AssetFragment}
  ${NavLinkFragment}
`;

export interface INavbar {
  icon: IAsset;
  linksCollection: {
    items: INavLink[];
  };
}

export interface NavbarResponse {
  navbar: INavbar;
}

export interface AboutpageQueryVariables {
  id: string;
  preview: boolean;
}

export const aboutQuery = gql`
  query aboutQuery($id: String!, $preview: Boolean!) {
    about(id: $id, preview: $preview) {
      title
      subtitle
      coverImage {
        ...AssetFragment
      }
      intro
      contentCollection {
        items {
          ... on List {
            ...ListItemFragment
          }
          ... on Parapgraph {
            ...ParagraphFragment
          }
        }
      }
      sectionTitle
      sectionContentCollection {
        items {
          ... on List {
            ...ListItemFragment
          }
          ... on Parapgraph {
            ...ParagraphFragment
          }
        }
      }
    }
  }

  ${AssetFragment}
  ${ListItemFragment}
  ${ParagraphFragment}
`;

interface IAboutpage {
  title: string;
  subtitle: string;
  coverImage: IAsset;
  intro: string;
  contentCollection: {
    items: IContentListItem[];
  };
  sectionTitle: string;
  sectionContentCollection: {
    items: IContentListItem[];
  };
}

export interface AboutpageResponse {
  about: IAboutpage;
}

const PricingEmailFragment = gql`
  fragment PricingEmailFragment on PricingEmail {
    subject
    body
    replyTo
    replyToName
    sender
    senderName
    attachment {
      ...AssetFragment
    }
  }

  ${AssetFragment}
`;

export interface IPricingEmail {
  subject: string;
  body: string;
  replyTo: string;
  replyToName: string;
  sender: string;
  senderName: string;
  attachment: IAsset;
}

export interface PricingpageQueryVariables {
  id: string;
  preview: boolean;
}

export const pricingQuery = gql`
  query pricingQuery($id: String!, $preview: Boolean!) {
    pricingPage(id: $id, preview: $preview) {
      title
      intro
      cta {
        ...CtaFragment
      }
      emailTemplate {
        ...PricingEmailFragment
      }
    }
  }

  ${CtaFragment}
  ${PricingEmailFragment}
`;

export interface IPricingpage {
  title: string;
  intro: string;
  cta: ICta;
  emailTemplate: IPricingEmail;
}

export interface PricingpageResponse {
  pricingPage: IPricingpage;
}

const ContactEmailFragment = gql`
  fragment ContactEmailFragment on ContactEmail {
    subject
    to
    toName
    sender
    senderName
  }
`;

export interface IContactEmail {
  subject: string;
  to: string;
  toName: string;
  sender: string;
  senderName: string;
}

export interface ContactpageQueryVariables {
  id: string;
  preview: boolean;
}

export const contactQuery = gql`
  query contactQuery($id: String!, $preview: Boolean!) {
    contactPage(id: $id, preview: $preview) {
      title
      intro
      cta {
        ...CtaFragment
      }
      emailTemplate {
        ...ContactEmailFragment
      }
    }
  }

  ${CtaFragment}
  ${ContactEmailFragment}
`;

export interface IContactpage {
  title: string;
  intro: string;
  cta: ICta;
  emailTemplate: IContactEmail;
}

export interface ContactpageResponse {
  contactPage: IContactpage;
}
