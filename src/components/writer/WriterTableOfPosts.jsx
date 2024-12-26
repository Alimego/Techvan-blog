import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { Cookies } from 'react-cookie'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThreeDotsIcon from "../utils/icons/ThreeDotsIcon";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from '@mui/material'
import { shortTableTitle } from "../../hooks/ReduceTitle";
import { formatDateToNumericString } from "../../hooks/dateFormatters"
import { slugify } from '../../hooks/slugify'; 
import { setWriterPost } from '../../store/reducers/post_reducer';

const tableHead = ["Date", "Writer", "Category", "Title", ""];
const smTableHead = ["Date", "Title", ""];

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

export default function WriterTableOfPosts() {
  const cookies = new Cookies()
  const token = cookies.get('token')
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const writerPosts = useSelector((state) => state.posts.writerPosts);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [optionsMenu, setOptionsMenu] = useState(null);
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const tbHead = isMediumScreen ? smTableHead : tableHead

  const openDropdown = Boolean(anchorEl);

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownOptions = (e, postId) => {
    setAnchorEl(e.currentTarget);
    setOptionsMenu((prevOpenMoreOptions) =>
      prevOpenMoreOptions === postId ? null : postId
    );
  };

  const handleOpenModal = (postId) => {
    setSelectedPostId(postId); 
    handleDropdownClose();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleReadClick = (title) => {
    handleDropdownClose();
    const slug = slugify(title);
    navigate(`/writer-dashboard/${slug}`);
  };

  const handleEditClick = (id) => {
    handleDropdownClose();
    navigate(`/writer-dashboard/edit/${id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/posts/${selectedPostId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Post deleted successfully', { autoClose: 3000 })
      const updatedPosts = displayedPosts.filter(post => post._id !== selectedPostId);;
      dispatch(setWriterPost(updatedPosts));
      setSelectedPostId(null);
      handleCloseModal();
    } catch (error) {
      toast.error('Error deleting post.', { autoClose: 3000 })
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts/writer',{
          headers: {
            'Authorization': `Bearer ${token}`,  // Add token to headers
          },
        });
        dispatch(setWriterPost(response.data.posts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, [dispatch, token]);

  useEffect(() => {
    if (writerPosts.length > 0) {
      setDisplayedPosts(writerPosts.slice(0, 5));
    }
  }, [writerPosts]);

  return (
    <div className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left text-[9px] md:text-[16px]">
        <thead>
          <tr>
            {tbHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <p className="font-medium md:font-normal leading-none opacity-70 text-gray-700">
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedPosts.map(({ _id, date, writerName, category, title }, index) => {
            const isLast = index === writerPosts.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <p className="font-normal text-gray-700">{formatDateToNumericString(date)}</p>
                </td>
                <td className={`${classes} ${isMediumScreen && 'hidden'}`}>
                  <p className="font-normal text-gray-700">{writerName}</p>
                </td>
                <td className={`${classes} ${isMediumScreen && 'hidden'}`}>
                  <p className="font-normal text-gray-700">{category}</p>
                </td>
                <td className={classes}>
                  <p className="font-normal text-gray-700">{shortTableTitle(title)}</p>
                </td>
                <td className={classes}>
                  <p className="font-medium text-sm md:text-[16px] text-gray-700 cursor-pointer">
                    <Button
                      id="basic-button"
                      aria-controls={openDropdown ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openDropdown ? 'true' : undefined}
                      onClick={(e) => handleDropdownOptions(e, _id)}
                    >
                      <ThreeDotsIcon />
                    </Button>
                    {optionsMenu === _id && (
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openDropdown}
                        onClose={handleDropdownClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => handleReadClick(title)}>Read</MenuItem>
                        <MenuItem onClick={() => handleEditClick(_id)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenModal(_id)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    )}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={'/writer-dashboard/posts'}>
        <p className="text-primary cursor-pointer font-bold text-right w-full py-4 px-10">
          View All
        </p>
      </Link>

      {/* Delete Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
          <Button onClick={handleCloseModal}>Cancel</Button>
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
}