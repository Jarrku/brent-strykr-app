import { useCallback } from 'react';

import { DotsPatternSVG } from '@/components/icons/DotsPatternSVG';
import { DefaultLayout } from '@/layouts';
import { Input } from '@/components/Input';
import { useEmailForm, FormState, submitEmail } from '@/lib/formUtils';
import { TermsAndConditions } from '@/components/TermsAndConditions';
import { IPricingPage } from '@/lib/sanity/resources/pricingPage.resource';
import { PageProps } from '@/lib/types';

export function Pricing({ initialData: t, footer, navbar, preview }: PageProps<IPricingPage>) {
  const [state, dispatch, onSubmit] = usePricingForm(t);

  return (
    <DefaultLayout
      navbar={navbar}
      footer={footer}
      preview={preview}
      meta={{
        title: 'Tarieven',
        description: 'Vraag hier tarieven aan voor de diensten van Styrkr',
        url: 'https://styrkr-staging.vercel.app/pricing',
      }}
    >
      <div className="px-4 py-8 overflow-hidden bg-white sm:py-12 sm:px-6 lg:px-8">
        <div className="relative max-w-xl mx-auto">
          <DotsPatternSVG width="404" height="404" className="absolute transform translate-x-1/2 left-full" />
          <DotsPatternSVG
            width="404"
            height="404"
            className="absolute bottom-0 transform -translate-x-1/2 right-full"
          />

          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{t.title}</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">{t.intro}</p>
          </div>
          <div className="mt-12">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <Input
                label="Voornaam"
                id="first_name"
                autoComplete="given-name"
                required
                value={state.firstName}
                onChange={(value) => dispatch({ type: 'firstName', value })}
              />
              <Input
                label="Achternaam"
                id="last_name"
                required
                autoComplete="family-name"
                value={state.lastName}
                onChange={(value) => dispatch({ type: 'lastName', value })}
              />
              <Input
                className="sm:col-span-2"
                label="Email"
                id="email"
                required
                type="email"
                autoComplete="email"
                value={state.email}
                onChange={(value) => dispatch({ type: 'email', value })}
              />

              <div className="sm:col-span-2">
                <TermsAndConditions
                  policiesAccepted={state.policiesAccepted}
                  onClick={() => dispatch({ type: 'policiesAccepted', value: !state.policiesAccepted })}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={!state.policiesAccepted}
                >
                  {state.status === 'IDLE' && `${t.cta.cta}`}
                  {state.status === 'PENDING' && `${t.cta.ctaPending}`}
                  {state.status === 'SUCCESS' && `${t.cta.ctaSuccess}`}
                  {state.status === 'FAILED' && `${t.cta.ctaFailed}`}
                </button>
              </div>
              {state.hasErrored && (
                <div className="text-center text-yellow-500 sm:col-span-2">
                  <span>{t.cta.ctaFailedInfo}</span>
                  <br />
                  <span>{t.emailTemplate.replyTo}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

function usePricingForm(t: IPricingPage) {
  const handleSubmit = useCallback(
    (state: FormState) => {
      return submitEmail({
        subject: t.emailTemplate.subject,
        body: t.emailTemplate.body,
        replyTo: t.emailTemplate.replyTo,
        replyToName: t.emailTemplate.replyToName,
        to: state.email,
        toName: `${state.firstName} ${state.lastName}`,
        sender: t.emailTemplate.sender,
        senderName: t.emailTemplate.senderName,
        // https://www.sanity.io/docs/file-type#56c56d68424b
        //TODO check if "?dl=" has to be appended
        attachmentUrl: t.emailTemplate.attachmentUrl,
      });
    },
    [t],
  );

  return useEmailForm(handleSubmit);
}
