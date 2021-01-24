import clsx from 'clsx';
import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import Image from 'next/image';

import { getHomepageData } from '@/lib/contentfulClient';
import type { IContentListItem, ITestimonial } from '@/lib/fragments';

import { Navbar } from '@/components/Navbar';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const [homepage, navbar] = await getHomepageData(preview);
  if (!homepage.data || !navbar.data) throw new Error('Failed to fetch data from contentful');

  return {
    props: {
      preview,
      t: homepage.data.home,
      navbar: navbar.data.navbar,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type Props = Pick<PageProps, 't'>;

export default function Site({ t, navbar, preview }: PageProps) {
  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <Navbar preview={preview} navbar={navbar} />

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">{t.heroTitle}</span>{' '}
                  <span className="block text-indigo-600 xl:inline">{t.heroSubtitle}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t.heroIntro}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <HeroButton href="#" className="text-white bg-indigo-600 hover:bg-indigo-700">
                      {t.heroCtaPrimary}
                    </HeroButton>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <HeroButton href="#" className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                      {t.heroCtaSecondary}
                    </HeroButton>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 sm:h-72 md:h-96 lg:h-full w-full relative">
            <Image layout="fill" objectFit="cover" src={t.heroImage.url} alt={t.heroImage.title} priority />
          </div>
        </div>
      </div>
      <FeatureList t={t} />
      <Content t={t} />
    </>
  );
}

function FeatureList({ t }: Props) {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <DotsPatternSVG
          width="404"
          height="784"
          className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
        />

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{t.featuresTitle}</h2>
          </div>
          <div className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            {t.featuresCollection.items.map((item) => (
              <FeatureItem
                key={item.sys.id}
                title={item.title}
                description={item.content}
                logo={<GlobeIcon className="h-6 w-6" />}
              />
            ))}
            {/* <ScaleIcon className="h-6 w-6" /> */}
            {/* <LightningBoltIcon className="h-6 w-6" /> */}
            {/* <EmailIcon className="h-6 w-6" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Content({ t }: Props) {
  const [firstParagraph, ...paragraphs] = t.explainerContentCollection.items;
  return (
    <div className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        <div className="text-base max-w-prose mx-auto lg:max-w-none">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{t.explainerTitle}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.explainerSubtitle}
          </p>
        </div>
        <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
          <p className="text-lg text-gray-500">{firstParagraph.content}</p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative z-10">
            <div className="prose prose-indigo text-gray-500 mx-auto lg:max-w-none">
              <Paragraphs items={paragraphs} />
              <h3>{t.explainerSectionTitle}</h3>
              <Paragraphs items={t.explainerSectionContentCollection.items} />
            </div>
            <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
              <div className="rounded-md shadow">
                <ExplainerButton href="#" className="text-white bg-indigo-600 hover:bg-indigo-700">
                  {t.explainerCtaPrimary}
                </ExplainerButton>
              </div>
              <div className="rounded-md shadow ml-4">
                <ExplainerButton href="#" className="text-indigo-600 bg-white hover:bg-gray-50">
                  {t.explainerCtaSecondary}
                </ExplainerButton>
              </div>
            </div>
          </div>
          <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
            <DotsPatternSVG
              width="404"
              height="384"
              className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
            />
            <TestimonialUI testimonial={t.testimonial} />
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPONENTS
interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

function HeroButton({ children, className, ...props }: AnchorProps) {
  return (
    <a
      className={clsx(
        'w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function ExplainerButton({ children, className, ...props }: AnchorProps) {
  return (
    <a
      className={clsx(
        'w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// TODO make logo configurable
function FeatureItem({ title, description, logo }: { title: string; description: string; logo?: React.ReactChild }) {
  return (
    <div>
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">{logo}</div>
      <dl className="mt-5">
        <dt className="text-lg leading-6 font-medium text-gray-900">{title}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </dl>
    </div>
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

function TestimonialUI({ testimonial }: { testimonial: ITestimonial }) {
  return (
    <blockquote className="relative bg-white rounded-lg shadow-lg">
      <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
        <div className="prose">
          <h3>{testimonial.title}</h3>
        </div>
        {/* <img
      src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
      alt="Workcation"
      className="h-8"
    /> */}
        {/* <h5>Veel nut aan gehad!</h5> */}
        <div className="relative text-lg text-gray-700 font-medium mt-8">
          <svg
            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="relative">{testimonial.review}</p>
        </div>
      </div>
      <cite className="relative flex items-center sm:items-start bg-indigo-600 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
        <div className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
          <div className="w-12 h-12 sm:w-20 sm:h-20 relative">
            <Image
              className="rounded-full bg-indigo-300"
              src={testimonial.authorImage.url}
              alt={testimonial.authorImage.title}
              layout="fill"
            />
          </div>
        </div>
        <span className="relative ml-4 text-indigo-200 font-semibold leading-6 sm:ml-24 sm:pl-1">
          <p className="text-white font-semibold sm:inline">{testimonial.authorName}</p>{' '}
          <p className="sm:inline">{testimonial.authorSuffix}</p>
        </span>
      </cite>
    </blockquote>
  );
}
