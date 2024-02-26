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
        img: ""
    });

    const Navigator = useNavigate();




    const setUserFunc = (e) => {
        if (e.target.name === "img") {
            console.log(e.target.files[0]);

            setuserinfo({
                ...userinfo,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setuserinfo({
                ...userinfo,
                [e.target.name]: e.target.value,
            });
        }
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

        const formData = new FormData();
        formData.append("name", userinfo.name);
        formData.append("email", userinfo.email);
        formData.append("photo", userinfo.img);
        formData.append("password", userinfo.password);




        setLoad(true)

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/register`,
                formData
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

    console.log(userinfo)

    return (
        <Container>
            <form onSubmit={submitUser}>

                <div className="text-4xl font-semibold text-center">Create Account</div>

                <div className="space-y-4 mt-9">


                    {userinfo.img ? (
                        <div className="mt-4">
                            <div className="text-xl">Profile Pic</div>
                            <div className="h-[100px] w-[100px] m-auto border-2 border-colorOne rounded-full  p-1 mt-2 ">
                                <img
                                    src={URL.createObjectURL(userinfo.img)}
                                    className="object-cover w-full h-full rounded-full overflow-hidden"
                                />
                            </div>
                        </div>
                    ) : null}




                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col rounded-lg py-2 items-center justify-center w-full  border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
                    >
                        <div class="flex flex-col items-center justify-center">
                            <svg
                                class="w-6 h-6 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">Click to upload Profile Pic</span>
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>

                        <input
                            id="dropzone-file"
                            type="file"
                            onChange={setUserFunc}
                            name="img"
                            class="hidden"
                        />
                    </label>






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
