import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingBtn from "./LoadingBtn";

const CreateBlog = () => {
    const [getcategory, setgetcategory] = useState([]);
    const [load, setLoad] = useState(false)

    const { userData } = useSelector((state) => state.currentUser);

    const [userinfo, setuserinfo] = useState({
        title: "",
        description: "",
        img: "",
        categoryId: "",
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
            userinfo.title === "" ||
            userinfo.description === "" ||
            userinfo.img === ""
        ) {
            alert("Please Fill all info");
            return;
        }

        const formData = new FormData();
        formData.append("title", userinfo.title);
        formData.append("description", userinfo.description);
        formData.append("photo", userinfo.img);
        formData.append("category", userinfo.categoryId);
        formData.append("userid", userData.userid);

        setLoad(true)

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}blogs/createBlog`,
                formData
            );

            if (data.sucess === true) {

                setLoad(false)
                alert(data.message);

                Navigator("/");
            } else {
                alert(data.message);
                setLoad(false)
            }
        } catch (e) {
            console.log(e);
            setLoad(false)
        }
    };

    const getAllcategory = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}categorie/allcategories`,
            { withCredentials: true }
        );

        setgetcategory(data.categories);
    };

    useEffect(() => {
        getAllcategory();
    }, []);

    console.log(userinfo)
    return (
        <Container>
            <form onSubmit={submitUser}>
                <div className="login-con p-0">
                    <div className="row h1 text-center pb-2">Create Blog</div>

                    <div
                        className="py-4 row space-y-9 "
                    >
                        <div>
                            <div className="text-xl">Cover Title :</div>
                            <input
                                type="text"
                                value={userinfo.title}
                                name="title"
                                placeholder="Name"
                                onChange={setUserFunc}
                            />
                        </div>

                        <div>
                            <div className="text-xl">Description :</div>
                            {/* 
                            <JoditEditor
                                ref={editor}
                                onChange={newContent => setuserinfo({ ...userinfo, description: newContent })}
                            /> */}

                            {/* <ReactQuill theme="snow" value={quillvalue} onChange={() => setuserinfo({ ...userinfo, description: quillvalue })} /> */}
                            <div className="border mt-3 rounded-md border-black">
                                <ReactQuill
                                    theme="bubble"
                                    value={userinfo.description}
                                    onChange={(value) =>
                                        setuserinfo({ ...userinfo, description: value })
                                    }
                                    className="min-h-[300px]"
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

                        <div>
                            <div className="text-xl">Category:</div>

                            <select
                                className="form-select mt-4 cursor-pointer"
                                aria-label="Default select example"
                                onChange={setUserFunc}
                                name="categoryId"
                            >
                                <option value="" disabled selected hidden>
                                    Choose Category...
                                </option>
                                {getcategory?.map((e) => {
                                    return (
                                        <option
                                            className="p-5  rounded-lg"
                                            key={e._id}
                                            value={e._id}
                                        >
                                            {e.category}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div
                        className="d-flex justify-content-end row py-3"
                    >
                        <div className="text-xl">Cover img of blog:</div>

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
                                        name="img"
                                        class="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {userinfo.img ? (
                            <div className="mt-4">
                                <div className="text-xl">Img preview</div>
                                <div className="h-[100px] w-full border border-gray-300 rounded-xl p-2 mt-2">
                                    <img
                                        src={URL.createObjectURL(userinfo.img)}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div
                        className="d-flex column-gap-3  px-2 py-4 row  justify-content-center"
                    >



                        <LoadingBtn load={load} name={"Post"} />

                    </div>
                </div>
            </form>
        </Container>
    );
};

export default CreateBlog;

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
