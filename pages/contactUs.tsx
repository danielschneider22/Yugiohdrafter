import type { NextPage } from 'next'
import ContactUs from '../components/ContactUs/ContactUs'
import Layout from '../components/Layout/layout'

const ContactUsPage: NextPage = () => {
  return (
    <Layout title={"Contact Us - Yugioh Draft"}>
      <ContactUs />
    </Layout>
  )
}

export default ContactUsPage
