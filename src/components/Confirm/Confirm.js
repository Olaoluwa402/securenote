import React from "react";
import { GrClose } from "react-icons/gr";

const Confirm = ({ text, closeHandler, nextHandler }) => {
  return (
    <div className="max-w-[280px flex flex-col justify-center items-center relative p-12 bg-white drop-shadow-md rounded-xl">
      <p>{text} </p>
      {/* footer */}
      <div className="flex justify-center items-center my-6">
        <div className="min-w-[250px] flex items-center justify-center  ">
          <div
            className="flex items-center border border-1 border-slate-200  p-3 cursor-pointer hover:opacity-60"
            onClick={() => nextHandler("ok")}
          >
            <span className="text-primary">Yes</span>
          </div>
          <div
            className="flex items-center bg-blue200 p-3 cursor-pointer hover:opacity-60"
            onClick={closeHandler}
          >
            <span className="mr-3 text-white">No</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center absolute top-2 right-2 w-[25px] h-[25px] p-1 border border-peppermartDark500 rounded-full cursor-pointer">
        <GrClose onClick={closeHandler} />
      </div>
    </div>
  );
};

export default Confirm;
