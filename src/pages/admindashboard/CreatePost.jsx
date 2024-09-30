import { useEffect } from "react"

const CreatePost = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#f7f7f7] p-6 w-full no-scrollbar overflow-scroll">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Create Post</p>
      <form className="w-full md:w-[90%] flex flex-col gap-6">
        <input 
          type="text"
          placeholder="Writer's Name*"
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <input 
          type="date"
          placeholder='Date*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <input 
          type="file"
          placeholder='title*' 
          required 
          className=''
        />
        <div>
          <input 
            type="text"
            placeholder='Category*' 
            required 
            className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
            />
          </div>
        <input 
          type="text"
          placeholder='title*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <input 
          type="text"
          placeholder='image source (where you got the image)*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <textarea
          placeholder='Content*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300  rounded-lg'
        />
        <button className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg w-[20%]">Create</button>
        <p></p>
      </form>
    </div>
  )
}

export default CreatePost
