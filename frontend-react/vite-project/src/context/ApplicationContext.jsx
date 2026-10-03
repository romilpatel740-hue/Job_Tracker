import { createContext, useEffect, useReducer } from "react";

const ApplicationContext = createContext();

// 1. Get initial applications from localStorage
function getInitialApplications() {
  const savedApplications =
    localStorage.getItem("jobApplication");

  return savedApplications
    ? JSON.parse(savedApplications)
    : [];
}

// 2. Reducer
function ApplicationReducer(state, action) {
  switch (action.type) {
    case "ADD_APPLICATION":
      return [
        ...state,
        {
          id: Date.now(),
          ...action.payload,
        },
      ];

    case "UPDATE_APPLICATION":
      return state.map((app) =>
        app.id === action.payload.id
          ? {
              ...app,
              ...action.payload.updatedData,
            }
          : app
      );

    case "DELETE_APPLICATION":
      return state.filter(
        (app) => app.id !== action.payload
      );

    default:
      return state;
  }
}

// 3. Provider
function ApplicationProvider({ children }) {
  const [applications, dispatch] = useReducer(
    ApplicationReducer,
    [],
    getInitialApplications
  );

// 4. Save applications to localStorage
  useEffect(() => {
    localStorage.setItem(
      "jobApplication",
      JSON.stringify(applications)
    );
  }, [applications]);


  // 5. Add
  function addApplication(application) {
    dispatch({
      type: "ADD_APPLICATION",
      payload: application,
    });
  }


  // 6. Update
  function updateApplication(id, updatedData) {
    dispatch({
      type: "UPDATE_APPLICATION",
      payload: {
        id,
        updatedData,
      },
    });
  }


  // 7. Delete
  function deleteApplication(id) {
    dispatch({
      type: "DELETE_APPLICATION",
      payload: id,
    });
  }


  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}


export {
  ApplicationContext,
  ApplicationProvider,
};