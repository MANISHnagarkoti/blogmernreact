import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import PaginationCom from './PaginationCom'





const Blog = () => {

    const [blog, setblog] = useState([])

    const [cat, setcat] = useState([])

    const [catName, setcatName] = useState("All")

    const [text, setText] = useState("")

    const [page, setpage] = useState(1)

    const [limit, setlimit] = useState("")

    const [totalblogs, settotalblogs] = useState(null)




    const [load, setload] = useState(true)

    const getBlogs = async () => {

        setload(true)

        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}blogs/blogByCategory?category=${catName}&&page=${page}&search=${text}`)


        setblog(data.allblogs)

        settotalblogs(data.totalblogs)

        setlimit(data.limit)

        setload(false)
    }


    const getCat = async () => {



        const { data: category } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}categorie/allcategories`)


        setcat(category.categories)

    }



    useEffect(() => {

        getCat()


    }, [])


    useEffect(() => {

        getBlogs()


    }, [catName, page])











    return (


        <Container className='mt-24 container'>


            {/* <h1 className='font-bold text-4xl'>All Blogs</h1> */}




            <div className='flex gap-x-6 mt-8 justify-center'>


                <input type="text" name="" onChange={(e) => setText(e.target.value)} placeholder='Search by title of blog' className='out outline-none rounded-full bg-gray-200 border-gray-300 border-2 py-3 px-6   w-[600px]  max-w-7xl' id="" />



                <div onClick={getBlogs} className='bg-black rounded-full px-4 py-1  flex items-center justify-center font-bold tracking-widest text-white cursor-pointer'>

                    Search

                </div>

            </div>


            <div className='container flex gap-x-4 flex-wrap mt-12 justify-center gap-y-5'>



                <CatButton className={catName === "All" ? 'rounded-full px-4 py-2  border-1 text-white cursor-pointer  bg-black' : 'rounded-full px-4 py-2  border-1  cursor-pointer   border-gray-400'} onClick={() => setcatName("All")}   >

                    All



                </CatButton>

                {


                    cat.map((e) => {


                        return (

                            <>


                                <CatButton className={catName === `${e.category}` ? 'rounded-full px-4 py-2  border-1 text-white cursor-pointer  bg-black' : 'rounded-full px-4 py-2  border-1  cursor-pointer   border-gray-400'} onClick={() => {


                                    setcatName(e.category),

                                        setoffset(0)



                                }} >


                                    {e.category}


                                </CatButton>

                            </>

                        )

                    })




                }


            </div>








            {



                load


                    ?


                    < div className='flex justify-center items-center h-screen' >

                        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                    </div >

                    :


                    <div className='grid   lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1   gap-y-24 justify-center md:justify-between gap-x-14 mt-16'>


                        {

                            blog?.map((e) => {

                                return (
                                    <div key={e._id} className='rounded-2xl overflow-hidden group  transition-all duration-300  cursor-pointer'>




                                        <div className='w-full overflow-hidden relative' style={{ maxHeight: "250px", height: "250px" }}>

                                            <div className='absolute top-[10px] left-[10px] bg-black px-3 rounded-full py-2 font-bold text-white '>{e.category.category}</div>

                                            <img src={e.img} alt="blog img" className='object-cover w-full h-full object-top' />

                                        </div>


                                        <div className='pt-3'>
                                            <h1 className='font-bold  group-hover:text-black  text-gray-600 text-2xl mt-6 font-bolder'>{e.title} </h1>

                                            <div className='text-end text-slate-400 text-sm mt-3'>By , {e.userid.name}</div>

                                            <div className='bg-black text-center text-white rounded-full px-4 py-3 cursor-pointer  inline-flex  transition-all duration-200 mt-3'>See More</div>


                                        </div>

                                    </div>

                                )


                            })


                        }




                    </div>

            }










            <div className='flex justify-center mt-14'>

                <PaginationCom limit={limit} totalblog={totalblogs} setpage={(page) => setpage(page)} />



            </div>


        </Container >
    )
}

export default Blog

const Container = styled.div`


.content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    height: 70px;
}

`

const CatButton = styled.div`




&.active{
background-color: black;
color: white;

}



`