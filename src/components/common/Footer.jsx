import { Link } from 'react-router-dom'
import techvan from '../../assets/images/techvan.png'
import FacebookIcon from '../utils/icons/FacebookIcon'
import InstagramIcon from '../utils/icons/InstagramIcon'
import LinkedinIcon from '../utils/icons/LinkedinIcon'
import TwitterIcon from '../utils/icons/TwitterIcon'
import { toTop } from '../../hooks/scrollToTop'

const Footer = () => {
  return (
    <div className="bg-[#212121] text-white p-6 mt-auto">
      <div className='flex flex-col items-center pb-4 gap-2'>
        <Link to='/'>
          <div className='flex items-center justify-center gap-2' onClick={toTop}>
            <img src={techvan} alt='TECHVAN' className='w-[20px] md:w-[40px] h-[20px] md:h-[40px]'/>
            <p className='block text-xl md:text-2xl font-bold text-primary'>TECHVAN</p>
          </div>
        </Link>
        <div className='text-center font-medium md:w-[600px] font-[Lato]'>Techvan Empowers you with Knowledge. Get the latest insights and updates on the ever-evolving world of technology.</div>
      </div>
      <ul className='flex gap-10 md:gap-20 justify-center items-center py-4 md:py-6 text-[18px] font-[Lato]'>
        <Link to={'/about'}>About</Link>
        <Link to={'/contact'}>Contact</Link>
        <Link to={'/jobs'}>Jobs</Link>
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
