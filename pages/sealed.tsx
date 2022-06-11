import type { NextPage } from 'next' 
import Layout from '../components/Layout/layout'
import SealedBoosterOpener from '../components/SealedBoosterOpener/SealedBoosterOpener'

const DraftPage: NextPage = () => {
  return (
    <Layout>
      <SealedBoosterOpener />
    </Layout>
  )
}

export default DraftPage
