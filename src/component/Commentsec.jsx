import React, { useEffect, useState } from "react";
import axios from "axios";

const Commentsec = ({ userid, blogid }) => {
  const [text, settext] = useState("");

  const [comments, setcomments] = useState([]);

  const getcomment = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}comment/getComment/${blogid}`
    );

    setcomments(data.results.comments);
  };

  useEffect(() => {
    getcomment();
  }, []);

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
      } else {
        alert("error while posting comment");
      }
    } catch (e) {
      if (e.response.status === 500) {
        alert("error while posting comment");
      }
    }
  };

  return (
    <div className="mt-24">
      <div className="text-4xl font-bold">Comment</div>

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
        {comments.map((e) => {
          return (
            <div className="mt-16">
              <div className="text-gray-500 text-[14px] font-bold">
                By .{e.user.name}{" "}
              </div>

              <div className="text-slate-700  f text-[12px] ">
                {new Date(e.createdAt)
                  .toString()
                  .split(" ")
                  .slice(1, 4)
                  .join("  ")}{" "}
                {new Date(e.createdAt)
                  .toString()
                  .split(" ")
                  .slice(4, 5)
                  .join("  ")}
              </div>

              <div className="mt-2 text-lg">{e.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Commentsec;
