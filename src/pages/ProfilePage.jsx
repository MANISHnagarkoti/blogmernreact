import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingBtn from "../component/LoadingBtn";
// import
import { useDispatch } from "react-redux";
import { profilePicUpdateFunction } from "../redux/currentuser";
import axios from "axios";
import { toast } from "react-toastify";
import "../loading profile pic/loader.css"

const ProfilePage = () => {
    const { userData } = useSelector((state) => state.currentUser);

    const [userProfile, setUserProfile] = useState({
        userName: userData.username,
    });

    console.log(userData);

    const dispatch = useDispatch();

    const updateProfilePic = async (e) => {


        const formData = new FormData();
        formData.append("userid", userData.userid);
        formData.append("photo", e.target.files[0]);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/updateProfilePic`,
                formData
            );

            if (data.sucess === true) {
                // setLoad(false);

                dispatch(profilePicUpdateFunction(data.updatedProfilePic.profileImg))

                toast(data.message);

            } else {
                // setLoad(false);
                alert(data.message);
            }
        } catch (e) {
            // setLoad(false);
            console.log(e);
        }
    };

    return (
        <div className="container grid lg:flex gap-6 mt-9 ">
            <div class="border border-gray-400 rounded-xl lg:w-[30%] flex flex-col items-center  justify-center py-9 space-y-4">

                <label
                    for="dropzone-file"
                    class="w-[150px] h-[150px] overflow-hidden rounded-full border-2 p-1 border-colorOne relative"
                >
                    <img
                        src={userData.profilepic}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                    />

                    <input
                        id="dropzone-file"
                        type="file"
                        // onChange={setUserFunc}
                        name="editImg"
                        class="hidden"
                        onChange={updateProfilePic}
                    />
                    <div className="absolute top-0 border border-red-600 w-full h-full flex justify-center items-center rounded-full bg-black/50 right-0 left-0">
                        <div class="lds-ripple"><div></div><div></div></div>
                    </div>
                </label>

                <div className="text-xl font-semibold">{userData.username}</div>
            </div>

            <div className="border border-gray-400 p-4 lg:w-[70%] rounded-xl ">
                <div className="border border-gray-400 p-4 rounded-xl space-y-4">
                    <div className="text-2xl font-semibold">Change Name and Email</div>

                    <div className="">
                        <div>
                            <div className="text-gray-600">User name</div>
                            {/* <div className='text-lg'>{userData.username}</div> */}
                            <input
                                type="text"
                                value={userProfile.userName}
                                className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                            />
                        </div>
                    </div>

                    <LoadingBtn name={"Save Change"} />
                </div>

                <div className="border border-gray-400 p-4  rounded-xl space-y-4 mt-4">
                    <div className="text-2xl font-semibold">Change Password</div>
                    <div>
                        <div className="text-gray-600">Current Password</div>
                        {/* <div className='text-lg'>{userData.username}</div> */}
                        <input
                            type="text"
                            className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                        />
                    </div>

                    <div>
                        <div className="text-gray-600">User email</div>
                        {/* <div className='text-lg'>{userData.useremail}</div> */}
                        <input
                            type="text"
                            className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                        />
                    </div>

                    <LoadingBtn name={"Change Password"} />
                </div>

                <div className="px-4 font-semibold py-3 rounded-xl w-full mt-4 text-center bg-red-400 text-white cursor-pointer">
                    Delete Account
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
