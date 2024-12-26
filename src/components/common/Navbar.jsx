import { Link } from 'react-router-dom'
import techvan from '../../assets/images/techvan.png'
import NavbarDropdown from './NavbarDropdown'
import SearchIcon from '../utils/icons/SearchIcon'
import { toTop } from '../../hooks/scrollToTop'
import UserIcon from '../utils/icons/UserIcon'
import { Cookies } from 'react-cookie'

const Navbar = () => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  return (
    <div className='bg-white fixed shadow-sm py-1 md:py-2 px-4 md:px-16 w-full flex items-center justify-between'>
      <Link to='/'>
        <div className='flex items-center gap-2 md:gap-4' onClick={toTop}>
          <img src={techvan} alt='TECHVAN' className='w-[50px] md:w-[60px] h-[50px] md:h-[60px]'/>
          <p className='block text-2xl md:text-3xl font-bold text-primary font-[Poppins]'>TECHVAN</p>
        </div>
      </Link>
      <div className='flex items-center md:gap-4'>
        <div className='cursor-pointer'>
          <Link to='/search'>
            <SearchIcon />
          </Link>
        </div>
        <div className='cursor-pointer ml-6 mr-2'>
          <Link to={token ? '/dashboard-redirect' :'/login'}>
            <UserIcon />
          </Link>
        </div>
        <NavbarDropdown />
      </div>
    </div>
  )
}

export default Navbar
