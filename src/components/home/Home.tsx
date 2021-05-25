import clsx from 'clsx';
import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import { JsonLD } from '../JsonLD';

import Image from 'next/image';

import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';
import { DefaultLayout } from '@/layouts';
import { IHomePage, ITestimonial } from '@/lib/sanity/resources/homePage.resource';
import { BlockContent } from '../SanityBlockContent';
import { PageProps } from '@/lib/types';

type Props = { t: IHomePage };

// TODO change to actual url
export function Home({ initialData: t, navbar, footer, preview }: PageProps<IHomePage>) {
  return (
    <DefaultLayout
      navbar={navbar}
      footer={footer}
      preview={preview}
      meta={{ url: 'https://styrkr-staging.vercel.app' }}
    >
      <JsonLD
        type="Organization"
        name="Styrkr"
        description="Gepersonaliseerde voedings- en trainingsplannen, begeleiding, training programs en online coaching. Ontworpen speciaal voor jou door Styrkr."
        logo={navbar.icon.url}
        url="https://styrkr-staging.vercel.app"
        email="info@stykr@gmail.com"
        founder="Brent De Wolf"
      />
      <Hero t={t} />
      <FeatureList t={t} />
      <Content t={t} />
    </DefaultLayout>
  );
}

function Hero({ t }: Props) {
  return (
    <div className="bg-gray-50">
      <main className="px-4 pt-16 pb-12 mx-auto max-w-7xl sm:pt-24 lg:pb-14">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">{t.heroTitle} </span>
            <span className="block text-indigo-600 xl:inline">{t.heroSubtitle}</span>
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t.heroIntro}
          </p>
          <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
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
  );
}

function FeatureList({ t }: Props) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DotsPatternSVG
          width="404"
          height="784"
          className="absolute top-0 transform -translate-x-1/2 left-full -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
        />

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{t.featuresTitle}</h2>
          </div>
          <div className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            {t.features.map((item) => (
              <FeatureItem
                key={item.title}
                title={item.title}
                description={item.content}
                // TODO make logo configurable
                logo={<GlobeIcon className="w-6 h-6" />}
              />
            ))}
            {/* <ScaleIcon className="w-6 h-6" /> */}
            {/* <LightningBoltIcon className="w-6 h-6" /> */}
            {/* <EmailIcon className="w-6 h-6" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Content({ t }: Props) {
  const [firstParagraph, ...paragraphs] = t.explainerContent;
  return (
    <div className="py-16 overflow-hidden bg-gray-50">
      <div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto text-base max-w-prose lg:max-w-none">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">{t.explainerTitle}</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {t.explainerSubtitle}
          </p>
        </div>
        <div className="relative z-10 mx-auto text-base max-w-prose lg:max-w-5xl lg:mx-0 lg:pr-72">
          <div className="text-lg text-gray-500">
            <BlockContent blocks={[firstParagraph]} />
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative z-10">
            <div className="mx-auto prose text-gray-500 prose-indigo lg:max-w-none">
              <BlockContent blocks={paragraphs} />
              <h3>{t.explainerSectionTitle}</h3>
              <BlockContent blocks={t.explainerSectionContent} />
            </div>
            <div className="flex mx-auto mt-10 text-base max-w-prose lg:max-w-none">
              <div className="rounded-md shadow">
                <ExplainerButton href="#" className="text-white bg-indigo-600 hover:bg-indigo-700">
                  {t.explainerCtaPrimary}
                </ExplainerButton>
              </div>
              <div className="ml-4 rounded-md shadow">
                <ExplainerButton href="#" className="text-indigo-600 bg-white hover:bg-gray-50">
                  {t.explainerCtaSecondary}
                </ExplainerButton>
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-12 text-base max-w-prose lg:mt-0 lg:max-w-none">
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
      <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">{logo}</div>
      <dl className="mt-5">
        <dt className="text-lg font-medium leading-6 text-gray-900">{title}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </dl>
    </div>
  );
}

function TestimonialUI({ testimonial }: { testimonial: ITestimonial }) {
  return (
    <blockquote className="relative bg-white rounded-lg shadow-lg">
      <div className="px-6 py-8 rounded-t-lg sm:px-10 sm:pt-10 sm:pb-8">
        <div className="prose">
          <h3>{testimonial.title}</h3>
        </div>
        {/* <img
      src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
      alt="Workcation"
      className="h-8"
    /> */}
        {/* <h5>Veel nut aan gehad!</h5> */}
        <div className="relative mt-8 text-lg font-medium text-gray-700">
          <svg
            className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-2"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="relative">{testimonial.review}</p>
        </div>
      </div>
      <cite className="relative flex items-center px-6 py-5 not-italic bg-indigo-600 rounded-b-lg sm:items-start sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
        <div className="relative border-2 border-white rounded-full sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
          <div className="relative w-12 h-12 sm:w-20 sm:h-20">
            <Image
              className="bg-indigo-300 rounded-full"
              src={testimonial.author.photo.url}
              alt={testimonial.author.photo.alt}
              layout="fill"
            />
          </div>
        </div>
        <span className="relative ml-4 font-semibold leading-6 text-indigo-200 sm:ml-24 sm:pl-1">
          <p className="font-semibold text-white sm:inline">{testimonial.author.name}</p>{' '}
          <p className="sm:inline">{testimonial.author.description}</p>
        </span>
      </cite>
    </blockquote>
  );
}
