import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import postData from '../../data/postData';
import SearchIcon from '../../components/utils/icons/SearchIcon';
import { shortenTitle } from '../../hooks/ReduceTitle';
import { slugify } from '../../hooks/slugify';

const AllPosts = () => {
  const navigate = useNavigate()  

  const handleReadClick = (title) => {
    const slug = slugify(title)
    navigate(`/admin-dashboard/${slug}`)
  }

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

  const [searchTerm, setSearchTerm] = useState(""); // Track what the user is typing
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState(""); // Track the term used for the search result display
  const [searchResults, setSearchResults] = useState(postData);
  const [noResults, setNoResults] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Filter results based on the current searchTerm
    const lowerCaseTerm = searchTerm.toLowerCase();
    const results = postData.filter((item) =>
      item.category.toLowerCase().includes(lowerCaseTerm) ||
      item.title.toLowerCase().includes(lowerCaseTerm) ||
      item.writer.toLowerCase().includes(lowerCaseTerm) ||
      item.date.toLowerCase().includes(lowerCaseTerm)
    );

    // Update the searchResults state and handle no results case
    if (searchTerm) {
      setDisplayedSearchTerm(searchTerm);
      setSearchResults(results);
      setNoResults(results.length === 0);
    } else {
      // If searchTerm is empty, reset to all posts
      setDisplayedSearchTerm("");
      setSearchResults(postData);
      setNoResults(false);
    }
  }, [searchTerm]); // Re-run the effect whenever searchTerm changes

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='bg-[#f7f7f7] p-6 w-full no-scrollbar overflow-scroll'>
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
          {searchResults.map((data) => (
            <div key={data?.id} className="flex bg-white p-4">
              <div className="w-full flex flex-col gap-3">
                <div>
                  <p className="text-primary font-semibold font-[Lato]">{data?.category}</p>
                </div>
                <div className='h-[90px]'>
                  <p className="text-xl text-black font-bold">{shortenTitle(data?.title)}</p>
                </div>
                <div className="flex items-center gap-2 text-[#777676] font-[Lato] text-sm">
                  <p>{data?.writer}</p>
                  <p>-</p>
                  <p>{data?.date}</p>
                </div>
                <div>
                  <img src={data?.image} alt={data?.title} className='w-full h-[200px] rounded-md' />
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-bold text-blue-500 cursor-pointer' onClick={()=>handleReadClick(data?.title)}>Read</p>
                  <p className='font-bold text-green-500 cursor-pointer'>Edit</p>
                  <p className='font-bold text-red-500 cursor-pointer' onClick={handleOpen}>Delete</p>
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
          onClick={handleClose}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
    </div>
  );
}

export default AllPosts;