export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export type NewJobApplication = {
  company: string;
  role: string;
  location: string;
  status: JobStatus;
};

export type JobApplication = NewJobApplication & {
  _id: string;
};

export type ApplicationAction =
  | { type: "SET_APPLICATIONS"; payload: JobApplication[] }
  | { type: "ADD_APPLICATION"; payload: JobApplication }
  | { type: "UPDATE_APPLICATION"; payload: JobApplication }
  | { type: "DELETE_APPLICATION"; payload: string };

export type ApplicationContextValue = {
  applications: JobApplication[];
  addApplication: (application: NewJobApplication) => Promise<void>;
  updateApplication: (
    id: string,
    updatedData: Partial<NewJobApplication>,
  ) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  loading: boolean;
  error: string;
};


export type ApplicationApiResponse = {
  application: JobApplication;
  message?: string;
};

export type ApplicationsApiResponse = JobApplication[];

export type ApiErrorResponse = {
  message?: string;
};
