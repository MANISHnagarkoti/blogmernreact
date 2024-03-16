import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Commentsec from "../component/Commentsec";

const SingleBlog = () => {
  const { id } = useParams();

  const [blog, setblog] = useState({});

  const [load, lload] = useState(true);

  const { userData } = useSelector((state) => state.currentUser);

  const [toggleHeart, settoogleHeart] = useState(null);

  const [totalLikes, settotalLikes] = useState(null);

  const getBlogs = async () => {
    try {
      lload(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}blogs/singleBlog/${id}`
      );

      setblog(data.singleBlog);

      settoogleHeart(data.singleBlog.likes.includes(userData.userid));

      settotalLikes(data.singleBlog.likesNum);

      lload(false);
    } catch (error) {
      lload(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const likeBlog = async () => {
    try {
      settoogleHeart(true);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}blogs/likeBlog`,
        {
          userid: userData.userid,
          blogid: blog._id,
        }
      );

      settotalLikes(data.likes);
      // settoogleHeart(data.likes.likes.includes(userData.userid))
    } catch (e) {
      console.log(e);
    }
  };

  const unlikeBlog = async () => {
    try {
      settoogleHeart(false);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}blogs/unlikeBlog`,
        {
          userid: userData.userid,
          blogid: blog._id,
        }
      );

      settotalLikes(data.likes);

      // settoogleHeart(data.likes.likes.includes(userData.userid))
    } catch (e) {
      console.log(e);
    }
  };

  if (load) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container lg:px-44">
        <div className="flex items-center mt-8">
          <div className="font-bold text-4xl">{blog.title}</div>
        </div>

        <div className="flex gap-2 items-center mt-6">

          <div className="rounded-full w-9 h-9 overflow-hidden">
            <img src={blog.userid.profileImg} className="object-cover w-ful h-full" alt="" />
          </div>

          <div className="text-gray-400">By {blog.userid.name}</div>
        </div>

        <div className="gap-x-10  md:w-[60%] mt-10  gap-y-5">
          <div className=" overflow-hidden rounded-md max-h-[400px] md:max-h-[500px]">
            <img
              src={blog.imgUrl}
              alt=""
              className="object-cover object-top w-full h-full"
            />
          </div>
        </div>

        <div className="mt-16 text-lg md:text-2xl leading-9 text-justify overflow-hidden">
          {parse(blog.description)}
        </div>

        {/* {{{{{{{{{{{{{{{{like section}}}}}}}}}}}}}}}} */}

        <div className="text-center text-4xl w-full h-[1px] bg-gray-300 mt-24"></div>

        <div className=" mt-5">
          <div className="text-center md:text-2xl text-gray-500">
            If you Like this blog click on heart 💗
          </div>

          <div className="flex gap-x-3 justify-center items-center mt-3">
            <div className="text-lg md:text-2xl">{totalLikes} Likes </div>

            {toggleHeart ? (
              <img
                src="/redheart.png"
                width={20}
                alt=""
                onClick={unlikeBlog}
                className="cursor-pointer drop-shadow-2xl hover:scale-105 transition-all duration-150"
              />
            ) : (
              <img
                src="/blackheart.png"
                width={20}
                alt=""
                onClick={likeBlog}
                className="cursor-pointer  drop-shadow-2xl hover:scale-105 transition-all duration-150"
              />
            )}
          </div>
        </div>

        {/* {{{{{{{{{{{{{{{comment sec}}}}}}}}}}}}}}} */}

        <Commentsec userid={userData.userid} blogid={blog._id} />
      </div>
    </>
  );
};

export default SingleBlog;
