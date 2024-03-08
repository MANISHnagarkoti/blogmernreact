import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoadingBtn from "../component/LoadingBtn";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {

    const [load, setLoad] = useState(false)

    let { userId, token } = useParams();

    const [userinfo, setuserinfo] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const Navigator = useNavigate();

    const setUserFunc = (e) => {
        setuserinfo({
            ...userinfo,
            [e.target.name]: e.target.value,
        });
    };

    const submitPassword = async (e) => {
        e.preventDefault();

        if (userinfo.newPassword === "" || userinfo.confirmPassword === "") {
            alert("Please Fill all info");
            return;
        }

        if (userinfo.newPassword !== userinfo.confirmPassword) {
            alert("please check your confirm password");
            return;
        }

        setLoad(true)

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/resetPassword/${userId}/${token}`,
                {
                    newPassword: userinfo.confirmPassword,
                },
            );

            if (data.sucess === true) {

                setLoad(true)

                toast(data.message);

                Navigator("/");

            } else {

                setLoad(false)

                alert(data.message);
            }
        } catch (e) {

            setLoad(false)

            console.log(e);
        }
    };


    return (
        <Container>
            <form onSubmit={submitPassword}>

                <div className="text-4xl font-semibold" >
                    Reset your password
                </div>

                <div className="space-y-4 mt-4">
                    <div className="w-full">
                        <div>New Password</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.newPassword}
                            name="newPassword"

                            className="border border-gray-200"
                        />
                    </div>

                    <div className="w-full">
                        <div>Confirm Password</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.confirmPassword}
                            name="confirmPassword"

                            className="border border-gray-200"
                        />
                    </div>
                </div>



                <div className="w-full">
                    <LoadingBtn name={"Save password"} load={load} />
                </div>



            </form>
        </Container>
    );
};

export default UpdatePassword;

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
