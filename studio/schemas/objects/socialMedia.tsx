import { ObjectType, SchemaType } from '../schema.types';
import * as React from 'react';

import { RiFacebookFill, RiInstagramLine, RiTwitterLine, RiLinkedinFill } from 'react-icons/ri';

const list = ['instagram', 'facebook', 'twitter', 'linkedin'] as const;

type SocialOptions = typeof list[number]

const socialMediaDef = {
  name: ObjectType.SOCIAL_MEDIA,
  type: SchemaType.OBJECT,
  title: 'Social Media',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: SchemaType.STRING,
      options: {
        list,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: SchemaType.URL,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'type',
      url: 'url',
    },
    prepare({ type, url }: { type: SocialOptions, url: string }) {


      return {
        title: url,
        media: <Icon type={type} />,
      }
    }

  },
  validation: (Rule: any) => Rule.required(),
};

function Icon({ type }: { type: SocialOptions }) {
  if(type === 'facebook') return <RiFacebookFill />
  if(type === 'instagram') return <RiInstagramLine />
  if(type === 'twitter') return <RiTwitterLine />
  if(type === 'linkedin') return <RiLinkedinFill />

  return null;
}

export default socialMediaDef;
