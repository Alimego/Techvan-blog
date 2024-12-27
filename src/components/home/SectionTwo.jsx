import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { slugify } from '../../hooks/slugify';
import { setPost } from '../../store/reducers/post_reducer';
import { formatDateToLongString } from "../../hooks/dateFormatters";
import { shortenTitle } from "../../hooks/ReduceTitle";

const SectionTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts?.posts);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

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

  // Define how many posts to show initially
  const initialPostCount = 10;

  // Function to toggle between "Read more" and "See less"
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handlePostClick = (title) => {
    const slug = slugify(title);
    navigate(`/${slug}`);
  };

  const handleCategoryClick = (category) => {
    const slug = slugify(category);
    navigate(`/category/${slug}`);
  };

  return (
    <div className='pt-10 md:pt-20'>
      <div className="pb-3 md:pb-8">
        <p className="text-3xl font-semibold py-2">Latest</p>
        <div className="bg-[#e4e4e4] w-full h-[1px]"></div>
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 gap-4 md:gap-10">
        {loading
          ? Array.from({ length: initialPostCount }).map((_, index) => (
            <div key={index} className="flex justify-between gap-3 w-full py-4 md:h-[200px] animate-pulse">
              <div className="w-[60%] flex flex-col gap-1">
                <div className="h-4 bg-gray-300 rounded-md w-1/3 mb-2"></div> {/* Category Skeleton */}
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div> {/* Title Skeleton */}
                <div className="flex flex-col gap-1">
                  <div className="h-4 bg-gray-300 rounded-md w-1/4"></div> {/* Writer Name Skeleton */}
                  <div className="h-4 bg-gray-300 rounded-md w-1/3"></div> {/* Date Skeleton */}
                </div>
              </div>
              <div className="w-[40%] flex items-center">
                <div className="w-full h-[100px] md:h-[180px] bg-gray-300 rounded-md"></div> {/* Image Skeleton */}
              </div>
            </div>
          ))
          : posts?.slice(0, showMore ? posts.length : initialPostCount).map((data) => (
            <div key={data?._id}>
              <div className="flex justify-between gap-3 w-full py-4 md:h-[200px]">
                <div className="w-[60%] flex flex-col gap-1">
                  <div onClick={() => handleCategoryClick(data?.category)}>
                    <p className="text-[18px] text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                  </div>
                  <div onClick={() => handlePostClick(data?.title)}>
                    <p className="text-xl text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-[#777676] font-[Lato]">
                    <p>{data?.writerName}</p>
                    <p>{formatDateToLongString(data?.date)}</p>
                  </div>
                </div>
                <div className="w-[40%] flex items-center" onClick={() => handlePostClick(data?.title)}>
                  <img src={data?.image} alt={data?.title} className='w-full h-[100px] md:h-[180px] rounded-md cursor-pointer' />
                </div>
              </div>
            </div>
          ))}
      </div>

      {!loading && posts?.length > initialPostCount && (
        <div className="flex items-center justify-center">
          <button
            className='p-2 my-4 text-xl text-primary border border-1 cursor-pointer w-1/2 hover:bg-[#e4e4e4] rounded-sm'
            onClick={toggleShowMore}
          >
            {showMore ? 'See less' : 'Read more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionTwo;
