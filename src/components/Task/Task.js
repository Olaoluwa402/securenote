import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsShare, BsTrash } from "react-icons/bs";

import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../Modal/ModalVariant_1";
import NewTask from "./NewTask";
import EditTask from "./EditTask";
import TaskDetail from "./TaskDetail";
import { getTasksAction } from "../../redux/Features/tasks/getTasksSlice";
import Spinner from "../Spinner/Spinner";
import Confirm from "../Confirm/Confirm";
import {
  reset,
  deleteTaskAction,
} from "../../redux/Features/tasks/deleteTaskSlice";
import { getDate } from "../../components/utils/getDateTime";
import { RWebShare } from "react-web-share";

const Tasks = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [search, setSearch] = useState("");

  //tasks state
  const { loading, tasks } = useSelector((store) => store.getTasks);

  //deleteTsak state
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteTask
  );

  // logged in user
  const { user, userStored } = useSelector((store) => store.authLogin);
  const loggedInUser = user ? user : userStored ? userStored : null;

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/");
    }

    dispatch(
      getTasksAction({
        token: loggedInUser ? loggedInUser.token : "",
        search: "",
      })
    );

    if (deleteSuccess) {
      dispatch(reset());
    }
  }, [dispatch, router, deleteSuccess, loggedInUser]);

  //closeModal
  const closeModalHandler = () => {
    setOpen((prev) => !prev);
    dispatch(getTasksAction({ token: loggedInUser.token }));
  };

  //closeEdit modal
  const closeEditModalHandler = () => {
    setOpenEdit((prev) => !prev);
    dispatch(getTasksAction({ token: loggedInUser.token }));
  };

  // close task detail
  const closeTaskDetailModalHandler = () => {
    setOpenDetail((prev) => !prev);
    dispatch(getTasksAction({ token: loggedInUser.token }));
  };

  //confirm and delete function logics
  const confirmDeleteHandler = (id) => {
    setShowDeleteModal((prev) => !prev);
    setDeletedId(id);
  };

  const cancelModalHandler = () => {
    setShowDeleteModal((prev) => !prev);
  };
  const nextModalHandler = (status) => {
    setShowDeleteModal((prev) => !prev);
    if (deleteId && status === "ok") {
      dispatch(deleteTaskAction({ id: deleteId, token: loggedInUser.token }));
    }
  };

  const truncateText = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    } else {
      return str.substring(0, num);
    }
  };

  // render text editor content safely
  // const sanitizedData = (data) => ();

  return (
    <>
      {/* new user modal */}
      {open && (
        <Modal bgColor="rgba(0,0,0,0.75)">
          {<NewTask setOpen={setOpen} closeModalHandler={closeModalHandler} />}
        </Modal>
      )}
      {openEdit && (
        <Modal bgColor="rgba(0,0,0,0.75)">
          {
            <EditTask
              setOpen={setOpenEdit}
              id={updateId}
              closeEditModalHandler={closeEditModalHandler}
            />
          }
        </Modal>
      )}

      {openDetail && (
        <Modal bgColor="rgba(0,0,0,0.75)">
          {
            <TaskDetail
              setOpen={setOpenDetail}
              id={detailId}
              closeTaskDetailModalHandler={closeTaskDetailModalHandler}
            />
          }
        </Modal>
      )}

      {/* confirm delete modal */}
      {showDeleteModal && (
        <Modal bgColor="rgba(0,0,0,0.75)">
          <Confirm
            text="Are you sure you want to delete this?"
            closeHandler={cancelModalHandler}
            nextHandler={nextModalHandler}
          />
        </Modal>
      )}
      <div className="w-[100%]  sm:w-4/5 mx-auto  mb-10">
        <div className="flex items-center justify-between my-3 bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="max-w-fit h-[32px] text-[12px] rounded-lg flex items-center justify-center p-3 bg-primary text-white cursor-pointer"
          >
            New Note
          </button>
          <p className="mr-3">
            {loggedInUser ? `${loggedInUser.email.slice(0, 15)}...` : null}
          </p>{" "}
        </div>

        <div className="w-[100%] min-h-[480px]  bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-[30px] text-primary">
              Notes
            </p>
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center p-3">
              <div className="flex justify-between items-center  p-1 mb-2 md:mb-0 mr-2 cursor-pointer">
                <FaSearch className="mr-2" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="outline-0"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    dispatch(
                      getTasksAction({
                        token: loggedInUser.token,
                        search: e.target.value,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* table */}
          {loading ? (
            <Spinner />
          ) : tasks && tasks.length > 0 ? (
            <div className="my-12 flex flex-wrap">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex flex-col m-2  w-[230px] h-[280px] p-2 drop-shadow-md rounded-lg bg-orange10"
                >
                  <h2
                    className="font-bold break-words uppercase text-[#333] cursor-pointer hover:text-blue200"
                    onClick={() => {
                      setOpenDetail((prev) => !prev);
                      setDetailId(task._id);
                    }}
                  >
                    {truncateText(task.title, 20)}
                  </h2>
                  <span className="italic text-[12px] text-slate-800">
                    {getDate(task.createdAt, "MMM DD, YYYY ")}
                  </span>

                  <div
                    className="flex-1 flex-wrap break-words mt-5"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(task.detail, 200),
                    }}
                  ></div>

                  {/* action btn */}
                  <div className="w-full h-[30px]  bg-white flex justify-between px-1 items-center">
                    <MdOutlineEditNote
                      className="mr-3 cursor-pointer text-[30px]"
                      onClick={() => {
                        setUpdateId(task._id);
                        setOpenEdit((prev) => !prev);
                      }}
                    />

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

                    {deleteLoading && deleteId == task._id ? (
                      <Spinner />
                    ) : (
                      <BsTrash
                        className="cursor-pointer"
                        onClick={() => confirmDeleteHandler(task._id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2>No Note yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
