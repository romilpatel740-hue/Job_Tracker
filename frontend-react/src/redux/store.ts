
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import applicationFilterReducer from "./applicationFilterSlice";
import applicationsReducer from "./applicationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    applicationFilter: applicationFilterReducer,
    applications: applicationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


