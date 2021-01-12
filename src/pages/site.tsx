import 'twin.macro';

export default function Site() {
  return (
    <>
      <div tw="relative bg-white overflow-hidden">
        <div tw="max-w-7xl mx-auto">
          <div tw="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              tw="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div tw="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav tw="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div tw="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div tw="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                      <span tw="sr-only">Workflow</span>
                      <img
                        tw="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      />
                    </a>
                    <div tw="-mr-2 flex items-center md:hidden">
                      <button
                        type="button"
                        tw="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div tw="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">
                    Product
                  </a>

                  <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">
                    Features
                  </a>

                  <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">
                    Marketplace
                  </a>

                  <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">
                    Company
                  </a>

                  <a href="#" tw="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                  </a>
                </div>
              </nav>
            </div>

            {/* <!--
            Mobile menu, show/hide based on menu open state.

            Entering: "duration-150 ease-out"
              From: "opacity-0 scale-95"
              To: "opacity-100 scale-100"
            Leaving: "duration-100 ease-in"
              From: "opacity-100 scale-100"
              To: "opacity-0 scale-95"
          --> */}
            <div tw="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div tw="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div tw="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img tw="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                  </div>
                  <div tw="-mr-2">
                    <button
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
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                  <div tw="px-2 pt-2 pb-3 space-y-1" role="none">
                    <a
                      href="#"
                      tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      role="menuitem"
                    >
                      Product
                    </a>

                    <a
                      href="#"
                      tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      role="menuitem"
                    >
                      Features
                    </a>

                    <a
                      href="#"
                      tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      role="menuitem"
                    >
                      Marketplace
                    </a>

                    <a
                      href="#"
                      tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      role="menuitem"
                    >
                      Company
                    </a>
                  </div>
                  <div role="none">
                    <a
                      href="#"
                      tw="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <main tw="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div tw="sm:text-center lg:text-left">
                <h1 tw="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span tw="block xl:inline">Data to enrich your</span>
                  <span tw="block text-indigo-600 xl:inline">online business</span>
                </h1>
                <p tw="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
                <div tw="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div tw="rounded-md shadow">
                    <a
                      href="#"
                      tw="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div tw="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      tw="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div tw="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            tw="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </div>
      <FeatureList />
      <Content />
    </>
  );
}

function FeatureList() {
  return (
    <div tw="py-12 bg-white">
      <div tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div tw="lg:text-center">
          <h2 tw="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
          <p tw="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to send money
          </p>
          <p tw="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
        </div>

        <div tw="mt-10">
          <dl tw="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div tw="flex">
              <div tw="flex-shrink-0">
                <div tw="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* <!-- Heroicon name: globe-alt --> */}
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <div tw="ml-4">
                <dt tw="text-lg leading-6 font-medium text-gray-900">Competitive exchange rates</dt>
                <dd tw="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>

            <div tw="flex">
              <div tw="flex-shrink-0">
                <div tw="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* <!-- Heroicon name: scale --> */}
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <div tw="ml-4">
                <dt tw="text-lg leading-6 font-medium text-gray-900">No hidden fees</dt>
                <dd tw="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>

            <div tw="flex">
              <div tw="flex-shrink-0">
                <div tw="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* <!-- Heroicon name: lightning-bolt --> */}
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div tw="ml-4">
                <dt tw="text-lg leading-6 font-medium text-gray-900">Transfers are instant</dt>
                <dd tw="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>

            <div tw="flex">
              <div tw="flex-shrink-0">
                <div tw="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* <!-- Heroicon name: annotation --> */}
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>
              <div tw="ml-4">
                <dt tw="text-lg leading-6 font-medium text-gray-900">Mobile notifications</dt>
                <dd tw="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div tw="py-16 bg-gray-50 overflow-hidden">
      <div tw="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        <div tw="text-base max-w-prose mx-auto lg:max-w-none">
          <h2 tw="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
          <p tw="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What makes us different
          </p>
        </div>
        <div tw="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
          <p tw="text-lg text-gray-500">
            Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
            pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor
            vitae ut. Amet vitae fames senectus vitae.
          </p>
        </div>
        <div tw="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div tw="relative z-10">
            <div tw="prose prose-indigo text-gray-500 mx-auto lg:max-w-none">
              <p>
                Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget
                pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.
              </p>
              <ul>
                <li>Quis elit egestas venenatis mattis dignissim.</li>
                <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
                <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
              </ul>
              <p>
                Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
              </p>
              <h3>We’re here to help</h3>
              <p>
                Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa,
                lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea auctor mi.
              </p>
            </div>
            <div tw="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
              <div tw="rounded-md shadow">
                <a
                  href="#"
                  tw="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Contact sales
                </a>
              </div>
              <div tw="rounded-md shadow ml-4">
                <a
                  href="#"
                  tw="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div tw="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
            <svg
              tw="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" tw="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)" />
            </svg>
            <blockquote tw="relative bg-white rounded-lg shadow-lg">
              <div tw="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                <img
                  src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
                  alt="Workcation"
                  tw="h-8"
                />
                <div tw="relative text-lg text-gray-700 font-medium mt-8">
                  <svg
                    tw="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p tw="relative">
                    Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                    Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin
                    massa, lectus.
                  </p>
                </div>
              </div>
              <cite tw="relative flex items-center sm:items-start bg-indigo-600 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
                <div tw="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
                  <img
                    tw="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
                    alt=""
                  />
                </div>
                <span tw="relative ml-4 text-indigo-300 font-semibold leading-6 sm:ml-24 sm:pl-1">
                  <p tw="text-white font-semibold sm:inline">Judith Black</p>
                  <p tw="sm:inline">CEO at Workcation</p>
                </span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
