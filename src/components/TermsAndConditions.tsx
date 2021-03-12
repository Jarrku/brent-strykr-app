import clsx from 'clsx';

interface TermsAndConditionsProps {
  policiesAccepted: boolean;
  onClick: () => void;
}

export function TermsAndConditions({ policiesAccepted, onClick }: TermsAndConditionsProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <button
          type="button"
          aria-pressed="false"
          className={clsx(
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            policiesAccepted ? 'bg-indigo-600' : 'bg-gray-200',
          )}
          onClick={onClick}
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
  );
}
