import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, replace } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, rol } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
