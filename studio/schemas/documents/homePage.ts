
import { HiHome } from 'react-icons/hi';

import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const homepageDef = {
  name: DocumentType.HOME_PAGE,
  type: SchemaType.DOCUMENT,
  title: 'Home Page',
  icon: HiHome,
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero title',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroIntro',
      title: 'Hero intro',
      type: SchemaType.TEXT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroCtaPrimary',
      title: 'Hero CTA Primary',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroCtaSecondary',
      title: 'Hero CTA Secondary',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuresTitle',
      title: 'Features Title',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: SchemaType.ARRAY,
      of: [{ type: ObjectType.FEATURE_ITEM }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'explainerTitle',
      title: 'Explainer Title',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'explainerSubtitle',
      title: 'Explainer Subtitle',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'explainerContent',
      title: 'Explainer Content',
      type: ObjectType.BLOCK_CONTENT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'explainerCtaPrimary',
      title: 'Explainer CTA Primary',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'explainerCtaSecondary',
      title: 'Explainer CTA Secondary',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: SchemaType.REFERENCE,
      to: { type: DocumentType.TESTIMONIAL },
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

export default homepageDef;
