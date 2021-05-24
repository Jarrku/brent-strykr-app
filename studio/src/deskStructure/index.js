import S from '@sanity/desk-tool/structure-builder';
// import ads from './ads';
// import categories from './categories';
// import person from './person';

// import siteSettings from './siteSettings';
import {
  HiOutlineInformationCircle,
  HiOutlineHome,
  HiOutlineFingerPrint,
  HiOutlineCurrencyEuro,
  HiOutlineGlobe,
  HiOutlineAnnotation,
  HiOutlineShare,
} from 'react-icons/hi';

import {
  PricingPagePreview,
  AboutPagePreview,
  HomePagePreview,
  ContactPagePreview,
} from '../components/previews/PagePreview';
import { DocumentType } from '../../schemas/schema.types';
// Hide document types that we already have a structure definition for
const hiddenDocTypes = (listItem) =>
  ![
    'category',
    'person',
    'sampleProject',
    'vendor',
    'siteSettings',
    'ad',
    'page',
    'product',
    'route',
    'siteConfig',
    DocumentType.HOME_PAGE,
    DocumentType.ABOUT_PAGE,
    DocumentType.PRICING_PAGE,
    DocumentType.CONTACT_PAGE,
    DocumentType.NAV_LINK,
    DocumentType.NAVBAR,
    DocumentType.TESTIMONIAL,
    DocumentType.FOOTER,
  ].includes(listItem.getId());

export default function Navigation() {
  return S.list()
    .title('Stryrkr')
    .items([
      // S.documentTypeListItem('product').title('Products'),
      // S.listItem()
      //   .title('Website')
      //   .icon(MdWeb)
      //   .child(
      //     S.list()
      //       .title('Website')
      //       .items([
      //         S.listItem()
      //           .title('Site configuration')
      //           .icon(MdSettings)
      //           .child(S.document().title('Site configuration').schemaType('siteConfig').documentId('siteConfig')),
      //         S.documentTypeListItem('route').title('Routes'),
      //         S.documentTypeListItem('page').title('Pages'),
      //       ]),
      //   ),
      S.listItem()
        .title('Home')
        .icon(HiOutlineHome)
        .child(
          S.document()
            .title('Home')
            .schemaType(DocumentType.HOME_PAGE)
            .documentId(DocumentType.HOME_PAGE)
            .views([S.view.form(), S.view.component(HomePagePreview).title('Preview')]),
        ),
      S.listItem()
        .title('Over mezelf')
        .icon(HiOutlineFingerPrint)
        .child(
          S.document()
            .title('Over mezelf')
            .schemaType(DocumentType.ABOUT_PAGE)
            .documentId(DocumentType.ABOUT_PAGE)
            .views([S.view.form(), S.view.component(AboutPagePreview).title('Preview')]),
        ),

      S.listItem()
        .title('Tarieven')
        .icon(HiOutlineCurrencyEuro)
        .child(
          S.document()
            .title('Tarieven')
            .schemaType(DocumentType.PRICING_PAGE)
            .documentId(DocumentType.PRICING_PAGE)
            .views([S.view.form(), S.view.component(PricingPagePreview).title('Preview')]),
        ),
      S.listItem()
        .title('Contact')
        .icon(HiOutlineInformationCircle)
        .child(
          S.document()
            .title('Contact')
            .schemaType(DocumentType.CONTACT_PAGE)
            .documentId(DocumentType.CONTACT_PAGE)
            .views([S.view.form(), S.view.component(ContactPagePreview).title('Preview')]),
        ),
      S.listItem()
        .title('Navigation')
        .icon(HiOutlineGlobe)
        .child(
          S.list()
            .title('Navbar')
            .items([
              S.listItem()
                .title('Navbar')
                // .icon(MdSettings)
                .child(
                  S.document()
                    .title('Navbar')
                    .schemaType(DocumentType.NAVBAR)
                    .documentId(DocumentType.NAVBAR)
                    .views([S.view.form(), S.view.component(PricingPagePreview).title('Preview')]),
                ),
              S.documentTypeListItem(DocumentType.NAV_LINK).title('Nav Links'),
            ]),
        ),
      S.listItem()
        .title('Footer')
        .icon(HiOutlineShare)
        .child(
          S.document()
            .title('Footer')
            .schemaType(DocumentType.FOOTER)
            .documentId(DocumentType.FOOTER)
            .views([S.view.form(), S.view.component(PricingPagePreview).title('Preview')]),
        ),
      S.documentTypeListItem(DocumentType.TESTIMONIAL).title('Testimonials'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
}

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */

  const { schemaType } = props;
  console.log('schemaType: ', schemaType);

  //  else if (schemaType === 'pricingPage') {
  //   console.log('schemaType: PRICING')
  //   return S.document().views([
  //     S.view.form(),
  //     S.view.component(PricingPagePreview).title('Preview'),
  //   ]);
  // }
  return S.document().views([S.view.form()]);
};
