import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { slugify } from '../../hooks/slugify';
import { setPost } from '../../store/reducers/post_reducer';
import { formatDateToLongString } from "../../hooks/dateFormatters";
import { shortenTitle } from "../../hooks/ReduceTitle";

const SectionOne = () => {
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

  const featuredPost = posts?.filter((item) => item.featured === true);

  const handlePostClick = (title) => {
    const slug = slugify(title);
    navigate(`/${slug}`);
  };

  const handleCategoryClick = (category) => {
    const slug = slugify(category);
    navigate(`/category/${slug}`);
  };

  return (
    <div className='flex flex-col gap-10'>
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex animate-pulse">
              <div className="w-full flex flex-col gap-3">
                <div className="h-6 bg-gray-300 rounded-md w-1/4"></div> {/* Category Skeleton */}
                <div className="h-8 bg-gray-300 rounded-md w-3/4"></div> {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div> {/* Writer & Date Skeleton */}
                <div className="w-full h-[220px] md:h-[350px] bg-gray-300 rounded-md"></div> {/* Image Skeleton */}
              </div>
            </div>
          ))
        : featuredPost?.map((data) => (
            <div key={data?._id} className="flex">
              <div className="w-full flex flex-col gap-3">
                <div onClick={() => handleCategoryClick(data?.category)}>
                  <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                </div>
                <div onClick={() => handlePostClick(data?.title)}>
                  <p className="text-2xl text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato] text-sm">
                  <p>{data?.writerName}</p>
                  <p>-</p>
                  <p>{formatDateToLongString(data?.date)}</p>
                </div>
                <div onClick={() => handlePostClick(data?.title)}>
                  <img
                    src={data?.image}
                    alt={data?.title}
                    className='w-full h-[220px] md:h-[350px] rounded-md cursor-pointer'
                  />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SectionOne;
