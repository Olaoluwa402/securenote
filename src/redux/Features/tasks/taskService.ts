import axios from "axios";
import { BASE_URL } from "../../../../constants";

export interface getTaskProps {
  token: string;
  search: string;
}

export interface createTaskProps {
  token: string;
  title: string;
  detail: string;
}
export interface deleteTaskProps {
  id: number;
  token: string;
}

export interface updateTaskProps {
  id: string;
  token: string;
  title: string;
  detail: string;
}

/**
 *
 * @param {*} none
 * @returns get all feedbacks
 * @description This returns all feedbacks
 * @access token - private
 */

const getTasks = async ({ token, search }: getTaskProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.get(
    `${BASE_URL}/api/tasks?search=${search}`,
    config
  );

  return data;
};

/**
 *
 * @param {*} none
 * @returns create feedback
 * @description This returns created feedback
 * @access token - private
 */

const createTask = async ({
  token,
  title,
  detail,
}: createTaskProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks`,
    { title, detail },
    config
  );

  return data;
};

/**
 *
 * @param {*} id
 * @returns update feedback
 * @description This returns update status report
 * @access token - private
 */
const updateTask = async ({
  id,
  token,
  title,
  detail,
}: updateTaskProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.put(
    `${BASE_URL}/api/tasks/${id}`,
    { title, detail },
    config
  );

  return data;
};

/**
 *
 * @param {*} id
 * @returns get single task
 * @description This returnsa task
 * @access token - private : user
 */
const getTaskDetail = async ({ token, id }: deleteTaskProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };

  const { data } = await axios.get(`${BASE_URL}/api/tasks/${id}`, config);

  return data;
};

/**
 *
 * @param {*} id
 * @returns delete feedback
 * @description This returns delete status report
 * @access token - private
 */
const deleteTask = async ({ token, id }: deleteTaskProps): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };
  console.log(token, id, "delete");
  const { data } = await axios.delete(`${BASE_URL}/api/tasks/${id}`, config);

  return data;
};

const taskService = {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
  getTaskDetail,
};

export default taskService;
