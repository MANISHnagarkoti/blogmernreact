import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import PaginationCom from "../component/PaginationCom";
import ToogleMenu from "../component/ToogleMenu";
import BasicSelect from "../component/BasicSelect";
import NoFound from "../component/NoFound";

const OurBlogs = () => {
  const { userData } = useSelector((state) => state.currentUser);

  const [blog, setblog] = useState([]);

  const [load, lload] = useState(true);

  const [page, setpage] = useState(1);

  const [limit, setlimit] = useState("");

  const [totalblogs, settotalblogs] = useState(null);

  const [text, setText] = useState("");

  const [sortOne, setSortOne] = useState("ascending");

  const sortList = ["ascending", "descending", "popular", "newest"];

  const getBlogs = async () => {
    try {
      lload(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}blogs/currentUserBlogs?userid=${userData.userid
        }&page=${page}&sortby=${sortOne}&search=${text}`
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
    lload(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}blogs/deleteBlog/${id}`
      );

      await getBlogs();
      lload(false)

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page, sortOne]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getBlogs();
    }
  };

  const removeInputTextFilter = async () => {
    setText("");

    lload(true);

    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}blogs/currentUserBlogs?userid=${userData.userid
      }&page=${page}&sortby=${sortOne}&search=`
    );

    setblog(data.allblogs.blogs);

    settotalblogs(data.totalblog);

    setlimit(data.limit);

    lload(false);
  };

  return (
    <>
      <div className="flex justify-between flex-wrap gap-9 items-center container mt-9">
        <div className="flex gap-4 items-center outline-none rounded-full border-gray-200 border py-3 px-8">
          <div className="text-gray-500 text-xl flex items-center">
            <ion-icon name="search-outline"></ion-icon>
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

          <div
            className={text.length > 0 ? " block" : "hidden"}
            onClick={removeInputTextFilter}
          >
            <div className="text-gray-500 text-xl flex items-center cursor-pointer">
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className=" mx-w-[400px]">
          <BasicSelect
            list={sortList}
            heading={"Sortby"}
            setSort={setSortOne}
            value={sortOne}
          />
        </div>
      </div>

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
      ) : blog.length === 0 ? (
        <NoFound />
      ) : (
        <div className="mt-32 mx-auto container">
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-16  mt-16">
            {blog.map((e) => {
              return (
                <div
                  key={e._id}
                  className="rounded-xl overflow-hidden  space-y-5 gap-x-6 w-full  "
                >
                  <div className="overflow-hidden group h-64">
                    <img
                      src={e.imgUrl}
                      alt="no img"
                      className="group-hover:scale-105  transition-all duration-300   w-full  h-full  object-cover object-top"
                    />
                  </div>

                  <div className="w-full pb-4 px-4">
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
                      <div className="mt-7 font-medium text-base cursor-pointer gap-2 items-center text-white rounded-full bg-colorOne inline-flex px-4 py-3">
                        <div>Read More</div>
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
