// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
// import category from './documents/category';
// import product from './documents/product';
// import vendor from './documents/vendor';
// import productVariant from './documents/productVariant';
// import brand from './documents/brand';
// import social from './documents/social';
// import ad from './documents/ad';
// import swag from './documents/swag';
// import page from './documents/page';
// import route from './documents/route';
// import siteConfig from './documents/siteConfig';
import person from './objects/person';
// import popup from './documents/popup';

// Object types
import blockContent from './objects/blockContent';
// import cta from './objects/cta';
import figure from './objects/figure';
// import internalLink from './objects/internalLink';
// import link from './objects/link';
// import portableText from './objects/portableText';
// import simplePortableText from './objects/simplePortableText';
//TODO contactinfo
// import contactInfo from './objects/contactInfo';

// Landing page sections
// import hero from './objects/hero';
// import imageSection from './objects/imageSection';
// import textSection from './objects/textSection';

// import localeString from './locale/String';
// import localeText from './locale/Text';
// import localeBlockContent from './locale/BlockContent';

// custom
import contactEmail from './objects/contactEmail';
import pricingEmail from './objects/pricingEmail';
import featureItem from './objects/featureItem';
import formCta from './objects/formCta';
import icon from './objects/icon';
import socialMedia from './objects/socialMedia';

import pricingPage from './documents/pricingPage';
import aboutPage from './documents/aboutPage';
import contactPage from './documents/contactPage';
import homePage from './documents/homePage';
import navbar from './documents/navbar';
import navLink from './documents/navLink';
import testimonial from './documents/testimonial';
import footer from './documents/footer';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    pricingPage,
    // product,
    // popup,
    // vendor,
    // category,
    // brand,
    // social,
    // ad,
    // swag,
    // page,
    // route,
    // siteConfig,
    person,
    // When added to this list, object types can be used as
    contactEmail,
    // cta,
    figure,
    // internalLink,
    // link,
    // hero,
    // imageSection,
    // textSection,
    // portableText,
    // simplePortableText,
    // contactInfo,
    blockContent,
    // localeText,
    // localeBlockContent,
    // localeString,
    // productVariant,
    formCta,
    navLink,
    pricingEmail,
    testimonial,
    featureItem,
    icon,
    aboutPage,
    contactPage,
    homePage,
    navbar,
    footer,
    socialMedia,
  ]),
});
