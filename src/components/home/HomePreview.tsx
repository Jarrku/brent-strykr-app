import { homeQuery } from '@/lib/sanity/resources/homePage.resource';
import { createPreviewComponent } from '@/lib/sanity/resources/shared.resource';

import { Home } from './Home';

export default createPreviewComponent(homeQuery, Home);
