import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/contact", formData);
      toast.success(data.message, { position: "top-right" });
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit contact form");
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-6 px-6 md:px-20">
        <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Contact Us</p>
        <form
          className="w-full md:w-[90%] flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Message*"
            required
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <button
            type="submit"
            className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ContactUs;
