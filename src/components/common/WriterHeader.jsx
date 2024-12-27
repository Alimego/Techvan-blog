import { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import techvan from '../../assets/images/techvan.png'
import NavbarIcon from '../utils/icons/NavbarIcon'
import adminImg from '../../assets/images/admin.png'
import DropdownIcon from '../utils/icons/DropdownIcon'

const WriterHeader = ({toggleSideNav}) => {
  const cookies = new Cookies(); 
  const navigate = useNavigate();
  const username = cookies.get('username');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    cookies.remove('token');
    cookies.remove('username');
    cookies.remove('role')
    toast.success('Logout successful', { autoClose: 3000 });
    navigate('/');
  };

  return (
    <div className="flex h-[10vh] items-center justify-between bg-white shadow-md">
        <div className='flex items-center justify-between w-[45%] md:w-[25%] py-2 pl-2 border-r-2'>
            <Link to='/'>
                <div className='flex items-center gap-1'>
                <img src={techvan} alt='TECHVAN' className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'/>
                <p className='hidden lg:block text-[18px] font-bold text-primary font-[Poppins]'>TECHVAN</p>
                </div>
            </Link>
            <div className='cursor-pointer hover:bg-slate-100 p-2' onClick={toggleSideNav}>
                <NavbarIcon />
            </div>
        </div>
        <div className='flex items-center justify-end gap-4 w-full p-2 pr-4'>
            <div className='flex items-center gap-3'>
                <div onClick={(event)=> handleOptions(event)} className='flex items-center gap-4 hover:bg-slate-100 p-2 cursor-pointer'>
                    <img src={adminImg} alt="user" className='rounded-full w-8 h-8'/>
                    <p className='hidden md:block text-xl font-[Poppins] font-medium'>{username}</p>
                    <DropdownIcon />
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem>Settings</MenuItem>
                    <MenuItem><span onClick={logout}>Logout</span></MenuItem>
                    </Menu>
            </div>
        </div>
    </div>
  )
}

export default WriterHeader

