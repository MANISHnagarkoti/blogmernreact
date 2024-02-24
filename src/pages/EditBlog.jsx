import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useLayoutEffect } from "react";

const EditBlog = () => {
    const [getcategory, setgetcategory] = useState([]);

    const { editBlogId } = useSelector((state) => state.currentUser);

    const [blogId, setblogId] = useState();

    const [des, setdes] = useState("");

    const [userinfo, setuserinfo] = useState({
        title: "",
        description: "",
        img: "",
        categoryId: "",
        editImg: ""
    });

    const setUserFunc = (e) => {
        if (e.target.name === "editImg") {
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
    const submitEditBlog = async () => {
        if (
            userinfo.title === "" ||
            des === "" ||
            userinfo.editImg === ""
        ) {
            alert("Please Fill all info");
            return;
        }


        const formData = new FormData();
        formData.append("title", userinfo.title);
        formData.append("description", des);
        formData.append("photo", userinfo.editImg);
        formData.append("category", userinfo.categoryId);
        formData.append("id", editBlogId);

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}blogs/updateBlog`, formData);

            if (data.sucess === true) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (e) {
            console.log(e);
        }


    };

    const getEditBlogInfo = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}blogs/getEditedBlogInfo/${editBlogId}`
        );
        console.log(data);

        setuserinfo({
            ...userinfo,
            title: data.getblog.title,
            img: data.getblog.imgUrl,
            categoryId: data.getblog.category,
        });

        setdes(data.getblog.description);

        setblogId(data.getblog._id);
    };

    useLayoutEffect(() => {
        getEditBlogInfo();
    }, []);

    useEffect(() => {
        const getAllcategory = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}categorie/allcategories`,
                { withCredentials: true }
            );

            setgetcategory(data.categories);
        };

        getAllcategory();
    }, []);

    console.log(userinfo)

    return (
        <Container>
            <div className="login-con p-0">
                <div className="row pb-3 h1 text-center">Create Blog</div>

                <div
                    style={{ border: "1px solid #5e5e5e4b" }}
                    className="row p-3 font-bold"
                >
                    Blog Details
                </div>

                <div style={{ border: "1px solid #5e5e5e4b" }} className="py-4 row ">
                    <div>
                        <div>Title :</div>
                        <input
                            type="text"
                            onChange={setUserFunc}
                            value={userinfo.title}
                            placeholder="Name"
                            name="title"
                        />
                    </div>

                    <div className="mt-3">
                        <div>Description :</div>

                        <div className="border mt-3 rounded-md border-black">
                            <ReactQuill
                                theme="bubble"
                                value={des}
                                onChange={(v) => setdes(v)}
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, false] }],
                                        ["bold", "italic", "underline"],
                                        ["image", "code-block"],
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Category:</div>

                        <select
                            className="form-select mt-4 cursor-pointer"
                            aria-label="Default select example"
                            name="categoryId"
                            onChange={setUserFunc}
                        >
                            <option disabled selected hidden>
                                Choose Category...
                            </option>
                            {getcategory?.map((e) => {
                                return (
                                    <option className="p-5  rounded-lg" key={e._id} value={e._id}>
                                        {e.category}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div
                    className="d-flex justify-content-end row py-3"
                    style={{ border: "1px solid #5e5e5e4b" }}
                >

                    <div className="mt-4">
                        <div className="text-xl">Current cover Img</div>
                        <div className="h-[100px] w-full border border-gray-300 rounded-xl p-2 mt-2">
                            <img
                                src={userinfo.img}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <div class="flex items-center justify-center w-full">
                            <label
                                for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
                            >
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click to upload</span>
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    onChange={setUserFunc}
                                    name="editImg"
                                    class="hidden"
                                />
                            </label>
                        </div>
                    </div>


                </div>

                <div
                    className="d-flex column-gap-3  px-2 py-4 row  justify-content-center"
                    style={{ border: "1px solid #5e5e5e4b" }}
                >
                    <button
                        onClick={submitEditBlog}
                        className="cursor-pointer text-center py-2 px-4 rounded-5 mt-4 text-white"
                        type="submit"
                        style={{ background: "#fa693e" }}
                    >
                        Edit Blog
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default EditBlog;

const Container = styled.div`
  padding: 30px;
  margin-bottom: 100px;

  .login-con {
    max-width: 1200px;
    margin: auto;

    input {
      margin-top: 10px;
      width: 100%;
      height: 35px;
      padding: 0px 10px;
      font-size: 13px;
    }
  }
`;
