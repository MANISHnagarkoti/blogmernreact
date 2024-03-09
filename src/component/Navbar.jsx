import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileMenu from './ProfileMenu'

const Navbar = () => {

  const { userLogin } = useSelector((state) => state.currentUser)

  return (
    <>
      <nav className='border-b border-gray-200 font-semibold'>
        <div className='flex items-center justify-between container py-2'>

          <Link to={"/"}>  <img src="/logo/bloglogo.png" className='w-12' alt="" /> </Link>
          <div>

          </div>
          {
            userLogin === true ?
              <div className='flex gap-x-5 flex-wrap items-center'  >
                <ProfileMenu />
              </div>
              :
              <div className='flex gap-x-5 flex-wrap items-center'>

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