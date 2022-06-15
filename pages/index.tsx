import type { NextPage } from 'next'
import LandingPage from '../components/BoosterPicker/LandingPage'
import Layout from '../components/Layout/layout'

const Home: NextPage = () => {
  return (
    <Layout title={"Yugioh Draft Landing Page"}>
      <LandingPage />
    </Layout>
  )
}

export default Home
