import type { NextPage } from 'next'
import DraftPicker from '../components/BoosterPicker/DraftPicker'
import Layout from '../components/Layout/layout'

const Home: NextPage = () => {
  return (
    <Layout title={"Yugioh Draft Picker"}>
      <DraftPicker />
    </Layout>
  )
}

export default Home
