import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    path: '*',
    element: <div>page not found</div>, // 404 page to be completed
  },
  {
    path: '/',
    element: <Home />, // Home page
  },
])

export default router
