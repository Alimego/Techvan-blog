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
    <div className='bg-white fixed shadow-sm py-2 md:py-2 px-4 md:px-16 w-full flex items-center justify-between'>
      <Link to='/'>
        <div className='flex items-center gap-2 justify-center' onClick={toTop}>
          <img src={techvan} alt='TECHVAN' className='w-[20px] md:w-[40px] h-[25px] md:h-[40px]'/>
          <p className='block text-[18px] md:text-2xl font-bold text-primary font-[Poppins]'>TECHVAN</p>
        </div>
      </Link>
      <div className='flex items-center gap-6 md:gap-12'>
        <div className='cursor-pointer'>
          <Link to='/search'>
            <SearchIcon />
          </Link>
        </div>
        <div className='cursor-pointer'>
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
