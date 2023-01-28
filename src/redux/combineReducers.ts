import { combineReducers } from "@reduxjs/toolkit";

import {
  authLoginReducer,
  authRegisterReducer,
  createTaskReducer,
  deleleTaskReducer,
  getTaskDetailReducer,
  getTasksReducer,
  updateTaskReducer,
  deleteAccountReducer,
} from "./combineImports";

const reducers = combineReducers({
  // auth
  authRegister: authRegisterReducer,
  authLogin: authLoginReducer,

  // task
  createTask: createTaskReducer,
  deleteTask: deleleTaskReducer,
  getTaskDetail: getTaskDetailReducer,
  getTasks: getTasksReducer,
  updateTask: updateTaskReducer,
  deleteAccount: deleteAccountReducer,
});

export { reducers };
