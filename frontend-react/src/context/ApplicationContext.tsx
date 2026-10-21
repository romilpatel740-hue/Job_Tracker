import {
  createContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import type {
  ApiErrorResponse,
  ApplicationAction,
  ApplicationApiResponse,
  ApplicationContextValue,
  JobApplication,
  NewJobApplication,
} from "../types/application";

const ApplicationContext = createContext<ApplicationContextValue | undefined>(
  undefined,
);

const API_URL = "https://jobtracker-backend-eiaz.onrender.com/api/applications";

function ApplicationReducer(
  state: JobApplication[],
  action: ApplicationAction,
): JobApplication[] {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return action.payload;

    case "ADD_APPLICATION":
      return [...state, action.payload];

    case "UPDATE_APPLICATION":
      return state.map((app) =>
        app._id === action.payload._id ? action.payload : app,
      );

    case "DELETE_APPLICATION":
      return state.filter((app) => app._id !== action.payload);

    default:
      return state;
  }
}

function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, dispatch] = useReducer(
    ApplicationReducer,
    [] as JobApplication[],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET all applications
  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid applications response");
        }

        dispatch({
          type: "SET_APPLICATIONS",
          payload: data as JobApplication[],
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // POST application
  async function addApplication(application: NewJobApplication): Promise<void> {
    try {
      setError("");

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
        throw new Error(data.message || "Failed to create application");
      }

      if (!("application" in data)) {
        throw new Error("Invalid application response");
      }

      dispatch({
        type: "ADD_APPLICATION",
        payload: data.application,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // PUT application
  async function updateApplication(
    id: string,
    updatedData: Partial<NewJobApplication>,
  ): Promise<void> {
    try {
      setError("");

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
        throw new Error(data.message || "Failed to update application");
      }

      if (!("application" in data)) {
        throw new Error("Invalid application response");
      }

      dispatch({
        type: "UPDATE_APPLICATION",
        payload: data.application,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(message);
      throw error;
    }
  }

  // DELETE application
  async function deleteApplication(id: string): Promise<void> {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data: ApiErrorResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete application");
      }

      dispatch({
        type: "DELETE_APPLICATION",
        payload: id,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(message);
    }
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        loading,
        error,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationContext, ApplicationProvider };
