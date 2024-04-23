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
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useSelector } from "react-redux";

const Login = () => {
  const [load, setLoad] = useState(false);
  const { userLogin } = useSelector((state) => state.currentUser);
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

    setLoad(true);

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
        setLoad(true);

        dispatch(setuser(data.user));

        toast.success(data.message);

        Navigator("/");
      } else {
        setLoad(false);

        toast.error(data.message);
      }
    } catch (e) {
      setLoad(false);

      toast.error(e);
    }
  };

  return (
    <div>
      {userLogin === true ? null : (
        <Link
          to={"/"}
          className="mt-9 ms-9 flex gap-4 items-center cursor-pointer"
        >
          <ArrowBackIosOutlinedIcon /> <div>Home</div>
        </Link>
      )}

      <Container>
        {userLogin === true ? null : (
          <div className="text-red-600 font-bold">
            First Login to create blog
          </div>
        )}

        <form onSubmit={submitUser}>
          <div className="text-4xl font-semibold mt-9">Login In</div>

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

            <div className="flex gap-2 items-center mt-4 justify-end ">
              <Link to={"/forgetPassword"}>
                <div
                  className="text-end"
                  style={{ textDecoration: "underline" }}
                >
                  Forget Password ?
                </div>
              </Link>

              <div className="font-bold">Or</div>

              <Link to={"/getVerifyLinkPage"}>
                <div
                  className=" text-end"
                  style={{ textDecoration: "underline" }}
                >
                  Get New Verify link
                </div>
              </Link>
            </div>
          </div>
        </form>
      </Container>
    </div>
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
