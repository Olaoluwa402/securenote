import React, { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
// import logo from '../../../../public/secure.png'
import { useRouter } from "next/router";
import { logoutUser } from "../../../redux/Features/auth/authLoginSlice";
import {
  deleteAccountAction,
  reset,
} from "../../../redux/Features/auth/deleteAccountSlice";
import { resetUser } from "../../../redux/Features/auth/authLoginSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // logged in user
  const { user, userStored } = useSelector((store) => store.authLogin);
  const loggedInUser = user ? user : userStored ? userStored : null;

  //delete account
  const { success, loading } = useSelector((store) => store.deleteAccount);

  useEffect(() => {
    if (success) {
      toast.success("Account Removed");
      dispatch(reset());
      dispatch(resetUser());
      router.push("/");
    }
  }, [dispatch, router, success]);

  //logout
  const logout = async () => {
    localStorage.removeItem("user");
    toast.success("Logged out");
    dispatch(resetUser());
    router.push("/");
  };

  return (
    <div className="w-full h-[80px] px-5   bg-primary">
      <div className="w-full md:w-4/5  mx-auto h-[100%] flex items-center justify-between">
        <Image src="/secure.png" alt="secure note" width={60} height={60} />
        <div className="flex items-center">
          <span
            onClick={() => logout()}
            className="text-[12px] mr-3 text-primary bg-white drop-shadow-md rounded-md px-[15px] py-[10px] cursor-pointer"
          >
            Logout
          </span>
          <span
            onClick={() => dispatch(deleteAccountAction(loggedInUser.token))}
            className="text-[12px] text-primary bg-white drop-shadow-md rounded-md px-[15px] py-[10px] cursor-pointer"
          >
            Delete Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
