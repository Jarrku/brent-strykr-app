import { ObjectType, SchemaType } from "../schema.types";

const iconSchema = {
  name:  ObjectType.ICON,
  title: 'Icon',
  type: SchemaType.IMAGE,
  options: {
    hotspot: false,
  },
  fields: [
    {
      name: 'alt',
      type: SchemaType.STRING,
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      // title: 'caption',
    },
  },
};

export default iconSchema;