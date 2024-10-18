import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../layouts/Layout'
import { toTop } from '../hooks/scrollToTop'
import { slugify } from '../hooks/slugify'
import NoPage from './NoPage'
import { formatDateToLongString } from "../hooks/dateFormatters"
import { shortenTitle } from "../hooks/ReduceTitle"

const Post = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [singlePost, setSinglePost] = useState([])
  const posts = useSelector((state) => state?.posts?.posts);

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
    toTop()
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
    toTop()
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts/post/${slug}`)
        setSinglePost(response?.data?.post)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    toTop()
    fetchPosts();
  }, [slug]);

  return (
    <Layout>
      {!singlePost ? (
        <NoPage/>
        ) : (
        <div className="pt-16 md:pt-24 px-6 md:px-20 pb-6">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3">
              <div onClick={()=> handleCategoryClick(singlePost?.category)}>
                <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{singlePost?.category}</p>
              </div>
              <div onClick={()=> handlePostClick(singlePost?.title)}>
                <p className="text-2xl text-black font-bold cursor-pointer w-full lg:w-[60%]">{singlePost?.title}</p>
              </div>
              <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                <p>{singlePost?.writerName}</p>
                <p>-</p>
                <p>{formatDateToLongString(singlePost?.date)}</p>
              </div>
            </div>
            <img 
              src={singlePost?.image} 
              alt={singlePost?.title}
              className='w-full lg:w-[60%] h-[220px] md:h-[500px] rounded-md' 
              onClick={()=> handlePostClick(singlePost?.title)}
            />
            <p className='text-[#777676]'>Image Source: {singlePost?.imgSource}</p>
            <div className='py-4'>
              <p className=' leading-8 text-[17px] font-[Open Sans]' dangerouslySetInnerHTML={{ __html: singlePost?.content }} />
            </div>
            <div>
            <div className="pb-3 md:pb-8">
              <p className="text-[26px] font-semibold py-2">Must-Read Tech Articles</p>
              <div className="bg-[#e4e4e4] w-full h-[1px]"></div>
            </div>
            <div className="grid grid-col-1 lg:grid-cols-2 gap-4 md:gap-10">
              {posts?.slice(0, 6).map((data)=>(
                <div key={data?._id}>
                  <div className="flex justify-between gap-3 w-full py-4 md:h-[200px]">
                    <div className="w-[60%] flex flex-col gap-1">
                      <div onClick={()=> handleCategoryClick(data?.category)}>
                        <p className="text-[18px] text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                      </div>
                      <div onClick={()=> handlePostClick(data?.title)}>
                        <p className="text-xl text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
                      </div>
                      <div className="flex flex-col gap-1 text-[#777676] font-[Lato]">
                          <p>{data?.writerName}</p>
                          <p>{formatDateToLongString(data?.date)}</p>
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
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Post
