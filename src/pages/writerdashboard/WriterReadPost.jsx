import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify';
import { formatDateToLongString } from '../../hooks/dateFormatters'

const WriterReadPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('token')
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedPostId, setSelectedPostId] = useState(null)

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

  const handleEdit = (id) => {
    // const slug = slugify(title);
    navigate(`/writer-dashboard/edit/${id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(selectedPostId)
      await axios.delete(`/posts/${selectedPostId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Post deleted successfully', { autoClose: 3000 })
      navigate('/writer-dashboard/posts')
      handleClose();
    } catch (error) {
      toast.error('Error deleting post.', { autoClose: 3000 })
      console.error('Error deleting post:', error);
    }
  };
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/post/${slug}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPost(response?.data?.post);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to fetch post data', { autoClose: 3000 });
      }
    };

    fetchPost();
  }, [slug, token]);

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll h-full">
        <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3">
                <div>
                    <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{post?.category}</p>
                </div>
                <div>
                    <p className="text-2xl text-black font-bold cursor-pointer w-full lg:w-[60%]">{post?.title}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                    <p>{post?.writerName}</p>
                    <p>-</p>
                    <p>{formatDateToLongString(post?.date)}</p>
                </div>
            </div>
            <img 
                src={post?.image} 
                alt={post?.title}
                className='w-full lg:w-[60%] h-[220px] md:h-[500px] rounded-md'
            />
            <p className='text-[#777676]'>Image Source: {post?.imgSource}</p>
            <div className='py-4'>
              <div className='leading-8 text-[17px] font-[Open Sans]' dangerouslySetInnerHTML={{ __html: post?.content }} />
            </div>
            <div className="flex justify-between items-center">
                <button className='bg-green-500 text-white text-xl font-medium px-4 py-2 rounded-md' onClick={() => handleEdit(post?._id)}>Edit</button>
                <button className='bg-red-500 text-white text-xl font-medium px-4 py-2 rounded-md'
                  onClick={ () => {
                    handleOpen()
                    setSelectedPostId(post?._id)
                  }}>
                    Delete
                </button>
            </div>
        </div>
            
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
  )
}

export default WriterReadPost
