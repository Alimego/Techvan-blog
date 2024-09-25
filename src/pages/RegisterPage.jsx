import { useEffect } from "react"
import Layout from "../layouts/Layout"
import Register from "../components/auth/Register"

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
   <Layout>
    <Register />
   </Layout>
  )
}

export default RegisterPage
