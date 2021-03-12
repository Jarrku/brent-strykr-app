import { createClient } from 'urql';
import {
  AboutpageQueryVariables,
  AboutpageResponse,
  aboutQuery,
  ContactpageQueryVariables,
  ContactpageResponse,
  contactQuery,
  HomepageQueryVariables,
  HomepageResponse,
  homeQuery,
  navbarQuery,
  NavbarQueryVariables,
  NavbarResponse,
  PricingpageQueryVariables,
  PricingpageResponse,
  pricingQuery,
} from './fragments';

const previewClient = createClient({ url: process.env.contentfulPreviewGraphQLUrl });
const client = createClient({ url: process.env.contentfulGraphQLUrl });

export const getContentfulClient = (preview: boolean) => (preview ? previewClient : client);

const navbarId = '49XDxXNNJifXxWOU4x7Gzf';

function getData<T>(preview: boolean, queryPromise: Promise<T>) {
  return Promise.all([
    queryPromise,
    getContentfulClient(preview)
      .query<NavbarResponse, NavbarQueryVariables>(navbarQuery, { id: navbarId, preview })
      .toPromise(),
  ]);
}

const homeId = '3ZRIBHbWfwN3UNvLWRaU3b';

export function getHomepageData(preview: boolean) {
  return getData(
    preview,
    getContentfulClient(preview)
      .query<HomepageResponse, HomepageQueryVariables>(homeQuery, { id: homeId, preview })
      .toPromise(),
  );
}

const aboutpageId = '2mHXO8OqXL1PehsNPEI6YM';

export function getAboutpageData(preview: boolean) {
  return getData(
    preview,
    getContentfulClient(preview)
      .query<AboutpageResponse, AboutpageQueryVariables>(aboutQuery, { id: aboutpageId, preview })
      .toPromise(),
  );
}

const pricingpageId = '4lfpG7WDEinEJ2ufUb6686';

export function getPricingpageData(preview: boolean) {
  return getData(
    preview,
    getContentfulClient(preview)
      .query<PricingpageResponse, PricingpageQueryVariables>(pricingQuery, { id: pricingpageId, preview })
      .toPromise(),
  );
}

const contactpageId = '37F4Bbrsg4omLSranHhxXf';

export function getContactpageData(preview: boolean) {
  return getData(
    preview,
    getContentfulClient(preview)
      .query<ContactpageResponse, ContactpageQueryVariables>(contactQuery, { id: contactpageId, preview })
      .toPromise(),
  );
}
