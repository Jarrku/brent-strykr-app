import S from '@sanity/base/structure-builder';
import { isSingleton } from '../config';

const newDocumentStructure = [...S.defaultInitialValueTemplateItems()].filter(
  (item) => !isSingleton(item.getId()),
);

export default newDocumentStructure;
