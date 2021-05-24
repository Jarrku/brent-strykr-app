import defaultResolve, { PublishAction, DiscardChangesAction } from 'part:@sanity/base/document-actions';
import { isSingleton } from '../config';

export default function resolveDocumentActions(props: { type: string } ) {
  if(isSingleton(props.type)) {
    return [PublishAction, DiscardChangesAction];
  }

  return defaultResolve(props);
}
