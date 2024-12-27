import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { slugify } from '../../hooks/slugify';
import { setPost } from '../../store/reducers/post_reducer';
import { formatDateToLongString } from "../../hooks/dateFormatters";
import { shortenTitle } from "../../hooks/ReduceTitle";

const SectionOneLg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts?.posts);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API and update the Redux store
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        dispatch(setPost(response?.data?.posts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const featuredPost = posts?.filter((item) => item?.featured === true);

  const handlePostClick = (title) => {
    const slug = slugify(title);
    navigate(`/${slug}`);
  };

  const handleCategoryClick = (category) => {
    const slug = slugify(category);
    navigate(`/category/${slug}`);
  };

  return (
    <div className='w-full flex flex-row gap-8 h-[80vh]'>
      <div className='w-[60%] h-[80vh]'>
        {loading
          ? (
            <div className="w-full h-full flex flex-col justify-between gap-3 animate-pulse">
              <div className="w-full flex flex-col gap-3 h-[35vh]">
                <div className="h-6 bg-gray-300 rounded-md w-1/4"></div> {/* Category Skeleton */}
                <div className="h-8 bg-gray-300 rounded-md w-3/4"></div> {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div> {/* Writer & Date Skeleton */}
              </div>
              <div className="w-full h-[50vh] bg-gray-300 rounded-md"></div> {/* Image Skeleton */}
            </div>
          )
          : featuredPost?.slice(0, 1).map((data) => (
            <div key={data?._id} className="w-full h-full flex flex-col justify-between gap-3">
              <div className="w-full flex flex-col gap-3 h-[35vh]">
                <div onClick={() => handleCategoryClick(data?.category)}>
                  <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                </div>
                <div onClick={() => handlePostClick(data?.title)}>
                  <p className="text-2xl text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                  <p>{data?.writerName}</p>
                  <p>-</p>
                  <p>{formatDateToLongString(data?.date)}</p>
                </div>
              </div>
              <div onClick={() => handlePostClick(data?.title)}>
                <img src={data?.image} alt={data?.title} className='w-full h-[50vh] rounded-md cursor-pointer' />
              </div>
            </div>
          ))}
      </div>

      <div className='w-[40%] flex flex-col gap-6 justify-between'>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[20vh] flex gap-4 animate-pulse">
              <div className='w-[50%]'>
                <div className="h-4 bg-gray-300 rounded-md w-1/4 mb-2"></div> {/* Category Skeleton */}
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div> {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div> {/* Writer & Date Skeleton */}
              </div>
              <div className='w-[50%]'>
                <div className="w-full h-full bg-gray-300 rounded-md"></div> {/* Image Skeleton */}
              </div>
            </div>
          ))
          : featuredPost?.slice(1).map((data) => (
            <div key={data?._id} className="h-[20vh] flex gap-4">
              <div className='flex flex-col gap-2 w-[50%] h-fit'>
                <div onClick={() => handleCategoryClick(data?.category)}>
                  <p className="text-sm text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                </div>
                <div onClick={() => handlePostClick(data?.title)}>
                  <p className="text-[18px] text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] text-[11px] font-[Lato]">
                  <p>{data?.writerName}</p>
                  <p>-</p>
                  <p>{formatDateToLongString(data?.date)}</p>
                </div>
              </div>
              <div className='w-[50%]'>
                <div onClick={() => handlePostClick(data?.title)}>
                  <img src={data?.image} alt={data?.title} className='w-full h-[20vh] rounded-md cursor-pointer' />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionOneLg;
