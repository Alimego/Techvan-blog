import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar /> 
      {children}
      <Footer />
    </div>
  )
}

export default Layout
