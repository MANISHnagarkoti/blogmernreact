import React, { useEffect, useState } from 'react'
import { isStyledComponent, styled } from 'styled-components'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import PaginationCom from '../component/PaginationCom'
import ToogleMenu from '../component/ToogleMenu'


const OurBlogs = () => {


    const { userData } = useSelector(state => state.currentUser)

    const [blog, setblog] = useState([])

    const [load, lload] = useState(true)

    const [page, setpage] = useState(1)

    const [limit, setlimit] = useState("")

    const [totalblogs, settotalblogs] = useState(null)









    const getBlogs = async () => {


        try {

            lload(true)

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}blogs/currentUserBlogs?userid=${userData.userid}&page=${page}`)


            setblog(data.allblogs.blogs)

            settotalblogs(data.totalblog)

            setlimit(data.limit)


            lload(false)


        } catch (error) {


            lload(false)

            if (error.response.status === 404) {





            }


        }


    }






    const deleteBlog = async (id) => {

        try {


            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}blogs/deleteBlog/${id}`)

            getBlogs()


        } catch (e) {


            console.log(e)
        }

    }





    useEffect(() => {

        getBlogs()




    }, [page])








    return (

        <>



            {


                load ?

                    <div className='flex justify-center items-center h-screen'>

                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                    </div>

                    :


                    < div >


                        <div className='container grid md:grid-cols-2  gap-y-14  gap-x-16  mt-16'>

                            {

                                blog.map((e) => {


                                    return (


                                        <div key={e._id} className='  rounded-3xl overflow-hidden   md:grid  grid-cols-2 space-y-5 gap-x-6  w-full  '  >






                                            <div className=' h-72 overflow-hidden group '>

                                                <img src={e.img} alt="no img" className='group-hover:scale-105  transition-all duration-300   w-full  h-full  object-cover object-top' />





                                            </div>






                                            <div className=' w-full  gap-y-5'>

                                                <div className='flex justify-between'>

                                                    <div className='text-slate-700  font font-extrabold text-md' >
                                                        {new Date(e.createdAt).toString().split(" ").slice(1, 4).join("  ")}

                                                    </div>

                                                    <ToogleMenu deleteBlog={() => deleteBlog(e._id)} editBlogId={e._id} />


                                                </div>






                                                <div className='font-bold md:text-2xl text-2xl mt-6'>{e.title}</div>




                                                <Content className='text-gray-500 text-sm mt-6'>


                                                    {parse(e.description)}

                                                </Content>


                                                <Link to={`/singleBlog/${e._id}`}>
                                                    <div className='mt-7 font-bold cursor-pointer flex items-center  group/one text-white   rounded-full bg-black w-36 text-center px-4 py-3'>

                                                        Read More

                                                    </div>
                                                </Link>




                                            </div>

                                        </div>


                                    )


                                })



                            }




                        </div>



                    </div >



            }



            <PaginationCom limit={limit} totalblog={totalblogs} setpage={(page) => setpage(page)} />




        </>
    )


}


export default OurBlogs


const Content = styled.div`


  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

`