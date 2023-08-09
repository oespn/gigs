import MintNFT from '../components/artist/Mint'
import Layout from '../components/common/Layout'
import MetaHead from '../components/common/Layout/MetaHead'

export default function NewQuotePage() {
  return (
    <Layout>
      <MetaHead title="AMADAO Dashboard" />
      <MintNFT />
    </Layout>
  )
}
