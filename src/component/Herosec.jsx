import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'


const Herosec = () => {


    const { userData, userLogin } = useSelector((state) => state.currentUser)




    return (

        <div className=' container  gap-y-12 mt-16 text-center'>


            <Container  >


                {userLogin === true ? <div className=' text-lg p-2 px-3  rounded-full bg-myColor-700 inline-flex '> Hi ,  {userData.username}</div> : null}


                <div className='text-6xl '> Discover <span className='text-7xl  '> Blog </span> and Many More! </div>

                <div className='mt-4 text-2xl text-gray-500'>
                    Create your blog and see others also
                </div>

                <Link to={"/createBlog"}>   <div className='mt-4  inline-flex   bg-black  text-center shadow-2xl text-white rounded-full p-6 py-3 cursor-pointer  hover:bg-yellow-500 transition duration-500 items-center group/one  justify-between '><div className='text-lg'> Create Your Blog </div>   </div> </Link>


                {/* <ArrowForwardIosIcon className='  group-hover/one:translate-x-0.5 ms-2  transition-all duration-500' style={{ fontSize: "16px" }} /> */}

            </Container>




        </div>




    )
}

export default Herosec


const Container = styled.div`




div{

    font-family: 'Young Serif', serif;

}


`