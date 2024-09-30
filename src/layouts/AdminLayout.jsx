import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader"
import AdminSideNav from "../components/common/AdminSideNav"

const AdminLayout = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  return (
    <div className=''>  
        <AdminHeader toggleSideNav={toggleSideNav} /> 
        <div className="flex ">
          <AdminSideNav isSideNavOpen={isSideNavOpen} />
          <div className="h-[90vh] w-full overflow-auto">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AdminLayout
