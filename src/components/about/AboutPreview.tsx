import { aboutQuery } from '@/lib/sanity/resources/aboutPage.resource';
import { About } from './About';

import { createPreviewComponent } from '@/lib/sanity/resources/shared.resource';

export default createPreviewComponent(aboutQuery, About);
