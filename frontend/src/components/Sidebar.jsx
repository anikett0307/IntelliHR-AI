import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const token =
    localStorage.getItem(
      "token"
    );

  let roleId = 4;
  let roleName =
    "Employee";

  try {
    if (
      token &&
      token !== "undefined"
    ) {
      const decoded =
        jwtDecode(token);

      roleId =
        decoded.role_id;

      if (roleId === 1) {
        roleName = "Administrator";
      }
      else if (roleId === 2) {
        roleName = "HR Recruiter";
      }
      else if (roleId === 3) {
        roleName = "Senior Manager";
      }
      else {
        roleName = "Employee";
      }
    }
  } catch (error) {
    console.log(
      "Invalid Token"
    );

    localStorage.removeItem(
      "token"
    );
  }

  return (
    <div className="sidebar">

      {/* Logo Area */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          🧠
        </div>

        <h2>
          IntelliHR AI
        </h2>

        <p>
          AI-Powered HR Platform
        </p>

      </div>

      <hr />

      {/* Menu */}

      <div className="menu-section">

        <Link
          to="/"
          className="menu-link"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/employees"
          className="menu-link"
        >
          👥 Employees
        </Link>

        <Link
          to="/leaves"
          className="menu-link"
        >
          📄 Leaves
        </Link>

        <Link
          to="/attendance"
          className="menu-link"
        >
          🕒 Attendance
        </Link>

        {(roleId === 1 ||
          roleId === 2 ||
          roleId === 3) && (
            <Link
              to="/performance"
              className="menu-link"
            >
              📈 Performance
            </Link>
          )}


        {(roleId === 1 ||
          roleId === 3) && (
            <Link
              to="/payroll"
              className="menu-link"
            >
              💰 Payroll
            </Link>
          )}
        <Link
          to="/chatbot"
          className="menu-link"
        >
          💬 HR Assistant
        </Link>

        {(roleId === 1 ||
  roleId === 2 ||
  roleId === 3) && (
  <Link
    to="/recruitment"
    className="menu-link"
  >
    🎯 Recruitment AI
  </Link>
)}

<Link
  to="/jobs"
  className="menu-link"
>
  📋 Job Management
</Link>
          {(roleId === 1 ||
  roleId === 3) && (
  <Link
    to="/hiring-decisions"
    className="menu-link"
  >
    🏆 Hiring Decisions
  </Link>
)}

        {roleId === 1 && (
          <Link
            to="/users"
            className="menu-link"
          >
            👤 Users
          </Link>
        )}

      </div>

      {/* Bottom Section */}

      <div className="user-card">

  <div className="user-avatar">
    {roleId === 1
      ? "A"
      : roleId === 2
      ? "H"
      : roleId === 3
      ? "S"
      : "E"}
  </div>

  <div>

          <div>
            <div className="user-name">
              IntelliHR User
            </div>

            <div className="user-role">
              {roleName}
            </div>
          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/login";
          }}
          className="logout-btn"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;