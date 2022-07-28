import type { NextPage } from 'next' 
import Draft from '../components/Draft/Draft'
import Layout from '../components/Layout/layout'

const DraftPage: NextPage = () => {
  return (
    <Layout title={"YugiohDrafter - Active Draft Simulation"}>
      <Draft />
    </Layout>
  )
}

export default DraftPage
