import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import PaginationCom from "./PaginationCom";
import { Link } from "react-router-dom";
import NoFound from "./NoFound";

const Blog = () => {
    const [blog, setblog] = useState([]);

    const [cat, setcat] = useState([]);

    const [catName, setcatName] = useState("All");

    const [text, setText] = useState("");

    const [page, setpage] = useState(1);

    const [limit, setlimit] = useState("");

    const [totalblogs, settotalblogs] = useState(null);

    const [load, setload] = useState(true);


    const getBlogs = async () => {


        setload(true);

        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}blogs/blogByCategory?category=${catName}&page=${page}&search=${text}`
        );

        setblog(data.allblogs);

        settotalblogs(data.totalblogs);

        setlimit(data.limit);

        setload(false);

    };

    const getCat = async () => {

        const { data: category } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}categorie/allcategories`
        );

        setcat(category.categories);
    };

    useEffect(() => {
        getCat();
    }, []);

    useEffect(() => {
        getBlogs();
    }, [catName, page]);


    const handleKeyDown = (event) => {

        setpage(1)

        if (event.key === 'Enter') {
            getBlogs()
        }
    }


    const removeInputTextFilter = async () => {

        setText("")

        setload(true);

        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}blogs/blogByCategory?category=${catName}&page=${page}&search=`
        );

        setblog(data.allblogs);

        settotalblogs(data.totalblogs);

        setlimit(data.limit);

        setload(false);
    }

    return (
        <Container className="mt-24 container">


            <div className="flex gap-4 mt-8 items-center m-auto outline-none rounded-full border-gray-200 border py-3 px-8 max-w-[600px]">
                <div className="text-gray-500 text-xl flex items-center">
                    <ion-icon name="search-outline" ></ion-icon>
                </div>
                <input
                    type="text"
                    name=""
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search by title of blog"
                    className="outline-none bg-transparent w-full"
                    id=""
                    onKeyDown={handleKeyDown}
                    value={text}
                />

                <div className={text.length > 0 ? " block" : "hidden"} onClick={removeInputTextFilter}>
                    <div className="text-gray-500 text-xl flex items-center cursor-pointer">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="container flex gap-x-4 flex-wrap mt-12 justify-center gap-y-5 text-sm font-semibold">
                <CatButton
                    className={
                        catName === "All"
                            ? "rounded-full px-4 py-2 cursor-pointer bg-gray-200"
                            : "rounded-full px-4 py-2  cursor-pointer  "
                    }
                    onClick={() => setcatName("All")}
                >
                    All
                </CatButton>

                {cat.map((e) => {
                    return (
                        <>
                            <CatButton
                                className={
                                    catName === `${e.category}`
                                        ? "rounded-full px-4 py-2 cursor-pointer bg-gray-200"
                                        : "rounded-full px-4 py-2  cursor-pointer  "
                                }
                                onClick={() => {
                                    setcatName(e.category), setpage(1);
                                }}
                            >
                                {e.category}
                            </CatButton>
                        </>
                    );
                })}
            </div>

            {

                load ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <div class="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : blog.length == 0 ? (

                    <NoFound />


                ) : (

                    <div>
                        <div className="grid   lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1   gap-y-9 justify-center md:justify-between gap-x-9 mt-16">
                            {blog?.map((e) => {
                                return (
                                    <Link to={`/singleBlog/${e._id}`}>
                                        <div
                                            key={e._id}
                                            className="rounded-2xl overflow-hidden group  transition-all duration-300  cursor-pointer p-4 bg-gray-100/20 box-shadow-css "
                                        >
                                            <div
                                                className="w-full overflow-hidden relative rounded-2xl"
                                                style={{ maxHeight: "200px", height: "250px" }}
                                            >
                                                <div className="absolute top-[10px] left-[10px] bg-gray-100 border-2 text-xs border-gray-300 px-3  font-semibold rounded-full py-2 text-black ">
                                                    {e.category.category}
                                                </div>

                                                <img
                                                    src={e.imgUrl}
                                                    alt="blog img"
                                                    className="object-cover w-full h-full object-top"
                                                />
                                            </div>

                                            <div className="pt-3">
                                                <h1 className="font-semibold  group-hover:text-black  text-gray-600 text-xl  font-bolder">
                                                    {e.title}{" "}
                                                </h1>

                                                <div className="text-end text-slate-400 text-sm mt-3">
                                                    By , {e.userid.name}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>


                        <div className="flex justify-center mt-14">
                            <PaginationCom
                                limit={limit}
                                totalblog={totalblogs}
                                setpage={setpage}
                                currentPage={page}
                            />
                        </div>

                    </div>


                )

            }



























        </Container>
    );
};

export default Blog;

const Container = styled.div`
  .content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 70px;
  }
`;

const CatButton = styled.div`
  &.active {
    background-color: black;
    color: white;
  }
`;
