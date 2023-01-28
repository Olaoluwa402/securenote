import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Loader from "../Spinner/Spinner";
import { Schema } from "./EditSchema";
import {
  updateTaskAction,
  reset,
} from "../../redux/Features/tasks/updateTaskSlice";
import { getTaskAction } from "../../redux/Features/tasks/getTaskDetailSlice";
import { toast } from "react-toastify";
import FormError from "../Errors/FormError";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditTask = ({ setOpen, id, closeEditModalHandler }) => {
  //   const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((store) => store.updateTask);

  const { task } = useSelector((store) => store.getTaskDetail);

  const [value, setValue] = useState("");

  // logged in user
  const { user, userStored } = useSelector((store) => store.authLogin);
  const loggedInUser = user ? user : userStored ? userStored : null;

  const token = loggedInUser.token;

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/");
    }
    if (success) {
      toast.success(`successfull`);
      // welcome message after 5sec
      dispatch(reset());
    }

    dispatch(getTaskAction({ id, token }));
  }, [dispatch, router, id, token, success, loggedInUser]);

  useEffect(() => {
    if (task) {
      setValue(task.detail);
    }
  }, [dispatch, task]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        title: task ? task.title : "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        dispatch(
          updateTaskAction({
            id: id,
            token: loggedInUser.token,
            title: values.title,
            detail: value,
          })
        );
      },
    });

  return (
    <>
      {/* form */}
      <div className="max-w-[600px] max-h-[620px] bg-white p-6 drop-shadow-md rounded-xl relative overflow-y-auto">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeEditModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
        <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist mt-[20px]">
          Edit Note
        </h2>
        <form
          className="my-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col my-3">
              <label className=" " htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="note"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="title"
                value={values.title}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.title && touched.title ? "#fc8181" : "inherit",
                }}
              />

              {errors.title && touched.title && (
                <FormError data={errors.title} />
              )}
            </div>

            <div className="flex flex-col my-3">
              <label className=" " htmlFor="text">
                Text
              </label>

              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-full bg-blue200 text-white p-3 my-3 hover:opacity-60"
            >
              UPDATE
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditTask;
