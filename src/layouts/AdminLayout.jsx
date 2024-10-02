import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from '@mui/material'
import AdminHeader from "../components/common/AdminHeader"
import AdminSideNav from "../components/common/AdminSideNav"

const AdminLayout = () => {
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const [isSideNavOpen, setIsSideNavOpen] = useState(isMediumScreen ? false : true)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  return (
    <div className=''>  
        <AdminHeader toggleSideNav={toggleSideNav} /> 
        <div className="flex ">
          <AdminSideNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav}/>
          <div className="h-[90vh] w-full overflow-auto">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AdminLayout
