import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingSec = () => {
  const [blog, setBlog] = useState([]);

  const getBlogs = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}blogs/trendingBlog`
    );

    setBlog(data.trending);
  };

  useEffect(() => {
    getBlogs();
  }, []);


  console.log(blog)

  return (
    <div className="container mt-24">
      <div className="text-4xl font-bold">TrendingBlogs</div>

      <div className="grid lg:grid-cols-4 mt-9 gap-6 lg:h-72">
        {blog.map((e, i) => {
          if (i === 0) {
            return (
              <Link to={`/singleBlog/${e._id}`} key={i} className="md:col-span-2 rounded-2xl border border-black/25 relative overflow-hidden h-72">

                <div className='absolute top-6 left-6 text-6xl font-extrabold text-white z-[90] rounded-full '>{i + 1}</div>
                {/* bg-gradient-to-t from-black from-10% */}
                <div className="absolute top-0  w-full h-full bg-colorOne/40 flex flex-col justify-end p-4">

                  <div className="text-2xl line-clamp-1 font-semibold text-white mt-2">
                    {e.title}
                  </div>
                </div>

                <img
                  src={e.imgUrl}
                  className="object-cover w-full h-full"
                  alt=""
                />

              </Link>
            );
          }

          return (
            <Link to={`/singleBlog/${e._id}`}>
              <div key={i} className=" rounded-2xl border border-black/25 relative overflow-hidden h-72">
                <div className='absolute top-6 left-6 text-4xl font-extrabold text-white z-[90]  rounded-full '>{i + 1}</div>

                <div className="absolute top-0 bg-colorOne/40 w-full h-full flex items-end p-4">
                  <div className="text-2xl line-clamp-1 font-semibold text-white">
                    {e.title}
                  </div>
                </div>

                <img
                  src={e.imgUrl}
                  className=" object-cover w-full h-full"
                  alt=""
                />
              </div>
            </Link>
          );
        })}

        {/* <div className='col-span-2 rounded-lg border border-black/25 relative'>

                    <div className='absolute top-6 left-6 text-6xl font-extrabold'>1</div>


                </div>
                <div className=' rounded-lg border border-black/25 relative'>

                    <div className='absolute top-6 left-6 text-6xl font-extrabold'>2</div>

                </div>


                <div className=' rounded-lg border border-black/25 relative'>

                    <div className='absolute top-6 left-6 text-6xl font-extrabold'>3</div>

                </div> */}
      </div>
    </div>
  );
};

export default TrendingSec;
