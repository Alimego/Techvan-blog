import { useEffect } from "react"
import Layout from "../layouts/Layout"
import Login from "../components/auth/Login"

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
   <Layout>
    <Login />
   </Layout>
  )
}

export default LoginPage
