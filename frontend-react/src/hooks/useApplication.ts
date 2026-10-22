import { useContext } from "react";
import type { JobStatus } from "../types/application";
import {
  ApplicationContext,
} from "../context/ApplicationContext";

function useApplications() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationProvider"
    );
  }

  const { applications } = context;


  function getApplicationById(id: string | undefined) {
    return applications.find(
      (app) => String(app._id) === String(id)
    );
  }

  function getApplicationsByStatus(status: JobStatus) {
    return applications.filter(
      (app) =>
        app.status.toLowerCase() ===
        status.toLowerCase()
    );
  }

  return {
    ...context,
    getApplicationById,
    getApplicationsByStatus,
  };
}

export default useApplications;