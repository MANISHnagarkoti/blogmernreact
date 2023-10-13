import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { removeuser } from '../redux/currentuser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const { userLogin } = useSelector((state) => state.currentUser)

  const [openConfirmbox, oopenConfirmbox] = useState()


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
      {/* <AlertDialog headcolor={"red"} dialogBoxOpen={oopenConfirmbox} afterAgreeFunc={logoutFunc} heading={"Are you sure?"} description={"Please confirm this ,  by clicking Agree Button"} /> */}


      <div className=' px-4 flex items-center justify-between h-24  '>

        {/* <DragHandleIcon /> */}



        <Link to={"/"}> <h1 className='text-4xl font-bold '>Blog</h1> </Link>


        {

          userLogin === true ?


            <div className='flex gap-x-5 flex-wrap'  >


              <Link to={"/ourBlog"}>   <div className='   text-center  px-3 py-2 cursor-pointer  transition-all duration-200'>Your Blogs</div> </Link>
              <div onClick={() => openConfirmbox()} className='bg-black  text-center text-white rounded-full px-3 py-2 cursor-pointer  transition-all duration-200'>LogOut</div>


            </div>

            :

            <div className='flex gap-x-5 flex-wrap'  >

              <Link to={"/register"}>  <div className=' border-2 bg-black text-white rounded-full px-3 py-2 cursor-pointer '>Sign up</div>  </Link>

              <Link to={"/login"}>   <div className=' border-2  text-center  rounded-lg px-3 py-2 cursor-pointer   transition-all duration-200'>Login</div> </Link>


            </div>


        }



      </div>


    </>

  )
}

export default Navbar