import { Navigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const PrivateRoute = ({ children }) => {
  const token = cookies.get('token')
  if (!token) {
    return <Navigate to="/alimego-log-1b12" />
  }
  return children
}

export default PrivateRoute
