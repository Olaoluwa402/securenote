import authRegisterReducer from "./Features/auth/authRegisterSlice";
import authLoginReducer from "./Features/auth/authLoginSlice";
import updateProfileReducer from "./Features/auth/updateProfileSlice";

import createTaskReducer from "./Features/tasks/createTaskSlice";
import deleleTaskReducer from "./Features/tasks/deleteTaskSlice";
import getTaskDetailReducer from "./Features/tasks/getTaskDetailSlice";
import getTasksReducer from "./Features/tasks/getTasksSlice";
import updateTaskReducer from "./Features/tasks/updateTaskSlice";
import deleteAccountReducer from "./Features/auth/deleteAccountSlice";
export {
  // auth
  authRegisterReducer,
  authLoginReducer,
  updateProfileReducer,

  // task
  createTaskReducer,
  deleleTaskReducer,
  getTaskDetailReducer,
  getTasksReducer,
  updateTaskReducer,
  deleteAccountReducer,
};
