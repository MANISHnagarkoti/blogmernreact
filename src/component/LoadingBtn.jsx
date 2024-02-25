import React from "react";
import "../laoding btn css/laoder.css";

const LoadingBtn = ({ load, name }) => {
  return (
    <>
      <button
        type="submit"
        className="bg-colorOne cursor-pointer text-center h-12 text-lg px-4 rounded-2xl mt-4 text-white w-full"
      >
        {load ? (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="font-semibold text-lg">{name}</div>
        )}
      </button>
    </>
  );
};

export default LoadingBtn;
