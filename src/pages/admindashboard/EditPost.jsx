import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import QuillEditor from '../../components/admin/QuillEditor';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import axios from "axios";
import { Cookies } from 'react-cookie'

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies()
  const token = cookies.get('token')
  const [filePreview, setFilePreview] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPost(response?.data?.post);
        setContent(response?.data?.post?.content);
        if (response?.data?.post?.image) {
          setFilePreview(response?.data?.post?.image);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to fetch post data', { autoClose: 3000 });
      }
    };
    
    fetchPost(); 
  }, [id, token]);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleDeleteImage = () => {
    setFilePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!content || content.trim() === '') {
      toast.error('Content cannot be empty!', { autoClose: 3000 });
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('featured', e.target.featured.value);
    formData.append('title', e.target.title.value);
    formData.append('category', e.target.category.value);
    formData.append('imgSource', e.target.imgSource.value);
    formData.append('content', content);
  
    const file = e.target.file.files[0];
    if (file) {
      formData.append('image', file);
    }

    try {
      await axios.patch(`/posts/${id}`, 
        formData,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Post updated successfully!', { autoClose: 3000 });
      navigate('/admin-dashboard/posts');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update post. Try again!', { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Edit Post</p>
      <form ref={formRef} className="w-full md:w-[90%] flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center w-fit p-4 rounded-md">
          <div
            className="border-2 border-dashed border-gray-400 w-72 h-64 flex flex-col items-center justify-center cursor-pointer relative rounded-md"
            onClick={() => !filePreview && document.getElementById('file-upload').click()}
          >
            {!filePreview ? (
              <>
                <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                <p className="text-gray-400">Click to upload Image</p>
              </>
            ) : (
              <img
                src={filePreview}
                alt="Uploaded Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <input
              type="file"
              id="file-upload"
              name="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {filePreview && (
            <div className="w-full flex justify-end mt-2">
              <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={handleDeleteImage}
              />
            </div>
          )}
        </div>

        <select
          name="featured"
          required
          className="w-full bg-[#f7f7f7] md:text-xl outline-none p-4 border-2 border-gray-300 rounded-lg"
          defaultValue={post?.featured}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>

        <select
          name="category"
          required
          className="w-full bg-[#f7f7f7] md:text-xl outline-none p-4 border-2 border-gray-300 rounded-lg"
          defaultValue={post?.category}
        >
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Blockchain">Blockchain</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Events">Events</option>
          <option value="Hardware">Hardware</option>
          <option value="Jobs">Jobs</option>
          <option value="Software">Software</option>
          <option value="Startups">Startups</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title*"
          required
          className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg"
          defaultValue={post?.title}
        />

        <input
          type="text"
          name="imgSource"
          placeholder="Image Source (where you got the image)*"
          required
          className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg"
          defaultValue={post?.imgSource}
        />

        <QuillEditor 
          onContentChange={setContent}
          initialContent={post?.content}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg w-[20%]"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              'Update'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;