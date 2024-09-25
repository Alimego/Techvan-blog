import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postData from '../data/postData'
import Layout from '../layouts/Layout';
import { slugify } from '../hooks/slugify';

const Category = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const categoryData = postData.filter((item) => slugify(item?.category) === slug);

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
        <div className="pt-16 md:pt-24 px-6 md:px-20 pb-6">
            <div className="lg:grid lg:grid-cols-2 md:gap-10">
                {categoryData.map((data)=>(
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
                    <div className="w-[40%] flex items-center" onClick={()=> handlePostClick(data?.title)}>
                        <img src={data?.image} alt={data?.title} className='w-full h-[100px] md:h-[180px] rounded-md cursor-pointer'/>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Category
