import type { NextPage } from 'next' 
import DraftComplete from '../components/DraftComplete/DraftComplete'
import Layout from '../components/Layout/layout'

const DraftCompletePage: NextPage = () => {
  return (
    <Layout title={"Yugioh Draft: Draft Complete"}>
      <DraftComplete />
    </Layout>
  )
}

export default DraftCompletePage
