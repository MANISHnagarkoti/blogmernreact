import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { removeuser } from '../redux/currentuser'
import axios from 'axios'

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutFunc = async () => {

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/logout`, { withCredentials: true })

    if (data.sucess === true) {

      dispatch(removeuser())

      navigate("/")
    }
  }

  const { userLogin, userData } = useSelector((state) => state.currentUser)


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >

            <div className='w-[35px] h-[35px] overflow-hidden rounded-full'>
              <img src={userData.profilepic} className='w-full h-full object-cover' alt="" />
            </div>

          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >



        <MenuItem onClick={handleClose}>
          <Link className='flex items-center' to={"/profile"}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            User Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className='flex items-center' to={"/ourBlog"}>
            <ListItemIcon>
              <PermMediaIcon fontSize="small" />
            </ListItemIcon>
            Your Blogs
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} >
          <div onClick={logoutFunc} className='flex items-center'>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>

            Logout
          </div>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}