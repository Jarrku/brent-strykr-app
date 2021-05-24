import { ObjectType, SchemaType } from '../schema.types';

const contactEmailDef = {
  name: ObjectType.CONTACT_EMAIL,
  type: SchemaType.OBJECT,
  title: 'Contact Email',
  // hidden: true,
  description: 'This template will be used to create emails',
  fields: [
    {
      name: 'subject',
      title: 'Subject',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'to',
      title: 'Verzender naar:',
      description: 'Naar welk emailadres de formulieren opgestuurd zullen worden',
      type: SchemaType.EMAIL,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'toName',
      title: 'Aan wie',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sender',
      title: 'Sender',
      type: SchemaType.EMAIL,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'senderName',
      title: 'Sender Name',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  validation: (Rule: any) => Rule.required(),
};

export default contactEmailDef;
