import { ObjectType, SchemaType } from '../schema.types';

const pricingEmailDef = {
  name: ObjectType.PRICING_EMAIL,
  type: SchemaType.OBJECT,
  title: 'Pricing Email',
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
      name: 'body',
      title: 'Body',
      type: SchemaType.TEXT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'replyTo',
      title: 'Reply to:',
      // description: 'Naar welk emailadres de formulieren opgestuurd zullen worden',
      type: SchemaType.EMAIL,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'replyToName',
      title: 'Reply To Name',
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
    {
      name: 'attachment',
      title: 'Attachment',
      type: SchemaType.FILE,
      options: {
        accept: '.pdf',
      },
      validation: (Rule: any) => Rule.required(),
    }
  ],
  validation: (Rule: any) => Rule.required(),
};

export default pricingEmailDef;
