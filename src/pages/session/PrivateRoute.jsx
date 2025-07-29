import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, rol } = useAuth();

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  if (allowedRoles && !allowedRoles.includes(rol)) {
    return <Navigate to="/login" replace={true} />;
  }

  // Si el usuario tiene token y el rol es permitido, renderiza el componente hijo
  return <Outlet />;
};

export default PrivateRoute;
