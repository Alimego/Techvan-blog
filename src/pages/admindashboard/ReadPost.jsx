import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import postData from '../../data/postData'
import { slugify } from '../../hooks/slugify'

const ReadPost = () => {
  const { slug } = useParams()
  const post = postData.find((post) => slugify(post.title) === slug);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll">
        <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3">
                <div>
                    <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{post?.category}</p>
                </div>
                <div>
                    <p className="text-2xl text-black font-bold cursor-pointer w-full lg:w-[60%]">{post?.title}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                    <p>{post?.writer}</p>
                    <p>-</p>
                    <p>{post?.date}</p>
                </div>
            </div>
            <img 
                src={post?.image} 
                alt={post?.title}
                className='w-full lg:w-[60%] h-[220px] md:h-[500px] rounded-md'
            />
            <p className='text-[#777676]'>Image Source: {post?.imgSource}</p>
            <div className='py-4'>
                <p className=' leading-8 text-[17px] font-[Open Sans]'>{post?.content}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className='bg-green-500 text-white text-xl font-medium px-4 py-2 rounded-md'>Edit</button>
                <button className='bg-red-500 text-white text-xl font-medium px-4 py-2 rounded-md' onClick={handleOpen}>Delete</button>
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
                onClick={handleClose}
                >
                Confirm
            </Button>
        </Box>
        </Modal>
    </div>
  )
}

export default ReadPost
