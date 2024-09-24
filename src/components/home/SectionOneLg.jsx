import {useNavigate} from 'react-router-dom'
import postData from '../../data/postData'
import { slugify } from '../../hooks/slugify'

const SectionOneLg = () => {
  const navigate = useNavigate()
  const featuredPostData = postData.filter((item) => item.featured === true);

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
  }
  
  return (
    <div className='w-full flex flex-row gap-8 h-[80vh]'>
      <div className='w-[60%] h-[80vh]'>
        {featuredPostData.slice(0, 1).map((data)=>(
          <div key={data?.id} className="w-full h-full flex flex-col justify-between gap-3">
            <div className="w-full flex flex-col gap-3 h-[35vh]">
              <div onClick={()=> handleCategoryClick(data?.category)}>
                <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
              </div>
              <div onClick={()=> handlePostClick(data?.title)}>
                <p className="text-2xl text-black font-bold hover:underline cursor-pointer">{data?.title}</p>
              </div>
              <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                <p>{data?.writer}</p>
                <p>-</p>
                <p>{data?.date}</p>
              </div>
            </div>
            <div onClick={()=> handlePostClick(data?.title)}>
              <img src={data?.image} alt="Arduino" className='w-full h-[50vh] rounded-md cursor-pointer'/>
            </div>
          </div>
        ))}
      </div>
      <div className='w-[40%] flex flex-col gap-6 justify-between'>
        {featuredPostData.slice(1).map((data)=>(
          <div key={data?.id} className="h-[20vh] flex gap-4">
            <div className='w-[50%] h-fit'>
              <div onClick={()=> handleCategoryClick(data?.category)}>
                <p className="text-sm text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
              </div>
              <div onClick={()=> handlePostClick(data?.title)}>
                <p className="text-[18px] text-black font-bold hover:underline cursor-pointer">{data?.title}</p>
              </div>
              <div className="flex items-center gap-2 text-[#777676] text-sm font-[Lato]">
                <p>{data?.writer}</p>
                <p>-</p>
                <p>{data?.date}</p>
              </div>
            </div>
            <div className='w-[50%]'>
              <div onClick={()=> handlePostClick(data?.title)}>
                <img src={data?.image} alt="Arduino" className='w-full h-[20vh] rounded-md cursor-pointer'/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SectionOneLg
