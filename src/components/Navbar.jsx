import alimego from '../assets/images/alimego.png'
import NavbarDropdown from './NavbarDropdown'
import SearchIcon from './utils/icons/SearchIcon'

const Navbar = () => {
  return (
    <div className='bg-white fixed shadow-sm py-1 md:py-2 px-6 w-full flex items-center justify-between'>
      <div className='flex items-center gap-2 md:gap-4'>
        <img src={alimego} alt='ALIMEGO' className='w-[50px] md:w-[60px] h-[50px] md:h-[60px]'/>
        <p className='block text-2xl md:text-3xl font-bold text-[#EE4B2B]'>ALIMEGO</p>
      </div>
      <div className='flex items-center gap-2 md:gap-10'>
        <div className='cursor-pointer'>
          <SearchIcon />
        </div>
        <NavbarDropdown />
      </div>
    </div>
  )
}

export default Navbar
