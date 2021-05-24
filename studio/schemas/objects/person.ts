import { MdPerson } from 'react-icons/md';
import { ObjectType, SchemaType } from '../schema.types';

const personSchema = {
  name: ObjectType.PERSON,
  type: SchemaType.OBJECT,
  title: 'Person',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: SchemaType.STRING,
    },
    {
      name: 'description',
      title: 'Omschrijving',
      type: SchemaType.STRING,
    },
    {
      name: 'photo',
      title: 'Foto',
      type: ObjectType.FIGURE,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    }
  }
};

export default personSchema;
