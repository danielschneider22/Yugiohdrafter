import type { NextPage } from 'next'
import LandingPage from '../components/BoosterPicker/LandingPage'
import Layout from '../components/Layout/layout'

const Home: NextPage = () => {
  return (
    <Layout title={"YugiohDrafter - Yugioh Draft Simulator with Bots and Friends"}>
      <LandingPage />
    </Layout>
  )
}

export default Home
