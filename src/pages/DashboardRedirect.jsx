import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'

const DashboardRedirect = () => {
  const cookies = new Cookies()
  const role = cookies.get('role')
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'admin') navigate('/admin-dashboard')
    else if (role === 'writer') navigate('/writer-dashboard')
  }, [role, navigate])

  return null
}

export default DashboardRedirect
