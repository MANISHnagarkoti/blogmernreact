import React, { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "./PageLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';


const Commentsec = ({ userid, blogid }) => {
  const [load, setLoad] = useState(false);

  const [text, settext] = useState("");

  const [comments, setcomments] = useState([]);

  const getcomment = async () => {
    setLoad(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}comment/getComment/${blogid}`
    );

    setLoad(false);
    setcomments(data.results.comments);
  };

  const postcomment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}comment/postComment`,
        {
          userid: userid,
          blogid: blogid,
          comment: text,
        }
      );

      if (data.message === "post succefully") {
        getcomment();
        toast("Comment Added")
      } else {
        alert("error while posting comment");
      }
    } catch (e) {
      if (e.response.status === 500) {
        alert("error while posting comment");
      }
    }
  };


  const deleteComment = async (commentid) => {

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}comment/deleteComment/${commentid}/${blogid}`
      );

      await getcomment();
      toast("Comment deleted")

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getcomment();
  }, []);


  console.log(comments)

  return (
    <div className="mt-24">
      <div className="text-2xl md:text-4xl font-bold">Comment</div>

      <div className="flex gap-x-6 mt-8">
        <input
          type="text"
          name=""
          onChange={(e) => settext(e.target.value)}
          placeholder="post comment here"
          className="out outline-none rounded-full bg-gray-200 border-gray-300 border-2 py-3 px-6 w-full"
          id=""
        />

        <div
          onClick={postcomment}
          className="bg-myColor-700 rounded-full px-4 py-1  flex items-center justify-center font-bold tracking-widest bg-black text-white cursor-pointer"
        >
          Post
        </div>
      </div>

      <div className="mt-14">
        {load ? (
          <div className="w-full p-6 flex justify-center">
            <PageLoader />
          </div>
        ) : (
          comments.map((e) => {
            return (

              <div className="flex justify-between items-center gap-9">


                <div className="mt-9 flex gap-6">

                  <div className="w-9 h-9">
                    <img
                      src={e.user.profileImg}
                      className="rounded-full object-cover w-full h-full"
                      alt=""
                    />
                  </div>

                  <div>
                    <div className="text-gray-500  font-semibold">
                      By .{e.user.name}{" "}
                    </div>

                    <div className="text-slate-700 text-xs">
                      {new Date(e.createdAt)
                        .toString()
                        .split(" ")
                        .slice(1, 4)
                        .join("  ")}{" "}

                    </div>

                    <div className="mt-2 text-lg">{e.comment}</div>
                  </div>
                </div>



                {userid === e.user._id ? <div className="flex items-center cursor-pointer" onClick={() => deleteComment(e._id)}><DeleteIcon className="text-red-500/60" /></div> : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Commentsec;
