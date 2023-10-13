import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


const CreateBlog = () => {



    const [getcategory, setgetcategory] = useState([])

    const { userData } = useSelector((state) => state.currentUser)





    const [userinfo, setuserinfo] = useState({

        title: "",
        description: "",
        img: "",
        categoryId: ""
    })







    const Navigator = useNavigate()



    const setUserFunc = (e) => {




        setuserinfo(

            {

                ...userinfo, [e.target.name]: e.target.value


            }

        )






    }




    const submitUser = async (e) => {

        e.preventDefault()

        if (userinfo.title === "" || userinfo.description === "" || userinfo.img === "") {


            alert("Please Fill all info")
            return

        }


        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}blogs/createBlog`, {

                title: userinfo.title,
                description: userinfo.description,
                img: userinfo.img,
                userid: userData.userid,
                category: userinfo.categoryId
            })


            if (data.sucess === true) {

                alert(data.message)

                // Navigator("/")



            } else {

                alert(data.message)


            }




        } catch (e) {

            console.log(e)

        }




    }




    const getAllcategory = async () => {

        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}categorie/allcategories`, { withCredentials: true })


        setgetcategory(data.categories)


    }

    useEffect(() => {


        getAllcategory()



    }, [])





    return (
        <Container>
            <form onSubmit={submitUser}>

                <div className='login-con p-0'>

                    <div className='row p-3 h1 text-center' >
                        Create Blog

                    </div>

                    <div style={{ border: "1px solid #5e5e5e4b" }} className='row p-3 font-bold' >
                        Blog Details


                    </div>

                    <div style={{ border: "1px solid #5e5e5e4b" }} className='py-4 row '>

                        <div >

                            <div>Title :</div>
                            <input type="text" onChange={setUserFunc} value={userinfo.title} name='title' placeholder='Name' />

                        </div>




                        <div className='mt-3'>

                            <div>Description :</div>
                            {/* 
                            <JoditEditor
                                ref={editor}
                                onChange={newContent => setuserinfo({ ...userinfo, description: newContent })}
                            /> */}

                            {/* <ReactQuill theme="snow" value={quillvalue} onChange={() => setuserinfo({ ...userinfo, description: quillvalue })} /> */}
                            <div className='border mt-3 rounded-md border-black' >

                                <ReactQuill
                                    theme="bubble"
                                    value={userinfo.description}
                                    onChange={(value) => setuserinfo({ ...userinfo, description: value })}
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ['bold', 'italic', 'underline'],
                                            ['image', 'code-block']
                                        ]
                                    }}


                                />

                            </div>

                        </div>


                        <div className='mt-4'>

                            <div  >
                                Category:
                            </div>

                            <select className="form-select mt-4 cursor-pointer" aria-label="Default select example" onChange={setUserFunc} name="categoryId" >

                                <option value="" disabled selected hidden>Choose Category...</option>
                                {


                                    getcategory?.map((e) => {

                                        return <option className='p-5  rounded-lg' key={e._id} value={e._id}>{e.category}</option>


                                    })


                                }


                            </select>

                        </div>

                    </div>

                    <div className='d-flex justify-content-end row py-3' style={{ border: "1px solid #5e5e5e4b" }}>

                        <h3 className='font-bold'>Img of Your Blog</h3>

                        <div className='mt-10'>

                            <div>Img:</div>
                            <input type="text" onChange={setUserFunc} value={userinfo.img} name='img' placeholder='Img URL' />

                        </div>
                    </div>




                    <div className='d-flex column-gap-3  px-2 py-4 row  justify-content-center' style={{ border: "1px solid #5e5e5e4b" }}>



                        <button className='cursor-pointer text-center py-2 px-4 rounded-5 mt-4 text-white' type="submit" style={{ background: "#fa693e" }}>
                            Post Blog
                        </button>

                    </div>






                </div>


            </form>


        </Container>


    )
}

export default CreateBlog

const Container = styled.div`
padding: 30px;
margin-top: 140px;
margin-bottom: 100px;

.login-con{

max-width: 900px;
margin: auto;

input{
margin-top: 10px;
width:100%;
height: 35px;
padding: 0px 10px;
}

}


`