import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import PageLoader from "../component/PageLoader";


const VerifyRegisterUser = () => {



    let { userId, token } = useParams();

    const [email, setEmail] = useState("")

    const [verify, setVerify] = useState(false)

    const [load, setLoad] = useState(true)

    const verifyCheck = async () => {

        setLoad(true)

        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}user/verifyRegisterUser/${userId}/verify/${token}`,
            );

            if (data.sucess === true) {

                setVerify(true)
                setEmail(data.email)
                toast(data.message);
                setLoad(false)

            } else {

                setVerify(false)
                setLoad(false)
            }
        } catch (e) {

            setVerify(false)
            setLoad(false)
            alert(e);
        }
    };

    useEffect(() => {

        verifyCheck()

    }, [])



    if (load) {
        return (
            <div className="flex  justify-center  items-center h-screen">
                <PageLoader />
            </div>
        );
    }


    return (
        <Container>


            {
                verify ?

                    <div className="flex justify-center">
                        <div className="space-y-6 flex flex-col items-center">
                            <img src="/verify.png" className="w-[200px]" alt="" />

                            <div className="text-center text-2xl text-gray-600">{email} Verified!!!</div>

                            <Link to={"/login"} className="bg-colorOne text-lg inline-flex py-2 px-3 text-white rounded-lg">Now Login in</Link>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center">
                        <div className="space-y-6 flex flex-col items-center">

                            <div className="text-center text-6xl text-red-500 font-bold">Not Verified</div>

                            <div className="text-center text-2xl text-gray-600">Invalid Link</div>

                            <Link to={"/"} className="bg-colorOne text-lg inline-flex py-2 px-3 text-white rounded-lg">Home</Link>
                        </div>
                    </div>
            }


        </Container>
    );
};

export default VerifyRegisterUser;

const Container = styled.div`
  padding: 30px;
    max-width: 600px;
    margin: auto;

    input {
      margin-top: 5px;
      width: 100%;
      height: 35px;
      padding: 10px;
      border-radius: 5px;
    }
  
`;
