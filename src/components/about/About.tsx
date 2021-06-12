import Image from 'next/image';

import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';
import { DefaultLayout } from '@/layouts';

import { IAboutPage } from '@/lib/sanity/resources/aboutPage.resource';
import { BlockContent } from '../SanityBlockContent';
import { PageProps } from '@/lib/types';

export function About({ initialData: t, navbar, footer, preview }: PageProps<IAboutPage>) {
  return (
    <DefaultLayout
      navbar={navbar}
      footer={footer}
      preview={preview}
      meta={{
        title: 'Over mij, Brent De Wolf',
        titleAppendSiteName: true,
        description:
          'Ik ben Brent De Wolf, en ik heb al een dikke 8 jaar ervaring op het gebied van fitness. Ontdek hier meer over mijn ervaring.',
        ogImage: {
          url: 'https://styrkr-staging.vercel.app/images/brent.webp',
          height: 1440,
          width: 1440,
          alt: 'Brent De Wolf',
        },
        url: 'https://styrkr-staging.vercel.app/over-mij',
      }}
    >
      <div className="relative px-4 py-8 mx-auto sm:py-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4"></div>
        <div className="mx-auto text-base max-w-prose lg:max-w-none">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">{t.title}</h2>
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {t.subtitle}
          </h3>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-2">
            <DotsPatternSVG className="absolute top-0 right-0 hidden -mt-20 -mr-20 lg:block" width="404" height="384" />
            <div className="relative mx-auto text-base max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-h-12">
                  <Image
                    className="object-cover object-top rounded-lg shadow-lg lg:object-center"
                    src={t.coverImage.url}
                    alt={t.coverImage.alt}
                    layout="fill"
                    priority
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto text-base max-w-prose lg:max-w-none">
              <p className="text-lg text-gray-500">{t.intro}</p>
            </div>
            <div className="mx-auto mt-5 prose text-gray-500 prose-indigo lg:max-w-none lg:row-start-1 lg:col-start-1">
              <BlockContent blocks={t.content} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </DefaultLayout>
  );
}
