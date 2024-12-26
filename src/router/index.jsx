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
import AdminLayout from '../layouts/AdminLayout'
import WriterLayout from '../layouts/WriterLayout'
import DashboardRedirect from '../pages/DashboardRedirect'
import Dashboard from '../pages/admindashboard/Dashboard'
import CreatePost from '../pages/admindashboard/CreatePost'
import AllPosts from '../pages/admindashboard/AllPosts'
import ReadPost from '../pages/admindashboard/ReadPost'
import EditPost from '../pages/admindashboard/EditPost'
import WriterDashboard from '../pages/writerdashboard/WriterDashboard'
import WriterCreatePost from '../pages/writerdashboard/WriterCreatePost'
import WriterAllPosts from '../pages/writerdashboard/WriterAllPosts'
import WriterReadPost from '../pages/writerdashboard/WriterReadPost'
import WriterEditPost from '../pages/writerdashboard/WriterEditPost'
import PrivateRoute from './PrivateRoute'

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
    path: '/register',
    element: <RegisterPage />, //  Register page
  },
  {
    path: '/login',
    element: <LoginPage/>, // Login page
  },
  {
    path: '/dashboard-redirect',
    element: <DashboardRedirect/>, // Dashboard redirect page
  },
  {
    path: '/admin-dashboard',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'create',
        element: <CreatePost />,
      },
      {
        path: 'edit/:id',
        element: <EditPost />,
      },
      {
        path: 'posts',
        element: <AllPosts />,
      },
      {
        path: ':slug',
        element: <ReadPost />,
      },] 
  },
  {
    path: '/writer-dashboard',
    element: (
      <PrivateRoute>
        <WriterLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <WriterDashboard />,
      },
      {
        path: 'create',
        element: <WriterCreatePost />,
      },
      {
        path: 'edit/:id',
        element: <WriterEditPost />,
      },
      {
        path: 'posts',
        element: <WriterAllPosts />,
      },
      {
        path: ':slug',
        element: <WriterReadPost />,
      },] 
  },
])

export default router
