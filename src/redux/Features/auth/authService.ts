import axios from "axios";
import { BASE_URL } from "../../../../constants";

export interface registerProps {
  email: string;
  password: string;
  name: string;
}
// Register user
const register = async ({
  email,
  password,
  name,
}: registerProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.post(
    `${BASE_URL}/api/register`,
    { email, password, name },
    config
  );

  return data;
};

export interface loginProps {
  email: string;
  password: string;
}
// Login user
const login = async ({ email, password }: loginProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.post(
    `${BASE_URL}/api/login`,
    { email, password },
    config
  );
  if (data) {
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

export interface updatePasswordProps {
  email: string;
  otp: string;
  new_password: string;
}

export interface updateProfileProps {
  id: string;
  token: string;
  formData: any;
}

const updateProfile = async ({
  token,
  formData,
  id,
}: updateProfileProps): Promise<{}> => {
  // console.log({ token, formData, id }, "updateProfileformData");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.post(
    `${BASE_URL}/api/update-profile/${id}`,
    formData,
    config
  );

  if (data && data.status === "success") {
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  }

  return data;
};

// delete account
const deleteAccount = async (token: string): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.delete(`${BASE_URL}/api/delete_account`, config);

  return data;
};

// Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  updateProfile,
  deleteAccount,
};

export default authService;
