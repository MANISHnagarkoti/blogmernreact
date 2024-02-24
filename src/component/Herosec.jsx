import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Herosec = () => {
    const { userData, userLogin } = useSelector((state) => state.currentUser);
    return (
        <div className="container gap-9 mt-16 text-center">
        
            <div>
                {userLogin === true ? (
                    <div className="p-2 px-3 rounded-full bg-myColor-700 inline-flex bg-colorOne text-white font-semibold ">
                        Hi , {userData.username}
                    </div>
                ) : null}


                <div className="text-6xl font-bold">
                    Discover Blogs And Many More!
                </div>

                <div className="mt-2 text-xl text-gray-500">
                    Create your blog and see others also
                </div>

                <Link to={"/createBlog"}>
                    <div className="mt-4 inline-flex bg-black  text-center shadow-md text-white rounded-full p-6 py-3 cursor-pointer  hover:bg-yellow-500 transition duration-500 items-center group/one  justify-between ">
                        <div className="text-lg"> Create Your Blog </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Herosec;
