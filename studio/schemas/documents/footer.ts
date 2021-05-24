import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const footerDef = {
  name: DocumentType.FOOTER,
  type: SchemaType.DOCUMENT,
  title: 'Footer',
  // description: 'Testimonial',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'links',
      title: 'Links',
      type: SchemaType.ARRAY,
      validation: (Rule: any) => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate menu items'),
      ],
      of: [
        {
          type: ObjectType.SOCIAL_MEDIA,
        },
      ],
    },
  ],
  validation: (Rule: any) => Rule.required(),
};

export default footerDef;
