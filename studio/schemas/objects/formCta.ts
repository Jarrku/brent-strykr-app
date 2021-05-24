import { ObjectType, SchemaType } from '../schema.types';

const formCtaDef = {
  name: ObjectType.FORM_CTA,
  type: SchemaType.OBJECT,
  title: 'Form CTA',
  // description: 'This template will be used to create emails',
  fields: [
    {
      name: 'cta',
      title: 'CTA',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaPending',
      title: 'CTA Pending',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaSuccess',
      title: 'CTA Success',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaFailed',
      title: 'CTA Failed',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaFailedInfo',
      title: 'CTA Failed Info',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  validation: (Rule: any) => Rule.required(),
};

export default formCtaDef;
