import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminSideNav = ({ isSideNavOpen, toggleSideNav }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname); 

  useEffect(()=> {
    setActiveItem(location.pathname)
  }, [location.pathname])

  return (
    <div className={`${isSideNavOpen ? 'flex' : 'hidden'} absolute z-20 md:relative top-[10vh] md:top-0 bottom-0 w-[60%] md:w-[25%] flex-col gap-6 bg-[#12143d] text-white text-xl py-10 shadow-md no-scrollbar overflow-auto`}>
        <Link to={'/admin-dashboard'}>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === '/admin-dashboard' ? 'bg-[#aaaef05d]' : ''}`}>
            Dashboard
          </div>
        </Link>
      
        <Link to={'/admin-dashboard/create'}>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === '/admin-dashboard/create' ? 'bg-[#aaaef05d]' : ''}`}>
            Create Post
          </div>
        </Link>
      
        <Link>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === 'pending' ? 'bg-[#aaaef05d]' : ''}`}>
            Pending Post
          </div>
        </Link>
      
        <Link>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === 'approved' ? 'bg-[#aaaef05d]' : ''}`}>
            Approved Post
          </div>
        </Link>
      
        <Link to={'/admin-dashboard/posts'}>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === '/admin-dashboard/posts' ? 'bg-[#aaaef05d]' : ''}`}>
            Posts
          </div>
        </Link>
      
        <Link>
          <div className={`hover:bg-[#aaaef02d] px-10 py-2 ${activeItem === 'writers' ? 'bg-[#aaaef05d]' : ''}`}>
            Writers
          </div>
        </Link>
    <p className={`${isSideNavOpen ? 'flex' : 'hidden'} absolute left-[85%] top-[-2%] block md:hidden py-4 text-white text-3xl rounded-full border-none cursor-pointer`} onClick={toggleSideNav}>x</p>
    </div>
  );
}

export default AdminSideNav;
