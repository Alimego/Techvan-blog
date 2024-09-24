import {useNavigate} from 'react-router-dom'
import postData from "../../data/postData"
import { slugify } from "../../hooks/slugify"

const SectionTwo = () => {
  const navigate = useNavigate()

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
  }

  return (
    <div className='pt-10 md:pt-20'>
      <div className="pb-3 md:pb-8">
        <p className="text-3xl font-semibold py-2">Latest</p>
        <div className="bg-[#e4e4e4] w-full h-[1px]"></div>
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 gap-4 md:gap-10">
        {postData.map((data)=>(
          <div key={data?.id}>
            <div className="flex justify-between gap-3 w-full py-4 md:h-[200px]">
              <div className="w-[60%] flex flex-col gap-1">
                  <div onClick={()=> handleCategoryClick(data?.category)}>
                    <p className="text-[18px] text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                  </div>
                  <div onClick={()=> handlePostClick(data?.title)}>
                    <p className="text-xl text-black font-bold hover:underline cursor-pointer">{data?.title}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-[#777676] font-[Lato]">
                      <p>{data?.writer}</p>
                      <p>{data?.date}</p>
                  </div>
              </div>
              <div className="w-[40%] flex items-center"  onClick={()=> handlePostClick(data?.title)}>
                <img src={data?.image} alt="Arduino" className='w-full h-[100px] md:h-[180px] rounded-md cursor-pointer'/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className='p-2 my-4 text-xl text-primary border border-1 cursor-pointer w-1/2 hover:bg-[#e4e4e4] rounded-sm'>Read more</button>
      </div>
    </div>
  )
}

export default SectionTwo
