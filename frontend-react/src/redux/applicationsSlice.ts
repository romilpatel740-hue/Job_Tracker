import { createAsyncThunk } from "@reduxjs/toolkit";
import type { JobApplication } from "../types/application";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const API_URL = "https://jobtracker-backend-eiaz.onrender.com/api/applications";

export const fetchApplications = createAsyncThunk<
  JobApplication[],
  void,
  { rejectValue: string }
>("applications/fetchApplications", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      return rejectWithValue("Failed to fetch applications");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return rejectWithValue("Invalid applications response");
    }

    return data as JobApplication[];
  } catch {
    return rejectWithValue("Unable to connect to the server");
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