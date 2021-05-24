import { Transition } from '@headlessui/react';
import { DetailedHTMLProps, AnchorHTMLAttributes, useState } from 'react';
import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { INavbar } from '@/lib/sanity/resources/navbar.resource';

interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

function NavLink({ children, href, ...props }: AnchorProps & { href: string }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a className={clsx('font-medium text-white hover:text-gray-300', isActive && 'text-gray-300')} {...props}>
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
        className={clsx(
          'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50',
          isActive && 'text-gray-900',
        )}
        role="menuitem"
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}

function Nav({ navbar }: { navbar: INavbar }) {
  return (
    // <div className="hidden md:flex md:ml-10 md:pr-4 md:space-x-8">
    <div className="hidden space-x-10 md:flex md:ml-10">
      {navbar.links.map((navItem) => (
        <NavLink key={navItem.label} href={navItem.url}>
          {navItem.label}
        </NavLink>
      ))}
    </div>
  );
}

function MobileNav({ navbar }: { navbar: INavbar }) {
  return (
    <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
      <div className="px-2 pt-2 pb-3 space-y-1" role="none">
        {navbar.links.map((navItem) => (
          <MobileNavLink key={navItem.label} href={navItem.url}>
            {navItem.label}
          </MobileNavLink>
        ))}
      </div>
    </div>
  );
}

export function Navbar({ preview, navbar }: { preview?: boolean; navbar: INavbar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {preview && (
        <a
          className="fixed z-50 p-2 bg-yellow-300 rounded-md bottom-2 right-2 hover:bg-yellow-500"
          href="/api/preview-disable"
        >
          Disable Preview
        </a>
      )}

      <div className="bg-gray-900">
        <div className={clsx('relative px-4 py-2 sm:px-6 lg:px-8 mx-auto max-w-7xl')}>
          {/* <nav className="relative flex items-center justify-between lg:justify-start" aria-label="Global"> */}
          <nav
            className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                {/* <div className="relative w-8 h-8 sm:h-10 sm:w-10"> */}
                <Image
                  src={navbar.icon.url}
                  alt={navbar.icon.alt}
                  layout="fixed"
                  width="192px"
                  height="108px"
                  priority
                />
                <div className="flex items-center -mr-2 md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
                    id="main-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open menu</span>
                    {/* <!-- Heroicon name: menu --> */}
                    <svg
                      className="w-6 h-6"
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
              <Nav navbar={navbar} />
            </div>
          </nav>
        </div>
        <Transition
          show={isMenuOpen}
          className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
          enter="transition duration-150 ease-out transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-100 ease-in transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="font-bold">STYRKR</span>
              <div className="-mr-2">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Sluit menu</span>
                  {/* <!-- Heroicon name: x --> */}
                  <svg
                    className="w-6 h-6"
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
            <MobileNav navbar={navbar} />
          </div>
        </Transition>
      </div>
    </>
  );
}
