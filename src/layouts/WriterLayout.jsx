import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material'
import WriterHeader from "../components/common/WriterHeader"
import WriterSideNav from "../components/common/WriterSideNav"
import { scrollToPosition } from "../hooks/scrollToTop";

const WriterLayout = () => {
  const location = useLocation()
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const [isSideNavOpen, setIsSideNavOpen] = useState(isMediumScreen ? false : true)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  useEffect(() => {
    scrollToPosition(document.querySelector('.outlet-container')); // Target the outlet container
  }, [location]);

  return (
    <div className=''>  
        <WriterHeader toggleSideNav={toggleSideNav} /> 
        <div className="flex ">
          <WriterSideNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav}/>
          <div className="h-[90vh] w-full overflow-auto outlet-container">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default WriterLayout
