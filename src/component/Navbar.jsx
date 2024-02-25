import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { removeuser } from '../redux/currentuser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const { userLogin } = useSelector((state) => state.currentUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutFunc = async () => {

    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/logout`, { withCredentials: true })

    if (data.sucess === true) {

      localStorage.clear();

      dispatch(removeuser())

      navigate("/")

      window.location.reload();
    }
  }

  return (
    <>
      <nav className='border-b border-gray-300'>
        <div className='flex items-center justify-between container  py-3'>

          <Link to={"/"}>  <img src="/logo/bloglogo.png" className='w-12' alt="" /> </Link>
          <div>

          </div>
          {
            userLogin === true ?
              <div className='flex gap-x-5 flex-wrap'  >
                <Link to={"/ourBlog"}>   <div className='   text-center  px-3 py-2 cursor-pointer  transition-all duration-200'>Your Blogs</div> </Link>
                <div onClick={() => logoutFunc()} className='bg-black text-white text-center rounded-full px-3 py-2 cursor-pointer  transition-all duration-200'>LogOut</div>
              </div>
              :
              <div className='flex gap-x-5 flex-wrap'>

                <Link to={"/register"}>  <div className='bg-black text-white rounded-full px-3 py-2 cursor-pointer'>Sign up</div>  </Link>

                <Link to={"/login"}>   <div className='text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200'>Login</div> </Link>
              </div>
          }
        </div>
      </nav >
    </>

  )
}

export default Navbar