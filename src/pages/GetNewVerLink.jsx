

import React, { useState } from "react";
import LoadingBtn from "../component/LoadingBtn";
import { styled } from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetNewVerLink = () => {
    const [load, setLoad] = useState(false);

    const [email, setEmail] = useState("");

    const Navigator = useNavigate();

    const submitEmail = async (e) => {
        e.preventDefault();

        if (email === "") {
            alert("Please Fill all info");
            return;
        }

        if (
            !email.includes("@") ||
            !email.includes("@gmail.com")
        ) {
            alert("Please Fill Email Correctly");
            return;
        }

        setLoad(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/getVerifyLink`,
                {
                    email
                },
            );

            if (data.sucess === true) {
                setLoad(true);

                toast(data.message);

                Navigator("/");
            } else {
                setLoad(false);

                toast.error(data.message);
            }
        } catch (e) {
            setLoad(false);

            console.log(e);
        }
    };

    return (
        <Container>
            <form onSubmit={submitEmail}>
                <div className="text-4xl font-semibold">Type Your Email</div>

                <div className="space-y-4 mt-4">
                    <div className="w-full">
                        <div>E-mail</div>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            placeholder="E-mail"
                            className="border border-gray-200"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <LoadingBtn name={"Get Link"} load={load} />
                </div>
            </form>
        </Container>
    );
};

export default GetNewVerLink;

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
