import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RoleProtectedRoute({
  children,
  allowedRoles,
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  const decoded =
    jwtDecode(token);

  const roleId =
    decoded.role_id;

  if (
    !allowedRoles.includes(
      roleId
    )
  ) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  return children;
}

export default RoleProtectedRoute;