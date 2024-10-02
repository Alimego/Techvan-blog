import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const CreatePost = () => {
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    } else {
      setFilePreview(null);
    }
  };

  const handleDeleteImage = () => {
    setFilePreview(null); // Clear the image preview
  };

  return (
    <div className="bg-[#f7f7f7] p-4 md:p-6 w-full no-scrollbar overflow-scroll">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Create Post</p>
      <form className="w-full md:w-[90%] flex flex-col gap-6">
        <input 
          type="text"
          placeholder="Writer's Name*"
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <input 
          type="date"
          placeholder='Date*' 
          required 
          className='w-full bg-[rgb(247,247,247)] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <div className="flex flex-col items-center justify-center w-fit p-4 rounded-md">
          <div 
            className="border-2 border-dashed border-gray-400 w-72 h-64 flex flex-col items-center justify-center cursor-pointer relative rounded-md"
            onClick={() => !filePreview && document.getElementById('file-upload').click()} // Trigger file input only if no image is uploaded
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
        <div>
          <input 
            type="text"
            placeholder='Category*' 
            required 
            className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
          />
        </div>
        <input 
          type="text"
          placeholder='Title*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <input 
          type="text"
          placeholder='Image Source (where you got the image)*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        /> 
        <textarea
          placeholder='Content*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'
        />
        <button className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg w-[20%]">Create</button>
        <p></p>
      </form>
    </div>
  );
};

export default CreatePost;
