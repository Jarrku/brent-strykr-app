import { contactQuery } from '@/lib/sanity/resources/contactPage.resource';
import { createPreviewComponent } from '@/lib/sanity/resources/shared.resource';

import { Contact } from './Contact';

export default createPreviewComponent(contactQuery, Contact);
