import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Loader from "../Spinner/Spinner";
import { Schema } from "./Schema";
import { loginAction } from "../../redux/Features/auth/authLoginSlice";
import { toast } from "react-toastify";
import FormError from "../Errors/FormError";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Form = ({ setActive }) => {
  const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.authLogin);
  const { loading, success, user } = store;

  useEffect(() => {
    //check user type and redirect to appropriete dashboard
    if (user) {
      toast.success(`Welcome back ${user.email}`);
      // welcome message after 5sec
      welcomeRef.current = setTimeout(() => {
        router.push("/tasks");
      }, 4000);
    }
    // clear setTimeout
    return () => {
      clearInterval(welcomeRef.current);
    };
  }, [dispatch, router, user]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        const details = {
          email: values.email,
          password: values.password,
        };

        //dispach login action
        dispatch(
          loginAction({ email: details.email, password: details.password })
        );

        actions.resetForm();
      },
    });

  return (
    <>
      <div className="w-full min-h-[80vh] flex justify-center items-center bg-peppermartDarkResetPwd p-12 relative">
        <div className="max-w-[350px] max-h-fit bg-white p-6 drop-shadow-md rounded-xl">
          <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist">
            SignIn to your secure note
          </h2>
          <form
            className="my-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col my-3">
              <label
                className="text-peppermartDark500 font-Urbanist"
                htmlFor="email"
              >
                Your email
              </label>
              <input
                type="text"
                placeholder="Your@email.com"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="email"
                value={values.email}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.email && touched.email ? "#fc8181" : "inherit",
                }}
              />
              {errors.email && touched.email && (
                <FormError data={errors.email} />
              )}
            </div>
            <div className="flex flex-col my-3">
              <label
                className="text-peppermartDark500 font-Urbanist"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password "
                className="px-3 py-1 border border-slate-200 focus:outline-0 "
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.password && touched.password ? "#fc8181" : "inherit",
                }}
              />
              {errors.password && touched.password && (
                <FormError data={errors.password} />
              )}
            </div>

            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue200 text-white p-3 my-3 hover:bg-blue100"
              >
                Sign in
              </button>
            )}

            <p className="m-3">
              Do not have an account?
              <span
                className="text-dark60 ml-3 cursor-pointer underline"
                onClick={() => setActive("")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/*message alert  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Form;
