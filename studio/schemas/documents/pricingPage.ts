
import { HiCurrencyEuro } from 'react-icons/hi';

import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const pricingPageDef = {
  name: DocumentType.PRICING_PAGE,
  type: SchemaType.DOCUMENT,
  title: 'Pricing Page',
  icon: HiCurrencyEuro,
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Intro',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'cta',
      title: 'CTA',
      type: ObjectType.FORM_CTA,
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'emailTemplate',
      title: 'Email Template',
      type: ObjectType.PRICING_EMAIL,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  validation: (Rule: any) => Rule.required(),
  preview: {
    select: {
      title: 'title',
      // manufactor: 'manufactor.title',
      // media: 'defaultProductVariant.images[0]',
    }
  }
};

export default pricingPageDef;
