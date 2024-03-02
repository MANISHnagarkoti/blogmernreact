import React, { useEffect, useState } from "react";
import axios from "axios";

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

    console.log(blog);

    return (
        <div className="container mt-24">
            <div className="text-4xl font-bold">TrendingBlogs</div>

            <div className="grid lg:grid-cols-4 mt-9 gap-6 h-72">
                {blog.map((e, i) => {
                    if (i === 0) {
                        return (
                            <div className="md:col-span-2 rounded-2xl border border-black/25 relative overflow-hidden h-72">
                                {/* <div className='absolute top-3 left-3 text-4xl font-extrabold text-black z-[90]  backdrop-blur-sm flex justify-center items-center w-[70px] h-[70px] rounded-full '>{i + 1}</div> */}

                                <div className="absolute top-0 bg-gradient-to-t from-black from-10% w-full h-full flex items-end p-4">
                                    <div className="text-2xl line-clamp-1 font-semibold text-white">
                                        {e.title}
                                    </div>
                                </div>

                                <img
                                    src={e.imgUrl}
                                    className="object-cover w-full h-full"
                                    alt=""
                                />
                            </div>
                        );
                    }

                    return (
                        <div className=" rounded-2xl border border-black/25 relative overflow-hidden h-72">
                            {/* <div className='absolute top-3 left-3 text-4xl font-extrabold text-black z-[90]  backdrop-blur-sm flex justify-center items-center w-[70px] h-[70px] rounded-full '>{i + 1}</div> */}

                            <div className="absolute top-0 bg-gradient-to-t from-black from-10% w-full h-full flex items-end p-4">
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
