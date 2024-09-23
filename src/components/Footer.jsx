import { Link } from 'react-router-dom'
import alimego from '../assets/images/alimego.png'
import FacebookIcon from '../components/utils/icons/FacebookIcon'
import InstagramIcon from '../components/utils/icons/InstagramIcon'
import LinkedinIcon from '../components/utils/icons/LinkedinIcon'
import TwitterIcon from '../components/utils/icons/TwitterIcon'
import scrollToTop from '../hooks/scrollToTop'

const Footer = () => {
  return (
    <div className="bg-[#212121] text-white p-6 mt-auto">
      <div className='flex flex-col items-center pb-4 gap-2'>
        <Link to='/'>
          <div className='flex items-center justify-center gap-2 md:gap-4' onClick={scrollToTop}>
            <img src={alimego} alt='ALIMEGO' className='w-[50px] md:w-[60px] h-[50px] md:h-[60px]'/>
            <p className='block text-2xl md:text-3xl font-bold text-primary'>ALIMEGO</p>
          </div>
        </Link>
        <div className='text-center font-medium md:w-[600px]'>Alimego Empowers you with Knowledge. Get the latest insights and updates on the ever-evolving world of technology.</div>
      </div>
      <ul className='flex gap-10 md:gap-20 justify-center items-center py-4 md:py-6 text-[18px]'>
        <li className='cursor-pointer'>About Us</li>
        <li className='cursor-pointer'>Contact Us</li>
        <li className='cursor-pointer'>Events</li>
      </ul>
      <div className='pt-4'>
        <p className='text-center text-[18px] font-semibold'>Follow us:</p>
        <div className='flex items-center justify-center gap-6 pt-2'>
           <FacebookIcon />
            <LinkedinIcon />
            <TwitterIcon />
            <InstagramIcon />
        </div>
      </div>
      <p className='text-center pt-6'>Copyright © {new Date().getFullYear()}. All right reserved.</p>
    </div>
  )
}

export default Footer
