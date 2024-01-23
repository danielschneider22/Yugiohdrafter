import type { NextPage } from 'next'
import Layout from '../components/Layout/layout'
import ForgotPassword from '../components/LoginPage/ForgotPassword'

const ForgotPasswordPage: NextPage = () => {
  return (
    <Layout title={"Forgot Password: Yugioh Drafter Login"}>
      <ForgotPassword />
    </Layout>
  )
}

export default ForgotPasswordPage
