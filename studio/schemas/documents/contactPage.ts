
import { HiInformationCircle } from 'react-icons/hi';

import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const contactPageDef = {
  name: DocumentType.CONTACT_PAGE,
  type: SchemaType.DOCUMENT,
  title: 'Contact Page',
  icon: HiInformationCircle,
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
      type: SchemaType.TEXT,
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
      type: ObjectType.CONTACT_EMAIL,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  validation: (Rule: any) => Rule.required(),
  preview: {
    select: {
      title: 'title',
    }
  }
};

export default contactPageDef;
