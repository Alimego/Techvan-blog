import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Layout from "../layouts/Layout"

// Yup schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number")
    .optional(),
  message: yup.string().required("Message is required"),
});

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/contact", data);
      setIsLoading(false);
      toast.success(response.data.message || "Submitted successfully", {
        autoClose: 3000,
      });
      reset();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(
        err.response?.data?.message || "Submission failed"
      );
      toast.error("Submission failed", { autoClose: 3000 });
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-6 px-6 md:px-20">
        <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Contact Us</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[90%] flex flex-col gap-6"
        >
          <input
            type="text"
            placeholder="Name*"
            {...register("name")}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}

          <input
            type="email"
            placeholder="Email*"
            {...register("email")}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          {errors.phone && <Alert severity="error">{errors.phone.message}</Alert>}

          <textarea
            placeholder="Message*"
            {...register("message")}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          {errors.message && (
            <Alert severity="error">{errors.message.message}</Alert>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <button
            type="submit"
            className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color="inherit" size={24} /> : "Send"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ContactUs;
