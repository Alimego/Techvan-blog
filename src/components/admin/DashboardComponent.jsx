import { Link } from "react-router-dom"
import TableOfPosts from "./TableOfPosts"
import postData from "../../data/postData"

const DashboardComponent = () => {
  const uniqueWriters = [...new Set(postData.map(post => post.writer))];

  return (
    <div className="bg-[#f7f7f7] p-6 w-full no-scrollbar overflow-scroll">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Overview</p>
        <Link to='/admin-dashboard/create'>
          <button className="text-xl font-medium bg-primary p-4 text-white rounded-lg">+ Create Post</button>
        </Link>
      </div>
      <div className="flex items-center justify-between py-8">
        <div className='flex flex-col gap-2 items-center justify-center w-56 h-40 bg-white shadow-md rounded-md'>
          <p className="text-green-600 font-bold text-5xl font-[Poppins]">{postData.length}</p>
          <p className="text-xl text-gray-700">Posts</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-56 h-40 bg-white shadow-md rounded-md'>
          {console.log(postData.id)}
          <p className="text-yellow-600 font-bold text-5xl font-[Poppins]">{uniqueWriters.length}</p>
          <p className="text-xl text-gray-700">Writers</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-56 h-40 bg-white shadow-md rounded-md'>
          <p className="text-purple-600 font-bold text-5xl font-[Poppins]">20</p>
          <p className="text-xl text-gray-700">Visitors</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-56 h-40 bg-white shadow-md rounded-md'>
          <p className="text-red-600 font-bold text-5xl font-[Poppins]">10</p>
          <p className="text-xl text-gray-700">Email Subscribers</p>
        </div>
      </div>

      <div className="my-8 bg-white">
        <p className="text-2xl font-semibold py-3 px-4 border-b-2">Recent Posts</p>
        <TableOfPosts />
      </div>
    </div>
  )
}

export default DashboardComponent
