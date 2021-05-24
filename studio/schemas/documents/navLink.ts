import { HiLink } from 'react-icons/hi';
import { DocumentType, SchemaType } from '../schema.types';
const navLinkDef = {
  name: DocumentType.NAV_LINK,
  type: SchemaType.DOCUMENT,
  title: 'Nav Link',
  __experimental_actions: ['update', 'publish'],
  icon: HiLink,

  fields: [
    {
      name: 'label',
      title: 'Label',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'baseUrl',
      title: 'Base URL - Read Only',
      type: SchemaType.STRING,
      readOnly: true,
      // hidden: true,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order - Read Only',
      type: SchemaType.NUMBER,
      readOnly: true,
      hidden: true,
      validation: (Rule: any) => Rule.required(),
    }
  ],
  validation: (Rule: any) => Rule.required(),
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    }
  }
};

export default navLinkDef;
