import React from 'react'
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginWrapper = () => {

    const { userLogin } = useSelector((state) => state.currentUser);

    return <>{userLogin ? <Navigate to="/" /> : <Outlet />}</>;

}

export default LoginWrapper


