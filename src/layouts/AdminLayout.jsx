import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material'
import AdminHeader from "../components/common/AdminHeader"
import AdminSideNav from "../components/common/AdminSideNav"
import scrollToTop from "../hooks/scrollToTop";

const AdminLayout = () => {
  const location = useLocation()
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const [isSideNavOpen, setIsSideNavOpen] = useState(isMediumScreen ? false : true)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  useEffect(() => {
    scrollToTop(document.querySelector('.outlet-container')); // Target the outlet container
  }, [location]);

  return (
    <div className=''>  
        <AdminHeader toggleSideNav={toggleSideNav} /> 
        <div className="flex ">
          <AdminSideNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav}/>
          <div className="h-[90vh] w-full overflow-auto outlet-container">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AdminLayout
