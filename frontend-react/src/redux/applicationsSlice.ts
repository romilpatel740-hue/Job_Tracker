import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplication } from "../types/application";
import API from "../services/api"; // Import centralized Axios instance

export const fetchApplications = createAsyncThunk<
  JobApplication[],
  void,
  { rejectValue: string }
>("applications/fetchApplications", async (_, { rejectWithValue }) => {
  try {
    // Axios automatically uses the baseURL and injects the authorization token
    const response = await API.get<JobApplication[]>("/applications");
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Unable to connect to the server";
    return rejectWithValue(message);
  }
});

interface ApplicationsState {
  applications: JobApplication[];
  loading: boolean; 
  error: string | null;
}

const initialState: ApplicationsState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: (state, action: PayloadAction<JobApplication>) => {
      state.applications.push(action.payload);
    },

    updateApplication: (state, action: PayloadAction<JobApplication>) => {
      const index = state.applications.findIndex(
        (app) => app._id === action.payload._id,
      );

      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },

    deleteApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter(
        (app) => app._id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default applicationsSlice.reducer;
export const {
  addApplication,
  updateApplication,
  deleteApplication,
} = applicationsSlice.actions;