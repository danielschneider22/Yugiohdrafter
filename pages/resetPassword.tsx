import type { NextPage } from 'next'
import Layout from '../components/Layout/layout'
import ResetPasswordPage from '../components/ResetPasswordPage/ResetPassword'

const ResetPassword: NextPage = () => {
  return (
    <Layout title={"YugiohDrafter - Reset Password"}>
      <ResetPasswordPage />
    </Layout>
  )
}

export default ResetPassword
