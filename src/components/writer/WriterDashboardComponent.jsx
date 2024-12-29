import { Link } from "react-router-dom"
import WriterTableOfPosts from "./WriterTableOfPosts"
import { useSelector } from "react-redux"

const WriterDashboardComponent = () => {
  const writerPosts = useSelector((state) => state.posts.writerPosts);

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll h-full">
      <div className="flex items-center justify-between">
        <p className="text-[22px] md:text-2xl font-semibold">Overview</p>
        <Link to='/writer-dashboard/create'>
          <button className="md:text-xl font-medium bg-primary p-4 text-white rounded-lg">+ Create</button>
        </Link>
      </div>
      <div className="flex justify-between items-center py-8 ">
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] h-40 lg:h-60 bg-zinc-300 shadow-md rounded-md p-2'>
          <p className="text-green-600 font-bold text-5xl font-[Poppins]">{writerPosts?.length}</p>
          <p className="md:text-xl text-gray-700 text-center text-sm">Your {writerPosts?.length > 1 ? "posts" : "post"}</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] h-40 bg-white lg:h-60 shadow-md rounded-md p-2'>
          <p className="text-purple-600 font-bold text-5xl font-[Poppins]">20+</p>
          <p className="md:text-xl text-gray-700 text-center text-sm">Total website Visitors</p>
        </div>
      </div>

      <div className="my-8 bg-white">
        <p className="text-[22px] md:text-2xl font-semibold py-3 px-4 border-b-2">Recent Posts</p>
        < WriterTableOfPosts />
      </div>
    </div>
  )
}

export default WriterDashboardComponent
