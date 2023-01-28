import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { BsShare } from "react-icons/bs";
import { useRouter } from "next/router";
import Loader from "../Spinner/Spinner";
import { RWebShare } from "react-web-share";

import { getTaskAction } from "../../redux/Features/tasks/getTaskDetailSlice";

const TaskDetail = ({ id, closeTaskDetailModalHandler }) => {
  //   const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, task } = useSelector((store) => store.getTaskDetail);

  // logged in user
  const { user, userStored } = useSelector((store) => store.authLogin);
  const loggedInUser = user ? user : userStored ? userStored : null;

  const token = loggedInUser.token;
  useEffect(() => {
    if (!loggedInUser) {
      router.push("/");
    }
    dispatch(getTaskAction({ id, token }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loggedInUser]);

  return (
    <>
      {/* form */}
      <div className="max-w-[680px] min-w-[300px] max-h-[620px] bg-white p-6 drop-shadow-md rounded-xl relative overflow-y-auto">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeTaskDetailModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>

        {loading ? (
          <Loader />
        ) : task ? (
          <div className="w-3/4 mx-auto flex flex-col drop-shadow-md bg-white p-4 my-4">
            <h2 className="text-center text-[25px] font-bold text-primary font-Urbanist mt-[20px]">
              Task Detail
            </h2>

            <div className="my-3">
              <h2>{task.title}</h2>

              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: task.detail,
                }}
              ></div>
            </div>
            <RWebShare
              data={{
                text: "Sign up and take advantage of the free and secure note app",
                url: "https://securenote-9gh1.onrender.com/",
                title: "secure note app",
              }}
              onClick={() => {
                closeTaskDetailModalHandler;
                console.log("shared successfully!");
              }}
            >
              <BsShare className=" text-[green] rounded-lg drop-shadow-md cursor-pointer text-[20px]" />
            </RWebShare>
          </div>
        ) : (
          <h2>No record found</h2>
        )}
      </div>
    </>
  );
};

export default TaskDetail;
