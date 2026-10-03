import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

function useApplications() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationProvider"
    );
  }

  const { applications } = context;

  function getApplicationById(id) {
    return applications.find(
      (app) => app.id === Number(id)
    );
  }

  function getApplicationsByStatus(status) {
  return applications.filter(
    (app) =>
      app.status.toLowerCase() === status.toLowerCase()
  );
}

  return {
    ...context,
    getApplicationById,
    getApplicationsByStatus,
  };
}

export default useApplications;