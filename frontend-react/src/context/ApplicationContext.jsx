import { createContext, useEffect, useReducer, useState } from "react";

const ApplicationContext = createContext();

const API_URL = "http://localhost:5001/api/applications";

function ApplicationReducer(state, action) {
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

function ApplicationProvider({ children }) {
  const [applications, dispatch] = useReducer(ApplicationReducer, []);

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

        const data = await response.json();

        dispatch({
          type: "SET_APPLICATIONS",
          payload: data,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // POST application
  async function addApplication(application) {
    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create application");
      }

      dispatch({
        type: "ADD_APPLICATION",
        payload: data.application,
      });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // PUT application
  async function updateApplication(id, updatedData) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update application");
      }

      dispatch({
        type: "UPDATE_APPLICATION",
        payload: data.application,
      });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // DELETE application
  async function deleteApplication(id) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete application");
      }

      dispatch({
        type: "DELETE_APPLICATION",
        payload: id,
      });
    } catch (error) {
      setError(error.message);
      throw error;
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
