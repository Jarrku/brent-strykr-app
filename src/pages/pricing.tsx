import clsx from 'clsx';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { CheckIcon } from '@/components/icons/CheckIcon';
import { Navbar } from '@/components/Navbar';
import { getPricingpageData } from '@/lib/contentfulClient';

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const [pricing, navbar] = await getPricingpageData(preview);
  if (!pricing.data || !navbar.data) throw new Error('Failed to fetch data from contentful');

  return {
    props: {
      preview,
      t: pricing.data.pricingPage,
      navbar: navbar.data.navbar,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Pricing({ t, navbar, preview }: PageProps) {
  const [first, second, third] = t.priceItemsCollection.items;

  return (
    <div className="relative bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <Navbar preview={preview} navbar={navbar} className="py-4" />
      </div>
      <div className="bg-gray-900">
        <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-12">
          <div className="text-center">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">{t.title}</h2>
            <p className="mt- text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{t.subtitle}</p>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">{t.intro}</p>
          </div>
        </div>

        <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                {first && (
                  <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                    <RegularPriceItem
                      className="lg:rounded-l-lg"
                      id={first.title}
                      title={first.title}
                      price={first.price}
                      benefits={first.benefits}
                      buttonText={first.cta}
                    />
                  </div>
                )}
                {second && (
                  <div className="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                    <HighlightedPriceItem
                      id={second.title}
                      title={second.title}
                      price={second.price}
                      benefits={second.benefits}
                      buttonText={second.cta}
                    />
                  </div>
                )}
                {third && (
                  <div className="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
                    <RegularPriceItem
                      className="lg:rounded-r-lg"
                      id={third.title}
                      title={third.title}
                      price={third.price}
                      benefits={third.benefits}
                      buttonText={third.cta}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPONENTS
function BenefitList({ benefits }: { benefits: string[] }) {
  return (
    <ul className="space-y-4">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start">
          <div className="flex-shrink-0">
            <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
          </div>
          <p className="ml-3 text-base font-medium text-gray-500">{benefit}</p>
        </li>
      ))}
    </ul>
  );
}

interface PriceItemHeaderProps {
  id: string;
  title: string;
  price: number;
  highlighted?: boolean;
}

function PriceItemHeader({ id, title, price, highlighted }: PriceItemHeaderProps) {
  return (
    <div>
      <h3
        className={clsx(
          'text-center text-gray-900',
          highlighted ? 'text-3xl font-semibold sm:-mx-6' : 'text-2xl font-medium',
        )}
        id={id}
      >
        {title}
      </h3>
      <div className="mt-4 flex items-center justify-center">
        <span
          className={clsx('px-3 flex items-start text-6xl tracking-tight text-gray-900', highlighted && 'sm:text-6xl')}
        >
          <span className="mt-2 mr-2 text-4xl font-medium">€</span>
          <span className="font-extrabold">{price}</span>
        </span>
        <span className={clsx('font-medium text-gray-500', highlighted ? 'text-2xl' : 'text-xl')}>/maand</span>
      </div>
    </div>
  );
}

interface PriceItemsProps {
  className?: string;
  id: string;
  title: string;
  price: number;
  benefits: string[];
  buttonText: string;
  onClick?: () => unknown;
}

function RegularPriceItem({ className, id, title, price, benefits, buttonText, onClick }: PriceItemsProps) {
  return (
    <div className={clsx('h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none', className)}>
      <div className="flex-1 flex flex-col">
        <div className="bg-white px-6 py-10">
          <PriceItemHeader id={id} title={title} price={price} />
        </div>
        <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
          <BenefitList benefits={benefits} />
          <div className="mt-8">
            <div className="rounded-lg shadow-md">
              <button
                className="block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50"
                aria-describedby={id}
                onClick={onClick}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightedPriceItem({ id, title, price, benefits, buttonText, onClick }: PriceItemsProps) {
  return (
    <div className="relative z-10 rounded-lg shadow-xl">
      <div
        className="pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-x-0 top-0 transform translate-y-px">
        <div className="flex justify-center transform -translate-y-1/2">
          <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
            Populairst
          </span>
        </div>
      </div>
      <div className="bg-white rounded-t-lg px-6 pt-12 pb-10">
        <PriceItemHeader id={id} title={title} price={price} highlighted />
      </div>
      <div className="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
        <BenefitList benefits={benefits} />
        <div className="mt-10">
          <div className="rounded-lg shadow-md">
            <button
              className="block w-full text-center rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-indigo-700"
              aria-describedby="tier-growth"
              onClick={onClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
