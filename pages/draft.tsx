import type { NextPage } from 'next' 
import Draft from '../components/Draft/Draft'
import Layout from '../components/Layout/layout'

const DraftPage: NextPage = () => {
  return (
    <Layout title={"Yugioh Draft: Active Draft"}>
      <Draft />
    </Layout>
  )
}

export default DraftPage
