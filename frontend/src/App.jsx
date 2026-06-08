import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leaves from "./pages/Leaves";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Performance from "./pages/Performance";
import Chatbot from "./pages/Chatbot";
import HiringDecisions from "./pages/HiringDecisions";
import JobManagement from "./pages/JobManagement";

function App() {
  return (
    <BrowserRouter basename="/IntelliHR-AI">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <RoleProtectedRoute allowedRoles={[1, 3]}>
              <Payroll />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/recruitment"
          element={
            <RoleProtectedRoute allowedRoles={[1, 2, 3]}>
              <Recruitment />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/users"
          element={
            <RoleProtectedRoute allowedRoles={[1]}>
              <Users />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/performance"
          element={
            <RoleProtectedRoute allowedRoles={[1, 2, 3]}>
              <Performance />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hiring-decisions"
          element={
            <RoleProtectedRoute allowedRoles={[1, 3]}>
              <HiringDecisions />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobManagement />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </BrowserRouter>
  );
}

export default App;