import Head from 'next/head'

export default function HeadInfo() {
  return (
    <Head>
      <title>Meta Space</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <meta name="description" content="Empowering creator with passion economy." />
      <meta name="keywords" content="Blockchain, Meta Space, Matataki" />
      <meta name="author" content="Meta Space" />

      <meta property="og:title" content="Meta Space — Empowering creator with passion economy." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/android-chrome-512x512.png" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_META_SPACE_URL} />
      <meta property="og:description" content="Empowering creator with passion economy." />
      <meta property="og:site_name" content="Meta Space" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Meta Space — Empowering creator with passion economy." />
      <meta name="twitter:description" content="Empowering creator with passion economy." />
      <meta name="twitter:image" content="/apple-touch-icon.png" />

    </Head>
  )
}