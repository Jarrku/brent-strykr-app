import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

import { getAboutpageData } from '@/lib/contentfulClient';

import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';
import { IContentListItem } from '@/lib/fragments';
import { DefaultLayout } from '@/layouts';

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const [about, navbar] = await getAboutpageData(preview);
  if (!about.data || !navbar.data) throw new Error('Failed to fetch data from contentful');

  return {
    props: {
      preview,
      t: about.data.about,
      navbar: navbar.data.navbar,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function About({ t, navbar, preview }: PageProps) {
  return (
    <DefaultLayout navbar={navbar} preview={preview}>
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
                    alt={t.coverImage.title}
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
              <Paragraphs items={t.contentCollection.items} />
              <h3>{t.sectionTitle}</h3>
              <Paragraphs items={t.sectionContentCollection.items} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </DefaultLayout>
  );
}

function Paragraphs({ items }: { items: IContentListItem[] }) {
  return (
    <>
      {items.map(({ sys, content, listItems }) =>
        content ? (
          <p key={sys.id}>{content}</p>
        ) : listItems ? (
          <ul key={sys.id}>
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null,
      )}
    </>
  );
}
