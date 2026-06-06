import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getEmployees = () =>
  api.get("/employees");

export const createEmployee = (data) =>
  api.post("/employees", data);

export const extractSkills =
  (candidateId) =>
    api.post(
      "/recruitment/extract-skills",
      {
        candidate_id:
          candidateId,
      }
    );

export const generateInterview =
  (role) =>
    api.post(
      "/recruitment/generate-interview",
      {
        role,
      }
    );

export const dynamicScore =
  (candidateId) =>
    api.post(
      "/recruitment/dynamic-score",
      {
        candidate_id:
          candidateId,
        job_description:
          "AI Engineer",
      }
    );
    
export const uploadResume = (
  full_name,
  email,
  file
) => {
  const formData =
    new FormData();

  formData.append(
    "full_name",
    full_name
  );

  formData.append(
    "email",
    email
  );

  formData.append(
    "file",
    file
  );

  return api.post(
    "/recruitment/upload-resume",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};
export const getCandidates = () =>
  api.get("/recruitment/candidates");

export const getPerformance = () =>
  api.get("/performance/");

export const createPerformance = (
  data
) =>
  api.post(
    "/performance/",
    data
  );

export const getDashboardStats = () =>
  api.get("/dashboard/stats");
export const getLeaves = () =>
  api.get("/leaves/");
export const applyLeave = (
  data
) =>
  api.post(
    "/leaves/",
    data
  );

export const approveLeave = (id) =>
  api.put(`/leaves/approve/${id}`);

export const rejectLeave = (id) =>
  api.put(`/leaves/reject/${id}`);

export const getAttendance = () =>
  api.get("/attendance/");



export const getAttendanceCount = () =>
  api.get("/attendance/count");

export const getPayroll = () =>
  api.get("/payroll/");

export const createPayroll = (data) =>
  api.post("/payroll/", data);
export const updateEmployee = (
  id,
  data
) =>
  api.put(
    `/employees/${id}`,
    data
  );

export const deleteEmployee = (
  id
) =>
  api.delete(
    `/employees/${id}`
  );
export const checkIn = (
  employeeId
) =>
  api.post(
    "/attendance/check-in",
    {
      employee_id:
        employeeId,
    }
  );

export const checkOut = (
  employeeId
) =>
  api.put(
    `/attendance/check-out/${employeeId}`
  );
export const loginUser = (
  data
) =>
  api.post(
    "/auth/login",
    data
  );

  export const evaluateVoice =
  (transcript) =>
    api.post(
      "/voice-screening/evaluate",
      {
        transcript,
      }
    );

  export const analyzeInterview =
  (
    candidateId,
    transcript
  ) =>
    api.post(
      "/voice-screening/analyze",
      {
        candidate_id:
          candidateId,
        transcript,
      }
    );
  
    export const viewResume =
  (candidateId) =>
    api.get(
      `/recruitment/resume/${candidateId}`,
      {
        responseType:
          "blob",
      }
    );

    export const getJobs = () =>
  api.get("/jobs/");

export const createJob = (
  data
) =>
  api.post(
    "/jobs/",
    data
  );

export const updateJob = (
  id,
  data
) =>
  api.put(
    `/jobs/${id}`,
    data
  );

export const deleteJob = (
  id
) =>
  api.delete(
    `/jobs/${id}`
  );

export default api;