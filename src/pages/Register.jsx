import axios from 'axios'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Register = () => {


    const [userinfo, setuserinfo] = useState({

        name: "",
        password: "",
        email: ""
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

        if (userinfo.name === "" || userinfo.email === "" || userinfo.password === "") {



            alert("Please Fill all info")
            
            return


        }

        if (!userinfo.email.includes("@") || !userinfo.email.includes("@gmail.com")) {


            alert("Please Fill Email Correctly")

            return
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}user/register`, {

                name: userinfo.name,
                email: userinfo.email,
                password: userinfo.password


            })


            if (data.sucess === true) {

                alert(data.message)

                Navigator("/login")



            } else {

                alert(data.message)


            }




        } catch (e) {

            console.log(e)

        }




    }


    return (
        <Container>
            <form onSubmit={submitUser}>

                <div className='login-con p-0'>

                    <div className='row p-3 h1 text-center' >
                        Register

                    </div>

                    <div style={{ border: "1px solid #5e5e5e4b" }} className='row p-3 font-bold' >
                        Your personal details

                    </div>

                    <div style={{ border: "1px solid #5e5e5e4b" }} className='py-4 row '>

                        <div >

                            <div>Fisrt Name :</div>
                            <input type="text" onChange={setUserFunc} value={userinfo.name} name='name' placeholder='Name' />

                        </div>




                        <div className='mt-3'>

                            <div>Email :</div>

                            <input type="text" onChange={setUserFunc} value={userinfo.email} name='email' placeholder='E-mail' />

                        </div>

                    </div>

                    <div className='d-flex justify-content-end row py-3' style={{ border: "1px solid #5e5e5e4b" }}>

                        <h3 className='font-bold'>Your Password</h3>

                        <div className='mt-10'>

                            <div>Password :</div>
                            <input type="text" onChange={setUserFunc} value={userinfo.password} name='password' placeholder='Password' />

                        </div>
                    </div>




                    <div className='d-flex column-gap-3  px-2 py-4 row  justify-content-center' style={{ border: "1px solid #5e5e5e4b" }}>



                        <button className='cursor-pointer text-center py-2 px-4 rounded-5 mt-4 text-white' type="submit" style={{ background: "#fa693e" }}>
                            Submit Now
                        </button>

                    </div>






                </div>


            </form>


        </Container>


    )
}

export default Register

const Container = styled.div`
padding: 30px;
margin-top: 140px;
margin-bottom: 100px;

.login-con{

max-width: 600px;
margin: auto;

input{
margin-top: 10px;
width:100%;
height: 35px;
padding: 0px 10px;
}

}


`