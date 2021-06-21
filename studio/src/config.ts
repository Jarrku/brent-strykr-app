import { DocumentType } from '../schemas/schema.types';

export const singletons: string[] = [
  DocumentType.PRICING_PAGE,
  DocumentType.ABOUT_PAGE,
  DocumentType.CONTACT_PAGE,
  DocumentType.HOME_PAGE,
  DocumentType.NAVBAR,
  DocumentType.NAV_LINK,
  DocumentType.FOOTER,
];

export function isSingleton(type: string) {
  return singletons.includes(type);
}
