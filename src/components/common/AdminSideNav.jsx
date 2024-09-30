import { Link } from "react-router-dom"


const AdminSideNav = ({isSideNavOpen}) => {
  return (
    <div className={`${isSideNavOpen ? 'flex' : 'hidden'} w-[25%] flex-col gap-6 bg-[#12143d] text-white text-xl py-10 shadow-md no-scrollbar overflow-auto`}>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link to={'/admin-dashboard'}>Dashboard</Link>  
        </div>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link to={'/admin-dashboard/create'}>Create Post</Link>  
        </div>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link>Pending Post</Link>  
        </div>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link>Approved Post</Link>  
        </div>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link to={'/admin-dashboard/posts'}>Posts</Link>  
        </div>
        <div className="hover:bg-[#aaaef02d] px-10 py-2">
          <Link>Writers</Link>  
        </div>
    </div>
  )
}

export default AdminSideNav
