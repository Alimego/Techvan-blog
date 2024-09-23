import { useNavigate } from 'react-router-dom'
import postData from '../../data/postData'
import { slugify } from '../../hooks/slugify'

const SectionOne = () => {
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
    <div className='flex flex-col gap-10'>
      {featuredPostData.map((data)=>(
        <div key={data?.id} className="flex">
          <div  className="w-full flex flex-col gap-3">
            <div onClick={()=> handleCategoryClick(data?.category)}>
              <p className="text-xl text-primary font-semibold cursor-pointer">{data?.category}</p>
            </div>
            <div onClick={()=> handlePostClick(data?.title)}>
              <p className="text-2xl text-black font-bold hover:underline cursor-pointer">{data?.title}</p>
            </div>
            <div className="flex items-center gap-2 text-[#777676]">
              <p>{data?.writer}</p>
              <p>-</p>
              <p>{data?.date}</p>
            </div>
            <div onClick={()=> handlePostClick(data?.title)}>
              <img src={data?.image} alt="Arduino" className='w-full h-[220px] md:h-[350px] rounded-md cursor-pointer'/>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SectionOne
