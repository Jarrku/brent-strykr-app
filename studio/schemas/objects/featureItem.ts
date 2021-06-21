import { ObjectType, SchemaType } from '../schema.types';

const featureItemDef = {
  name: ObjectType.FEATURE_ITEM,
  type: SchemaType.OBJECT,
  title: 'Feature Item',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: SchemaType.TEXT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: SchemaType.STRING,
      options: {
        list: ['globe', 'something else']
      },
      validation: (Rule: any) => Rule.required(),
    }
  ],
  validation: (Rule: any) => Rule.required(),
};

export default featureItemDef;
