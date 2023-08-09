import Head from 'next/head'

type Props = {
  title?: string
}

const MetaHead = ({ title }: Props) => {
  // All shared metatags will be here
  return (
    <>
      <Head>
        <title>{title || 'AMADAO Gigs Demo'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default MetaHead
