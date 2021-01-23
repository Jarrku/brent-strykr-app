import { Transition } from '@headlessui/react';
import { DetailedHTMLProps, AnchorHTMLAttributes, useState } from 'react';

import tw from 'twin.macro';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ClassNames } from '@emotion/react';

function BusinessIcon() {
  return (
    <img
      tw="h-8 w-auto sm:h-10"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="company-logo"
      width={43.75}
      height={40}
    />
  );
}

interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

function NavLink({ children, href, ...props }: AnchorProps & { href: string }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a css={[tw`font-medium text-gray-500 hover:text-gray-900`, isActive && tw`text-gray-900`]} {...props}>
        {children}
      </a>
    </Link>
  );
}

function MobileNavLink({ children, href, ...props }: AnchorProps & { href: string }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a
        css={[
          tw`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50`,
          isActive && tw`text-gray-900`,
        ]}
        role="menuitem"
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}

function Nav() {
  return (
    <div tw="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">Over mezelf</NavLink>
      <NavLink href="/pricing">Tarieven</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </div>
  );
}

function MobileNav() {
  return (
    <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
      <div tw="px-2 pt-2 pb-3 space-y-1" role="none">
        <MobileNavLink href="/">Home</MobileNavLink>
        <MobileNavLink href="/about">Over mezelf</MobileNavLink>
        <MobileNavLink href="/pricing">Tarieven</MobileNavLink>
        <MobileNavLink href="/contact">Contact</MobileNavLink>
      </div>
    </div>
  );
}

export function Navbar({ className, preview }: { className?: string; preview?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {preview && (
        <a
          tw="bottom-2 right-2 fixed z-50 p-2 bg-yellow-300 rounded-md hover:bg-yellow-500"
          href="/api/preview-disable"
        >
          Disable Preview
        </a>
      )}

      <div className={className} tw="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav tw="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div tw="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div tw="flex items-center justify-between w-full md:w-auto">
              <BusinessIcon />
              <div tw="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  type="button"
                  tw="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  id="main-menu"
                  aria-haspopup="true"
                >
                  <span tw="sr-only">Open main menu</span>
                  {/* <!-- Heroicon name: menu --> */}
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <Nav />
        </nav>
      </div>
      <ClassNames>
        {({ css }) => (
          <Transition
            show={isMenuOpen}
            enter={css`
              ${tw`transition duration-150 ease-out transform`}
            `}
            enterFrom={css`
              ${tw`opacity-0 scale-95`}
            `}
            enterTo={css`
              ${tw`opacity-100 scale-100`}
            `}
            leave={css`
              ${tw`transition duration-100 ease-in transform`}
            `}
            leaveFrom={css`
              ${tw`opacity-100 scale-100`}
            `}
            leaveTo={css`
              ${tw`opacity-0 scale-95`}
            `}
          >
            {(ref) => (
              <div ref={ref} tw="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div tw="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div tw="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img tw="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    </div>
                    <div tw="-mr-2">
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        type="button"
                        tw="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span tw="sr-only">Close main menu</span>
                        {/* <!-- Heroicon name: x --> */}
                        <svg
                          tw="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <MobileNav />
                </div>
              </div>
            )}
          </Transition>
        )}
      </ClassNames>
    </>
  );
}
