import alimego from '../assets/images/alimego.png'
import FacebookIcon from '../components/utils/icons/FacebookIcon'
import InstagramIcon from '../components/utils/icons/InstagramIcon'
import LinkedinIcon from '../components/utils/icons/LinkedinIcon'
import TwitterIcon from '../components/utils/icons/TwitterIcon'

const Footer = () => {
  return (
    <div className="bg-[#212121] text-white p-6">
      <div className='flex flex-col items-center pb-4 gap-2'>
        <div className='flex items-center justify-center gap-2 md:gap-4'>
        <img src={alimego} alt='ALIMEGO' className='w-[50px] md:w-[60px] h-[50px] md:h-[60px]'/>
          <p className='block text-2xl md:text-3xl font-bold text-[#EE4B2B]'>ALIMEGO</p>
        </div>
        <div className='text-center'>Alimego Empowers you with Knowledge. Get the latest insights and updates on the ever-evolving world of technology.</div>
      </div>
      <ul className='flex justify-around items-center py-2 text-xl'>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      <div className='pt-4'>
        <p className='text-center text-[18px]'>Follow us:</p>
        <div className='flex items-center justify-center gap-6 pt-2'>
           <FacebookIcon />
            <LinkedinIcon />
            <TwitterIcon />
            <InstagramIcon />
        </div>
      </div>
      <p className='text-center pt-4'>Copyright © {new Date().getFullYear()}. All right reserved.</p>
    </div>
  )
}

export default Footer
