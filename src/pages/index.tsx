import Head from 'next/head'
import 'twin.macro'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js, TypeScript, Tailwind, Jest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 tw="text-3xl text-pink-500" css={{ backgroundColor: 'teal' }}>
        Welcome to Your App blabla
      </h1>
    </div>
  )
}
