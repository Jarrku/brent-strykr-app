import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const navbarDef = {
  name: DocumentType.NAVBAR,
  type: SchemaType.DOCUMENT,
  title: 'Navbar',
  // description: 'Testimonial',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: ObjectType.ICON,
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
          type: SchemaType.REFERENCE,
          to: [{ type: DocumentType.NAV_LINK }]
        }
      ]
    },
  ],
  validation: (Rule: any) => Rule.required(),
};

export default navbarDef;

