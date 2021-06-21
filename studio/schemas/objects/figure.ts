import { ObjectType, SchemaType } from "../schema.types";

const figureSchema = {
  name:  ObjectType.FIGURE,
  title: 'Image',
  type: SchemaType.IMAGE,
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: SchemaType.STRING,
      options: {
        isHighlighted: true,
      },
    },
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
      title: 'caption',
    },
  },
};

export default figureSchema;