import type { NextPage } from 'next'
import Layout from '../components/Layout/layout'
import LoginPage from '../components/LoginPage/Login'

const Login: NextPage = () => {
  return (
    <Layout title={"YugiohDrafter - Login"}>
      <LoginPage />
    </Layout>
  )
}

export default Login
