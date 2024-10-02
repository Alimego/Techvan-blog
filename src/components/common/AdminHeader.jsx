import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import alimego from '../../assets/images/alimego.png'
import NavbarIcon from '../utils/icons/NavbarIcon'
import adminImg from '../../assets/images/admin.png'
import DropdownIcon from '../utils/icons/DropdownIcon'

const AdminHeader = ({toggleSideNav}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="flex h-[10vh] items-center justify-between bg-white shadow-md">
        <div className='flex items-center justify-between w-[45%] md:w-[25%] py-2 pl-2 border-r-2'>
            <Link to='/'>
                <div className='flex items-center gap-3'>
                <img src={alimego} alt='ALIMEGO' className='w-[47px] h-[47px]'/>
                <p className='hidden md:block text-xl font-bold text-primary font-[Poppins]'>ALIMEGO</p>
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
                    <p className='hidden md:block text-xl font-[Poppins] font-medium'>Chinedu Oscar</p>
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
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My Messages</MenuItem>
                    <MenuItem>Logout</MenuItem>
                    </Menu>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader

