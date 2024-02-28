import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBtn from "../component/LoadingBtn";
// import
import { useDispatch } from "react-redux";
import {
    profilePicUpdateFunction,
    profileNameUpdateFunction,
} from "../redux/currentuser";
import axios from "axios";
import { toast } from "react-toastify";
import "../loading profile pic/loader.css";

const ProfilePage = () => {
    const { userData } = useSelector((state) => state.currentUser);

    const [userName, setUserName] = useState({ name: userData.username });

    const [changePassword, setChangePassword] = useState({
        prevPassword: "",
        currentPassword: "",
    });

    const [loadingProfilePic, setLoadingProfilePic] = useState(false);
    const [passwordLoad, setPasswordLoad] = useState(false)
    const [nameLoad, setNameLoad] = useState(false)

    const dispatch = useDispatch();

    const updateProfilePic = async (e) => {
        setLoadingProfilePic(true);

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
                setLoadingProfilePic(false);
                dispatch(profilePicUpdateFunction(data.updatedProfilePic.profileImg));

                toast(data.message);
            } else {
                setLoadingProfilePic(false);
                alert(data.message);
            }
        } catch (e) {
            setLoadingProfilePic(false);
            console.log(e);
        }
    };

    const changeProfileName = async () => {
        try {

            setNameLoad(true)

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/updateUserName`,
                {
                    userid: userData.userid,
                    name: userName.name,
                }
            );

            if (data.sucess === true) {
                setNameLoad(false)

                dispatch(profileNameUpdateFunction(data.newName.name));

                toast(data.message);
            } else {
                setNameLoad(false)
                alert(data.message);
            }
        } catch (e) {
            setNameLoad(false)
            console.log(e);
        }
    };

    const changeUserPassword = async () => {
        setPasswordLoad(true)
        try {

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}user/updateUserPassword`,
                {
                    userid: userData.userid,
                    prevPassword: changePassword.prevPassword,
                    newPassword: changePassword.currentPassword,
                }
            );

            if (data.sucess === true) {
                setPasswordLoad(false)

                toast(data.message);
            } else {
                setPasswordLoad(false)
                alert(data.message);
            }
        } catch (e) {
            setPasswordLoad(false)
            console.log(e);
        }
    };

    const setPassword = async (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container grid lg:flex gap-6 mt-9 ">
            <div class="border border-gray-400 rounded-xl lg:w-[30%] flex flex-col items-center  justify-center py-9 space-y-4">
                <label
                    htmlFor="dropzone-file"
                    className="w-[150px] h-[150px] overflow-hidden rounded-full border-2 p-1 border-colorOne relative"
                >
                    <img
                        src={userData.profilepic}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                    />

                    <input
                        id="dropzone-file"
                        type="file"
                        name="editImg"
                        class="hidden"
                        onChange={updateProfilePic}
                    />

                    {loadingProfilePic ? (
                        <div className="absolute top-0 border border-red-600 w-full h-full flex justify-center items-center rounded-full bg-black/50 right-0 left-0">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    ) : null}
                </label>

                <div className="text-xl font-semibold">{userData.username}</div>
            </div>

            <div className="border border-gray-400 p-4 lg:w-[70%] rounded-xl ">
                <div className=" p-4 rounded-xl space-y-4">
                    <div className="text-2xl font-semibold">Change Profile Name</div>

                    <div className="">
                        <div>
                            <div className="text-gray-600">User name</div>
                            {/* <div className='text-lg'>{userData.username}</div> */}
                            <input
                                type="text"
                                // value={userName.name}
                                className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                                onChange={(e) => setUserName({ name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div onClick={changeProfileName}>
                        <LoadingBtn name={"Save Change"} load={nameLoad} />
                    </div>
                </div>

                <div className=" p-4  rounded-xl space-y-4 mt-4">
                    <div className="text-2xl font-semibold">Change Password</div>
                    <div>
                        <div className="text-gray-600">Current Password</div>
                        {/* <div className='text-lg'>{userData.username}</div> */}
                        <input
                            type="text"
                            className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                            onChange={setPassword}
                            name="prevPassword"
                        />
                    </div>

                    <div>
                        <div className="text-gray-600">Current password</div>
                        {/* <div className='text-lg'>{userData.useremail}</div> */}
                        <input
                            type="text"
                            className="border border-gray-200 outline-none w-full rounded-lg p-2 mt-2 py-3"
                            onChange={setPassword}
                            name="currentPassword"
                        />
                    </div>
                    <div onClick={changeUserPassword}>
                        <LoadingBtn name={"Change Password"} load={passwordLoad} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
