import type { NextPage } from 'next'
import LandingPage from '../components/BoosterPicker/LandingPage'
import Layout from '../components/Layout/layout'

export let ip = ""

export function setIP(newIP: string){
  ip = newIP
}

const Home: NextPage = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  )
}

export default Home
