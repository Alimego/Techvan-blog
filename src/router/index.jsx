import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Post from '../pages/Post'
import Search from '../pages/Search'
import Category from '../pages/Category'
import Jobs from '../pages/Jobs'
import NoPage from '../pages/NoPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NoPage />, // 404 page to be completed
  },
  {
    path: '/',
    element: <Home />, // Home page
  },
  {
    path: '/about',
    element: <AboutUs />, // About page
  },
  {
    path: '/contact',
    element: <ContactUs />, // Contact page
  },
  {
    path: '/:slug',
    element: <Post />, // Post page
  },
  {
    path: '/search',
    element: <Search />, // Search page
  },
  {
    path: '/category/:slug',
    element: <Category />, // Category page
  },
  {
    path: '/jobs',
    element: <Jobs />, // Job page
  },
  {
    path: '/alimego-reg-1b12',
    element: <RegisterPage />, //  Register page
  },
  {
    path: '/alimego-log-1b12',
    element: < LoginPage/>, // Login page
  },
])

export default router
