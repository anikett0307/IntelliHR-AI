import "../styles/navbar.css";
import { jwtDecode } from "jwt-decode";

function Navbar() {

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
  roleName =
    "Administrator";
}
else if (roleId === 2) {
  roleName =
    "HR Recruiter";
}
else if (roleId === 3) {
  roleName =
    "Senior Manager";
}
else {
  roleName =
    "Employee";
}
    }

  } catch (error) {
    console.log(error);
  }

  const today =
    new Date()
      .toLocaleDateString();

  const currentTime =
    new Date()
      .toLocaleTimeString();

  const avatar =
  roleId === 1
    ? "A"
    : roleId === 2
    ? "H"
    : roleId === 3
    ? "S"
    : "E";

  return (
    <div className="navbar">

      <div>

        <div className="navbar-title">
          Welcome Back 👋
        </div>

        <div className="navbar-subtitle">
          Manage your workforce efficiently
        </div>

      </div>

      <div className="navbar-user">

        <div className="role-badge">
          {roleName}
        </div>

        <div className="navbar-info">

          <div>
            {today}
          </div>

          <div>
            {currentTime}
          </div>

        </div>

        <div className="user-badge">
          {avatar}
        </div>

      </div>

    </div>
  );
}

export default Navbar;