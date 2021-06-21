import { pricingQuery } from '@/lib/sanity/resources/pricingPage.resource';
import { createPreviewComponent } from '@/lib/sanity/resources/shared.resource';

import { Pricing } from './Pricing';

export default createPreviewComponent(pricingQuery, Pricing);
