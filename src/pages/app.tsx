import dynamic from 'next/dynamic';

const Home = dynamic(() => import('components/QueryVersion'), { ssr: false });

const isSSR = typeof window === 'undefined';

export default function HomeWrapper() {
  if (isSSR) return null;
  return <Home />;
}

// TODO: add SSG when data is on server
// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
