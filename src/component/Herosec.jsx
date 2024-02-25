import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Herosec = () => {
    const { userData, userLogin } = useSelector((state) => state.currentUser);
    return (
        <div className="gap-9 py-16 text-center relative dot-bg" >
            <div className="container">
                <div className="fade-last w-full h-[300px] absolute bottom-0 left-0 right-0">

                </div>
                {/* <div className="w-[500px] h-[500px] translate-y-[-200px] m-auto bg-gray-500/20 rounded-full absolute top-0 blur-[100px]">


            </div> */}


                <div className="relative">
                    {userLogin === true ? (
                        <div className="p-2 px-3 rounded-full inline-flex bg-colorOne text-white font-semibold ">
                            Hi , {userData.username}
                        </div>
                    ) : null}


                    <div className="text-6xl md:text-7xl font-bold">
                        Discover Blogs And Many More!
                    </div>

                    <div className="mt-4 text-xl text-gray-500">
                        Create your blog and see others also
                    </div>

                    <Link to={"/createBlog"}>
                        <div className="mt-4 inline-flex bg-black  text-center shadow-md text-white rounded-full p-6 py-3 cursor-pointer  hover:bg-yellow-500 transition duration-500 items-center group/one  justify-between ">
                            <div className="text-lg"> Create Your Blog </div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Herosec;
