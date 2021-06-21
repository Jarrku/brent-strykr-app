import { DocumentType, ObjectType, SchemaType } from '../schema.types';
import {
HiOutlineAnnotation,
} from 'react-icons/hi'
const testimonialDef = {
  name: DocumentType.TESTIMONIAL,
  type: SchemaType.DOCUMENT,
  title: 'Testimonial',
  icon: HiOutlineAnnotation,
  // hidden: true,
  // description: 'Testimonial',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: SchemaType.STRING,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'review',
      title: 'Review',
      type: SchemaType.TEXT,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Auteur',
      type: ObjectType.PERSON,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  validation: (Rule: any) => Rule.required(),
  preview: {
    select: {
      title: 'author.name',
      subtitle: 'title',
      media: 'author.photo',
    }
  }
};

export default testimonialDef;
