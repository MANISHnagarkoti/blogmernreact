import React, { useEffect, useState } from "react";
import { isStyledComponent, styled } from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import PaginationCom from "../component/PaginationCom";
import ToogleMenu from "../component/ToogleMenu";
import BasicSelect from "../component/BasicSelect"



const OurBlogs = () => {
  const { userData } = useSelector((state) => state.currentUser);

  const [blog, setblog] = useState([]);

  const [load, lload] = useState(true);

  const [page, setpage] = useState(1);

  const [limit, setlimit] = useState("");

  const [totalblogs, settotalblogs] = useState(null);

  const [sortOne, setSortOne] = useState("ascending")

  const sortList = ["ascending", "descending", "popular", "newest"]


  const getBlogs = async () => {
    try {
      lload(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}blogs/currentUserBlogs?userid=${userData.userid}&page=${page}&sortby=${sortOne}`
      );

      setblog(data.allblogs.blogs);

      settotalblogs(data.totalblog);

      setlimit(data.limit);

      lload(false);
    } catch (error) {
      lload(false);

      if (error.response.status === 404) {
      }
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}blogs/deleteBlog/${id}`
      );

      getBlogs();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page , sortOne]);





  return (
    <>
      {load ? (
        <div className="flex justify-center items-center h-screen">
          <div className="lds-roller">
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
      ) : (
        <div className="mt-32 mx-auto container">




          <div className=" mx-w-[400px]">
            <BasicSelect list={sortList} heading={"Sortby"} setSort={setSortOne} value={sortOne} />
          </div>


          <div className=" grid md:grid-cols-2 gap-y-14 gap-x-16  mt-16">
            {blog.map((e) => {
              return (
                <div
                  key={e._id}
                  className="rounded-3xl overflow-hidden md:grid grid-cols-2 space-y-5 gap-x-6 w-full bg-gray-200/25 "
                >
                  <div className=" h-72 overflow-hidden group ">
                    <img
                      src={e.imgUrl}
                      alt="no img"
                      className="group-hover:scale-105  transition-all duration-300   w-full  h-full  object-cover object-top"
                    />
                  </div>

                  <div className="w-full p-4">
                    <div className="flex justify-between">
                      <div className="text-slate-700  font font-extrabold text-md">
                        {new Date(e.createdAt)
                          .toString()
                          .split(" ")
                          .slice(1, 4)
                          .join("  ")}
                      </div>

                      <ToogleMenu
                        deleteBlog={() => deleteBlog(e._id)}
                        editBlogId={e._id}
                      />
                    </div>

                    <div className="font-bold md:text-2xl text-2xl line-clamp-2">
                      {e.title}
                    </div>

                    <div className="text-gray-500 text-sm mt-6 line-clamp-2">
                      {parse(e.description)}
                    </div>

                    <Link to={`/singleBlog/${e._id}`}>
                      <div className="mt-7 font-semibold  cursor-pointer gap-2 items-center text-white rounded-full bg-black inline-flex px-4 py-3">
                        <div>Read More</div>
                       <div className="text-lg"><ion-icon name="chevron-forward-outline"></ion-icon></div> 
                      </div>
                    
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <PaginationCom
        limit={limit}
        totalblog={totalblogs}
        setpage={(page) => setpage(page)}
      />
    </>
  );
};

export default OurBlogs;


