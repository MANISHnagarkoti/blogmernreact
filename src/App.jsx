import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
// import './App.css'
import React, { Suspense } from "react";
import Globle from "../Globle";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import PrivateWrapper from "./private route/PrivateWrapper";

import { useDispatch } from "react-redux";
import { setuser } from "./redux/currentuser";
import { removeuser } from "./redux/currentuser";
import axios from "axios";
import SingleBlog from "./pages/SingleBlog";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/loader css/loader.css";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import OurBlogs from "./pages/OurBlogs";
import CreateBlog from "./component/CreateBlog";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import ScrollToTop from "./component/Scrollup";
import PageLoader from "./component/PageLoader";
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyRegisterUser from "./pages/VerifyRegisterUser";
import LoginWrapper from "./component/LoginWrapper";
import GetNewVerLink from "./pages/GetNewVerLink";

function App() {
  const [load, lload] = useState(true);

  const dispatch = useDispatch();

  const initialAuth = async () => {
    try {
      lload(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}user/loginchecker`,
        { withCredentials: true }
      );
      console.log(data);

      if (data.sucess === true) {
        dispatch(setuser(data.user));

        lload(false);
      } else {
        dispatch(removeuser());

        lload(false);
      }
    } catch (e) {
      dispatch(removeuser());

      lload(false);
    }
  };

  useEffect(() => {
    initialAuth();
  }, []);

  if (load) {
    return (
      <div className="flex  justify-center  items-center h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Globle />

      <Router>
        <ScrollToTop />
        <Navbar />


        <Routes>
          <Route exact path="/" element={<Home />} />


          <Route element={<PrivateWrapper />}>
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/ourBlog" element={<OurBlogs />} />
            <Route path="/singleBlog/:id" element={<SingleBlog />} />
            <Route path="/editBlog" element={<EditBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route element={<LoginWrapper />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:userId/:token" element={<UpdatePassword />} />
          <Route path="/verifyRegisterUser/:userId/verify/:token" element={<VerifyRegisterUser />} />
          
          <Route path="/getVerifyLinkPage" element={<GetNewVerLink />} />
        </Routes>


      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
