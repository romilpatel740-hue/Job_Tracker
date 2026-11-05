
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

import {
  addApplication as addApplicationToStore,
  updateApplication as updateApplicationInStore,
  deleteApplication as deleteApplicationFromStore,
  fetchApplications,
} from "../redux/applicationsSlice";

import type {
  ApiErrorResponse,
  ApplicationApiResponse,
  ApplicationContextValue,
  NewJobApplication,
} from "../types/application";

const ApplicationContext = createContext<
  ApplicationContextValue | undefined
>(undefined);

const API_URL =
  "https://jobtracker-backend-eiaz.onrender.com/api/applications";

function ApplicationProvider({ children }: { children: ReactNode }) {
  // Redux dispatch
  const reduxDispatch = useDispatch<AppDispatch>();

  // Read data from Redux store
  const {
    applications,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.applications);

  // Local state for POST, PUT and DELETE
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState("");

  // GET all applications
  useEffect(() => {
    reduxDispatch(fetchApplications());
  }, [reduxDispatch]);

  // POST application
  async function addApplication(
    application: NewJobApplication,
  ): Promise<void> {
    try {
      setMutationLoading(true);
      setMutationError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });

      const data: ApplicationApiResponse | ApiErrorResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create application",
        );
      }

      if (!("application" in data)) {
        throw new Error("Invalid application response");
      }

      reduxDispatch(addApplicationToStore(data.application));
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

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data: ApplicationApiResponse | ApiErrorResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update application",
        );
      }

      if (!("application" in data)) {
        throw new Error("Invalid application response");
      }

      reduxDispatch(updateApplicationInStore(data.application));
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

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data: ApiErrorResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete application",
        );
      }

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
