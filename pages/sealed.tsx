import type { NextPage } from 'next' 
import Layout from '../components/Layout/layout'
import SealedBoosterOpener from '../components/SealedBoosterOpener/SealedBoosterOpener'

const SealedPage: NextPage = () => {
  return (
    <Layout title={"Yugioh Draft Sealed"}>
      <SealedBoosterOpener />
    </Layout>
  )
}

export default SealedPage
