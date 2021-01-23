import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import clsx from 'clsx';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
// type Props = Omit<PageProps, 'preview'>;

//TODO get correct id
const contactId = '3ZRIBHbWfwN3UNvLWRaU3b';

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  // const res = await getContentfulClient(preview)
  //   .query(homeQuery, { id: pricingId, preview: !!preview })
  //   .toPromise();

  return {
    props: {
      preview: !!preview,
      // t: res.data!.home,
    },
  };
};

export default function Contact({ preview }: PageProps) {
  const [policiesAccepted, setPoliciesAccepted] = useState(false);

  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar preview={preview} className="py-4" />
      </div>
      <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">
        <div className="relative max-w-xl mx-auto">
          <DotsPatternSVG width="404" height="404" className="absolute left-full transform translate-x-1/2" />
          <DotsPatternSVG
            width="404"
            height="404"
            className="absolute right-full transform -translate-x-1/2 bottom-0"
          />

          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Contact</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
              arcu.
            </p>
          </div>
          <div className="mt-12">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <Input label="Voornaam" id="first_name" autoComplete="given-name" />
              <Input label="Achternaam" id="last_name" autoComplete="family-name" />

              <Input className="sm:col-span-2" label="Email" id="email" autoComplete="email" />
              <Input
                className="sm:col-span-2"
                label="Telefoonnummer"
                id="phone_number"
                autoComplete="tel"
                placeholder="+32 479 22 78 72"
              />
              <Input className="sm:col-span-2" label="Boodschap" id="message" textarea />

              <div className="sm:col-span-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      aria-pressed="false"
                      className={clsx(
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                        policiesAccepted ? 'bg-indigo-600' : 'bg-gray-200',
                      )}
                      onClick={() => setPoliciesAccepted((p) => !p)}
                    >
                      <span className="sr-only">Policies aanvaarden</span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          policiesAccepted ? 'translate-x-5' : 'translate-x-0',
                        )}
                      ></span>
                    </button>
                  </div>
                  <div className="ml-3">
                    <p className="text-base text-gray-500">
                      Door dit aan te vinken, gaat u akkoord met onze{' '}
                      <a href="#privacy-policy" className="font-medium text-gray-700 underline">
                        Privacy Policy
                      </a>{' '}
                      en{' '}
                      <a href="#terms-and-conditions" className="font-medium text-gray-700 underline">
                        Algemene voorwaarden
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verzenden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPONENTS
interface InputProps {
  id: string;
  name?: string;
  rows?: number;
  label: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
}

const inputClassName =
  'py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md';

function Input({ label, className, id, autoComplete, placeholder, textarea, rows = 4, name = id }: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            autoComplete={autoComplete}
            placeholder={placeholder}
            rows={rows}
            className={inputClassName}
          />
        ) : (
          <input
            type="text"
            name={name}
            id={id}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
      </div>
    </div>
  );
}