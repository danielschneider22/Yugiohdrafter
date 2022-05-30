import type { NextPage } from 'next'
import Layout from '../components/Layout/layout'
import LoginPage from '../components/LoginPage/Login'

const Login: NextPage = () => {
  return (
    <Layout>
      <LoginPage />
    </Layout>
  )
}

export default Login
