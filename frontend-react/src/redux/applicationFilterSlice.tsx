
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobStatus } from "../types/application";

type ApplicationFilter = "all" | JobStatus;

interface ApplicationFilterState {
  status: ApplicationFilter;
}

const initialState: ApplicationFilterState = {
  status: "all",
};

const applicationFilterSlice = createSlice({
  name: "applicationFilter",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ApplicationFilter>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = applicationFilterSlice.actions;

export default applicationFilterSlice.reducer;
