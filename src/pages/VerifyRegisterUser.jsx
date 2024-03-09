import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const VerifyRegisterUser = () => {


    let { userId, token } = useParams();

    const [verify, setVerify] = useState(false)

    const verifyCheck = async (e) => {
        e.preventDefault();

        setLoad(true)

        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}user/verifyRegisterUser/${userId}/verify/${token}`,
            );

            if (data.sucess === true) {

                setVerify(true)
                toast(data.message);

            } else {

                setVerify(false)

                alert(data.message);
            }
        } catch (e) {

            setVerify(false)
            alert(e);
        }
    };

    useEffect(() => {

        verifyCheck()

    }, [])


    return (
        <Container>


            {

                verify ?

                    <div>
                        <div>Verified</div>

                        <Link to={"/login"}>Login in</Link>
                    </div>
                    :
                    <div>Not verify</div>



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
