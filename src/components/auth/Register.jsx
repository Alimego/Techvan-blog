import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must have a lowercase letter')
    .matches(/[A-Z]/, 'Password must have an uppercase letter')
    .matches(/\d/, 'Password must have a number')
    .matches(/[@$!%*?&#]/, 'Password must have a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response);
      setIsLoading(false);
      toast.success('Registration successful', { autoClose: 3000 });
      reset();
      navigate('/alimego-log-1b12');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Something went wrong, please try again');
      toast.error('Registration failed', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 pb-6 px-6 md:px-20">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Register</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[90%] flex flex-col gap-6">
        <input
          type="text"
          placeholder="Full Name*"
          {...register('name')}
          className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
        />
        {errors.name && <Alert severity="error">{errors.name.message}</Alert>}

        <input
          type="email"
          placeholder="Email*"
          {...register('email')}
          className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
        />
        {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

        <div className="relative flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password*"
            {...register('password')}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 cursor-pointer flex items-center justify-center h-full"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <Alert severity="error">{errors.password.message}</Alert>}

        <div className="relative flex items-center">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password*"
            {...register('confirmPassword')}
            className="w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 cursor-pointer flex items-center justify-center h-full"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && <Alert severity="error">{errors.confirmPassword.message}</Alert>}

        {error && <Alert severity="error">{error}</Alert>}

        <button
          type="submit"
          className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
