import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuser } from "../redux/currentuser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
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
        dispatch(setuser(data.user));

        toast(data.message);

        Navigator("/");
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <form onSubmit={submitUser}>
        <div className="login-con p-0">
          <div style={{ border: "1px solid #5e5e5e4b" }} className="row p-3 h3">
            Login In
          </div>

          <div
            style={{ border: "1px solid #5e5e5e4b" }}
            className="py-4 row  row-gap-4"
          >
            <div className="col-md-6">
              <div>E-mail :</div>
              <input
                type="text"
                onChange={setUserFunc}
                value={userinfo.email}
                name="email"
                placeholder="E-mail"
              />
            </div>

            <div className="col-md-6">
              <div>Password :</div>
              <input
                type="text"
                onChange={setUserFunc}
                value={userinfo.password}
                name="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div
            className="d-flex justify-content-end row py-3"
            style={{ border: "1px solid #5e5e5e4b" }}
          >
            <div className="d-flex column-gap-3 align-items-center">
              <div
                className="text-danger "
                style={{ textDecoration: "underline" }}
              >
                Forget Password ?
              </div>

              <button
                type="submit"
                className="text-center cursor-pointer py-2 px-4 rounded-5 text-white"
                style={{ background: "#fa693e" }}
              >
                LogIn
              </button>
            </div>
          </div>

          <div className="d-flex column-gap-3 mt-10 px-2 py-4 row  justify-content-center" >
            <div className="font-bold">If you dont have account</div>

            <Link to={"/Register"}>
              <div
                className="text-center py-2 px-4 rounded-5 mt-4 text-white"
                style={{ background: "#fa693e" }}
              >
                Register
              </div>
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 30px;
  margin-top: 140px;
  margin-bottom: 100px;

  .login-con {
    max-width: 600px;
    margin: auto;

    input {
      margin-top: 10px;
      width: 100%;
      height: 35px;
      padding: 0px 10px;
    }
  }
`;
