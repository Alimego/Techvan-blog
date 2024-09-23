import { Link } from 'react-router-dom'
import alimego from '../assets/images/alimego.png'
import NavbarDropdown from './NavbarDropdown'
import SearchIcon from './utils/icons/SearchIcon'
import scrollToTop from '../hooks/scrollToTop'

const Navbar = () => {
  return (
    <div className='bg-white fixed shadow-sm py-1 md:py-2 px-4 md:px-16 w-full flex items-center justify-between'>
      <Link to='/'>
        <div className='flex items-center gap-2 md:gap-4' onClick={scrollToTop}>
          <img src={alimego} alt='ALIMEGO' className='w-[50px] md:w-[60px] h-[50px] md:h-[60px]'/>
          <p className='block text-2xl md:text-3xl font-bold text-primary'>ALIMEGO</p>
        </div>
      </Link>
      <div className='flex items-center gap-2 md:gap-10'>
        <div className='cursor-pointer'>
          <Link to='/search'>
            <SearchIcon />
          </Link>
        </div>
        <NavbarDropdown />
      </div>
    </div>
  )
}

export default Navbar
