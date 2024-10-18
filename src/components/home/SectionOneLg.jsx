import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { slugify } from '../../hooks/slugify';
import { setPost } from '../../store/reducers/post_reducer';
import { formatDateToLongString } from "../../hooks/dateFormatters"
import { shortenTitle } from "../../hooks/ReduceTitle"

const SectionOneLg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts?.posts);

  // Fetch posts from API and update the Redux store
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        dispatch(setPost(response?.data?.posts));
      } catch (error) {
        console.error('Error fetching posts:', error);
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
        {featuredPost?.slice(0, 1).map((data) => (
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
        {featuredPost?.slice(1).map((data) => (
          <div key={data?._id} className="h-[20vh] flex gap-4">
            <div className='w-[50%] h-fit'>
              <div onClick={() => handleCategoryClick(data?.category)}>
                <p className="text-sm text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
              </div>
              <div onClick={() => handlePostClick(data?.title)}>
                <p className="text-[18px] text-black font-bold hover:underline cursor-pointer">{shortenTitle(data?.title)}</p>
              </div>
              <div className="flex items-center gap-2 text-[#777676] text-sm font-[Lato]">
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
