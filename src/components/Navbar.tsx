import { Transition } from '@headlessui/react';
import { DetailedHTMLProps, AnchorHTMLAttributes, useState } from 'react';
import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { INavbar } from '@/lib/fragments';

interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

function NavLink({ children, href, ...props }: AnchorProps & { href: string }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a className={clsx('font-medium text-gray-500 hover:text-gray-900', isActive && 'text-gray-900')} {...props}>
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
    <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
      {navbar.linksCollection.items.map((navItem) => (
        <NavLink key={navItem.sys.id} href={navItem.url}>
          {navItem.label}
        </NavLink>
      ))}
      {/* <NavLink href="/about">Over mezelf</NavLink>
      <NavLink href="/pricing">Tarieven</NavLink>
      <NavLink href="/contact">Contact</NavLink> */}
    </div>
  );
}

function MobileNav({ navbar }: { navbar: INavbar }) {
  return (
    <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
      <div className="px-2 pt-2 pb-3 space-y-1" role="none">
        {navbar.linksCollection.items.map((navItem) => (
          <MobileNavLink key={navItem.sys.id} href={navItem.url}>
            {navItem.label}
          </MobileNavLink>
        ))}
        {/* <MobileNavLink href="/">Home</MobileNavLink>
        <MobileNavLink href="/about">Over mezelf</MobileNavLink>
        <MobileNavLink href="/pricing">Tarieven</MobileNavLink>
        <MobileNavLink href="/contact">Contact</MobileNavLink> */}
      </div>
    </div>
  );
}

export function Navbar({ className, preview, navbar }: { className?: string; preview?: boolean; navbar: INavbar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {preview && (
        <a
          className="bottom-2 right-2 fixed z-50 p-2 bg-yellow-300 rounded-md hover:bg-yellow-500"
          href="/api/preview-disable"
        >
          Disable Preview
        </a>
      )}

      <div className={clsx('relative pt-6 px-4 sm:px-6 lg:px-8', className)}>
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="h-8 w-8 sm:h-10 sm:w-10 relative">
                <Image src={navbar.icon.url} alt={navbar.icon.title} layout="fill" priority />
              </div>
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  type="button"
                  className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  id="main-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open menu</span>
                  {/* <!-- Heroicon name: menu --> */}
                  <svg
                    className="h-6 w-6"
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
          <Nav navbar={navbar} />
        </nav>
      </div>
      <Transition
        show={isMenuOpen}
        enter="transition duration-150 ease-out transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <div className="h-8 w-8 relative">
                    <Image priority src={navbar.icon.url} alt={navbar.icon.title} layout="fill" />
                  </div>
                </div>
                <div className="-mr-2">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Sluit menu</span>
                    {/* <!-- Heroicon name: x --> */}
                    <svg
                      className="h-6 w-6"
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
          </div>
        )}
      </Transition>
    </>
  );
}
