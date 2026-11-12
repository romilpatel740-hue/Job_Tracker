import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import API from "../services/api"; // Import your centralized Axios instance

import {
  addApplication as addApplicationToStore,
  updateApplication as updateApplicationInStore,
  deleteApplication as deleteApplicationFromStore,
  fetchApplications,
} from "../redux/applicationsSlice";

import type {
  ApplicationApiResponse,
  ApplicationContextValue,
  NewJobApplication,
} from "../types/application";

const ApplicationContext = createContext<
  ApplicationContextValue | undefined
>(undefined);

function ApplicationProvider({ children }: { children: ReactNode }) {
  // Redux dispatch
  const reduxDispatch = useDispatch<AppDispatch>();

  // Read data from Redux store
  const {
    applications,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.applications);

  // Local state for mutations
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState("");

  // GET all applications
  useEffect(() => {
    reduxDispatch(fetchApplications());
  }, [reduxDispatch]);

  // POST application using Axios (automatically attaches token & base URL)
  async function addApplication(
    application: NewJobApplication,
  ): Promise<void> {
    try {
      setMutationLoading(true);
      setMutationError("");

      const response = await API.post<ApplicationApiResponse>("/applications", application);

      reduxDispatch(addApplicationToStore(response.data.application));
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";

      setMutationError(message);
      throw error;
    } finally {
      setMutationLoading(false);
    }
  }

  // PUT application
  async function updateApplication(
    id: string,
    updatedData: Partial<NewJobApplication>,
  ): Promise<void> {
    try {
      setMutationLoading(true);
      setMutationError("");

      const response = await API.put<ApplicationApiResponse>(`/applications/${id}`, updatedData);

      reduxDispatch(updateApplicationInStore(response.data.application));
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";

      setMutationError(message);
      throw error;
    } finally {
      setMutationLoading(false);
    }
  }

  // DELETE application
  async function deleteApplication(id: string): Promise<void> {
    try {
      setMutationLoading(true);
      setMutationError("");

      await API.delete(`/applications/${id}`);

      reduxDispatch(deleteApplicationFromStore(id));
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";

      setMutationError(message);
      throw error;
    } finally {
      setMutationLoading(false);
    }
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        loading: reduxLoading || mutationLoading,
        error: reduxError || mutationError,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationContext, ApplicationProvider };