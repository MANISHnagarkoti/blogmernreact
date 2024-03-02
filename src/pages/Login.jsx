import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuser } from "../redux/currentuser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoadingBtn from "../component/LoadingBtn";

const Login = () => {

  const [load, setLoad] = useState(false)

  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
  });

  const Navigator = useNavigate();
  const dispatch = useDispatch();

  const setUserFunc = (e) => {
    setuserinfo({
      ...userinfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();

    if (userinfo.email === "" || userinfo.password === "") {
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
        `${import.meta.env.VITE_BACKEND_URL}user/login`,
        {
          email: userinfo.email,
          password: userinfo.password,
        },
        { withCredentials: true, credentials: "include" }
      );

      if (data.sucess === true) {

        setLoad(true)

        dispatch(setuser(data.user));

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
      <form onSubmit={submitUser}>

        <div className="text-4xl font-semibold" >
          Login In
        </div>

        <div className="space-y-4 mt-4">
          <div className="w-full">
            <div>E-mail</div>
            <input
              type="text"
              onChange={setUserFunc}
              value={userinfo.email}
              name="email"
              placeholder="E-mail"
              className="border border-gray-200"
            />
          </div>

          <div className="w-full">
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



        <div className="w-full">




          <LoadingBtn name={"Login"} load={load} />

          <div
            className="mt-4 text-end"
            style={{ textDecoration: "underline" }}
          >
            Forget Password ?
          </div>

        </div>



      </form>
    </Container>
  );
};

export default Login;

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
