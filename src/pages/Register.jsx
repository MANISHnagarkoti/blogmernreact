import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import LoadingBtn from "../component/LoadingBtn";
import { Link } from "react-router-dom";

const Register = () => {

    const [load, setLoad] = useState(false)
    const [userinfo, setuserinfo] = useState({
        name: "",
        password: "",
        email: "",
    });

    const Navigator = useNavigate();

    const setUserFunc = (e) => {
        setuserinfo({
            ...userinfo,
            [e.target.name]: e.target.value,
        });
    };

    const submitUser = async (e) => {
        e.preventDefault();

        if (
            userinfo.name === "" ||
            userinfo.email === "" ||
            userinfo.password === ""
        ) {
            alert("Please Fill all info");

            return;
        }

        if (
            !userinfo.email.includes("@") ||
            !userinfo.email.includes("@gmail.com")
        ) {
            alert("Please Fill Email Correctly");

            return;
        }

        setLoad(true)

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/register`,
                {
                    name: userinfo.name,
                    email: userinfo.email,
                    password: userinfo.password,
                }
            );

            if (data.sucess === true) {

                setLoad(false)

                alert(data.message);

                Navigator("/login");
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
            <form onSubmit={submitUser}>

                <div className="text-6xl text-center">Create Account</div>

                <div className="space-y-4 mt-9">
                    <div>
                        <div>Fisrt Name</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.name}
                            name="name"
                            placeholder="Name"
                            className="border border-gray-200"
                        />
                    </div>

                    <div>
                        <div>Email</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.email}
                            name="email"
                            placeholder="E-mail"
                            className="border border-gray-200"
                        />
                    </div>


                    <div>
                        <div>Password</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.password}
                            name="password"
                            placeholder="Password"
                            className="border border-gray-200"
                        />
                    </div>
                </div>



                <div className="d-flex column-gap-3  px-2 py-4 row  justify-content-center">
                    <LoadingBtn load={load} name={"Submit"} />
                </div>

                <div className="text-center">
                    <div>Already have account <Link to={"/login"} className="text-colorOne font-bold" >Login here</Link> </div>
                </div>

            </form>
        </Container>
    );
};

export default Register;

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
