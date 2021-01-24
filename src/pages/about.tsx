import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

import { getAboutpageData } from '@/lib/contentfulClient';

import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';
import { Navbar } from '@/components/Navbar';
import { IContentListItem } from '@/lib/fragments';
import { Footer } from '@/components/Footer';

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
    <>
      <div className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Navbar preview={preview} navbar={navbar} className="py-4" />
        </div>

        <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
          <div className="mx-auto text-base max-w-prose lg:max-w-none">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{t.title}</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t.subtitle}
            </h3>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <DotsPatternSVG
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width="404"
                height="384"
              />
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-h-12">
                    <Image
                      className="rounded-lg shadow-lg object-cover object-top lg:object-center"
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
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">{t.intro}</p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <Paragraphs items={t.contentCollection.items} />
                <h3>{t.sectionTitle}</h3>
                <Paragraphs items={t.sectionContentCollection.items} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
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
