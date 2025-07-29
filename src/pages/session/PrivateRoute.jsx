import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, rol } = useAuth();

  if (!token) {
    // Si no hay token, redirige al usuario a la página de inicio ('/')
    return <Navigate to="/" replace={true} />;
  }

  // Si hay un token pero el rol no está permitido para esta ruta
  if (allowedRoles && !allowedRoles.includes(rol)) { // Añadida verificación 'allowedRoles'
    // Redirige al usuario a la página de login (o a una página de acceso denegado)
    return <Navigate to="/login" replace={true} />;
  }

  // Si el usuario tiene token y el rol es permitido, renderiza el componente hijo
  return <Outlet />;
};

export default PrivateRoute;