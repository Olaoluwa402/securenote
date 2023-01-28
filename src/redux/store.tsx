import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./combineReducers";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      // couter: {
      //   count: state.counter.count + action.payload.count,
      // },
      // auth: {
      //   user: { ...action.payload.user, ...state.auth.user },
      // },
      // users: {
      //   users: [...action.payload.users.users, ...state.users.users],
      // },
    };
    // Result, blank page.
    return nextState;
  } else {
    return reducers(state, action);
  }
};

//set all reducers to store using configure store
const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

//typescript related
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

//createWrapper from next-redux-wrapper allows for the server side renndering features with getStaticProps and getSreverSideProps
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
