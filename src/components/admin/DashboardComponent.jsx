import { Link } from "react-router-dom"
import TableOfPosts from "./TableOfPosts"
import { useSelector } from "react-redux"

const DashboardComponent = () => {
  const posts = useSelector((state) => state.posts.posts);
    
  const uniqueWriters = [...new Set(posts.map(post => post.writerId))];

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll h-full">
      <div className="flex items-center justify-between">
        <p className="text-[22px] md:text-2xl font-semibold">Overview</p>
        <Link to='/admin-dashboard/create'>
          <button className="md:text-xl font-medium bg-primary p-4 text-white rounded-lg">+ Create</button>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-6 md:gap-8 flex-wrap py-8 ">
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] lg:w-1/5 h-40 bg-white shadow-md rounded-md'>
          <p className="text-green-600 font-bold text-5xl font-[Poppins]">{posts?.length}</p>
          <p className="md:text-xl text-gray-700 text-sm text-center">Total website {posts?.length > 1 ? "posts" : "post" }</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] lg:w-1/5 h-40 bg-white shadow-md rounded-md'>
          <p className="text-yellow-600 font-bold text-5xl font-[Poppins]">{uniqueWriters.length}</p>
          <p className="md:text-xl text-gray-700 text-sm text-center">Writers</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] lg:w-1/5 h-40 bg-white shadow-md rounded-md'>
          <p className="text-purple-600 font-bold text-5xl font-[Poppins]">20</p>
          <p className="md:text-xl text-gray-700 text-sm text-center">Total website visitors</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] lg:w-1/5 h-40 bg-white shadow-md rounded-md'>
          <p className="text-red-600 font-bold text-5xl font-[Poppins]">10</p>
          <p className="md:text-xl text-gray-700 text-sm text-center">Email <br/>Subscribers</p>
        </div>
      </div>

      <div className="my-8 bg-white">
        <p className="text-[22px] md:text-2xl font-semibold py-3 px-4 border-b-2">Recent Posts</p>
        <TableOfPosts />
      </div>
    </div>
  )
}

export default DashboardComponent
