
import { HiFingerPrint } from 'react-icons/hi';

import { DocumentType, ObjectType, SchemaType } from '../schema.types';

const aboutPageDef = {
  name: DocumentType.ABOUT_PAGE,
  type: SchemaType.DOCUMENT,
  title: 'About Page',
  icon: HiFingerPrint,
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: ObjectType.FIGURE,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Intro',
      type: SchemaType.TEXT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: ObjectType.BLOCK_CONTENT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sectionContent',
      title: 'Section Content',
      type: ObjectType.BLOCK_CONTENT,
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

export default aboutPageDef;
