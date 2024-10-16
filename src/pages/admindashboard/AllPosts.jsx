import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import Axios for API requests
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '../../components/utils/icons/SearchIcon';
import { shortenTitle } from '../../hooks/ReduceTitle';
import { slugify } from '../../hooks/slugify';
import { setPost } from '../../store/reducers/post_reducer';
import { Cookies } from 'react-cookie';
import { formatDateToLongString } from '../../hooks/dateFormatters';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #f7f7f7',
  boxShadow: 24,
  p: 4,
};

const AllPosts = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(posts);
  const [noResults, setNoResults] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleOpen = (id) => {
    setSelectedPostId(id);
    console.log(selectedPostId)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleReadClick = (title) => {
    const slug = slugify(title);
    navigate(`/admin-dashboard/${slug}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/edit/${id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(selectedPostId)
      console.log(posts)
      await axios.delete(`/posts/${selectedPostId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Post deleted successfully', { autoClose: 3000 })
      setSearchResults((prevResults) => 
        prevResults.filter(post => post._id !== selectedPostId)
      );
      setSelectedPostId(null);
      handleClose();
    } catch (error) {
      toast.error('Error deleting post.', { autoClose: 3000 })
      console.error('Error deleting post:', error);
    }
  };

  // Fetch posts from API and update the Redux store
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        dispatch(setPost(response.data.posts)); // Dispatch fetched posts to the Redux store
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch, token]);

  // Handle search logic
  useEffect(() => {
    const lowerCaseTerm = searchTerm?.toLowerCase();
    const results = posts?.filter((item) =>
      item?.category?.toLowerCase().includes(lowerCaseTerm) ||
      item?.title?.toLowerCase().includes(lowerCaseTerm) ||
      item?.writer?.toLowerCase().includes(lowerCaseTerm) ||
      item?.date?.toLowerCase().includes(lowerCaseTerm)
    );

    if (searchTerm) {
      setDisplayedSearchTerm(searchTerm);
      setSearchResults(results);
      setNoResults(results.length === 0);
    } else {
      setDisplayedSearchTerm("");
      setSearchResults(posts);
      setNoResults(false);
    }
  }, [searchTerm, posts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll'>
      <form className="py-4 md:pb-8" onSubmit={(e) => e.preventDefault()}>
        <div className='w-full flex items-center justify-center bg-[#f7f7f7] p-4 border-2 border-gray-300 rounded-lg'>
          <input 
            type="text"
            name="search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder='Search' 
            className='w-full bg-[#f7f7f7] text-xl text-black outline-none'
          />
          <button type="button" className='cursor-pointer'>
            <SearchIcon />
          </button>
        </div>
      </form>

      {noResults ? (
        <div className="grid gap-2">
          <p>Sorry, we couldn&apos;t find any results for <span className="font-bold">{displayedSearchTerm}</span>.</p>
          <p>Try the following suggestions to improve your search:</p>
          <ul className="flex flex-col gap-2 list-disc pl-8">
            <li>Check your spelling.</li>
            <li>Try using different keywords.</li>
            <li>Use more general search terms.</li>
          </ul>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {searchResults?.map((data) => (
            <div key={data?._id} className="flex bg-white p-4">
              <div className="w-full flex flex-col gap-3">
                <div>
                  <p className="text-primary font-semibold font-[Lato]">{data?.category}</p>
                </div>
                <div className='h-[90px]'>
                  <p className="text-xl text-black font-bold">{shortenTitle(data?.title)}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato] text-sm">
                  <p>{data?.writerName}</p>
                  <p>-</p>
                  <p>{formatDateToLongString(data?.date)}</p>
                </div>
                <div>
                  <img src={data?.image} alt={data?.title} className='w-full h-[200px] rounded-md' />
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-bold text-blue-500 cursor-pointer' onClick={() => handleReadClick(data?.title)}>Read</p>
                  <p className='font-bold text-green-500 cursor-pointer' onClick={() => handleEdit(data?._id)}>Edit</p>
                  <p className='font-bold text-red-500 cursor-pointer' onClick={() => handleOpen(data?._id)}>Delete</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Delete Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Post
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          Are you sure you want to delete this post? This action cannot be undone.
        </Typography>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          color="error"
          onClick={handleDeleteConfirm}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
    </div>
  );
};

export default AllPosts;
