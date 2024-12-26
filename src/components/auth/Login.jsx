import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa' 
import { Cookies } from 'react-cookie';

// Yup schema for form validation
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup.string().required('Password is required'),
})

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false) 

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = async () => {
    const data = getValues()
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

    try {
      setIsLoading(true)
      const response = await axios.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      setIsLoading(false)
      cookies.set('token', response?.data?.token, {
        path: '/', 
        expires, 
        secure: true, 
        sameSite: 'strict' 
      });
      cookies.set('username', response?.data?.user?.name, {
        path: '/', 
        expires, 
        secure: true, 
        sameSite: 'strict' 
      });
      cookies.set('role', response?.data?.user?.role, {
        path: '/', 
        expires, 
        secure: true, 
        sameSite: 'strict' 
      });
      // Handle success response (e.g., save tokens or user info)
      toast.success('Login successful', { autoClose: 3000 })
      reset()
      navigate('/dashboard-redirect')
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setError('Incorrect email or password')
      toast.error('Login failed', { autoClose: 3000 })
    }
  }

  return (
    <div className="pt-20 pb-6 px-6 md:px-20">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Login</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[90%] flex flex-col gap-6">
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
            className="absolute right-4 top-0 bottom-0 my-auto flex items-center justify-center cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <Alert severity="error">{errors.password.message}</Alert>}

        {error && <Alert severity="error">{error}</Alert>}

        <button
          type="submit"
          className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Login'}
        </button>
        <p>Don&apos;t have an account yet? 
          <span className="text-[#1B4285]">
            <Link to='/alimego-reg-1b12'> Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
