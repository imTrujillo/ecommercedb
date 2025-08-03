import { createContext, useContext, useState, useEffect } from "react"; // Añadido useEffect
import { useNavigate } from "react-router-dom";
import { apiServiceDelete, apiServicePost } from "../../API/apiService";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const stored = sessionStorage.getItem("token");
    return stored ? JSON.parse(stored) : null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    const stored = sessionStorage.getItem("refreshToken");
    return stored ? JSON.parse(stored) : null;
  });

  const [rol, setRol] = useState(() => {
    const stored = sessionStorage.getItem("rol");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const navigate = useNavigate();

  const signup = async (data, rol) => {
    try {
      const response = await apiServicePost(`auth/register/${rol}`, data);

      if (response.status >= 200 && response.status < 300) {
        login({ username: data.username, password: data.password });
        toast.success("Usuario creado exitosamente.");
      } else {
        throw { response };
      }
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        error.response.data.forEach((err) => {
          const prop = err.property || "Campo";
          const message = err.error || "Error desconocido";
          toast.error(`${prop}: ${message}`);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocurrió un error al intentar registrarte.");
      }
    }
  };

  const login = async (data) => {
    try {
      const response = await apiServicePost("auth/login", data);

      if (response.status >= 200 && response.status < 300) {
        const { refreshToken, accessToken, user } = response.data;

        setUser(user.username);
        setRol(user.role);
        setToken(accessToken);
        setRefreshToken(refreshToken);

        sessionStorage.setItem("user", JSON.stringify(user.username));
        sessionStorage.setItem("rol", JSON.stringify(user.role));
        sessionStorage.setItem("token", JSON.stringify(accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));

        navigate("/inventario");
        toast.success("Inicio de sesión exitoso.");
      } else {
        throw { response };
      }
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        error.response.data.forEach((err) => {
          const prop = err.property || "Campo";
          const message = err.error || "Error desconocido";
          toast.error(`${prop}: ${message}`);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error al iniciar sesión.");
      }
    }
  };

  const setNewPassword = async (data) => {
    try {
      const response = await apiServicePost("auth/reset-password", data);

      if (response && response.status >= 200 && response.status < 300) {
        navigate("/login");
        toast.success("Contraseña actualizada exitosamente.");
      } else {
        throw { response };
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error al cambiar la contraseña.");
      }
    }
  };

  const logout = async () => {
    try {
      const body = {
        accessToken: token,
        refreshToken: refreshToken,
      };
      await apiServicePost("auth/logout", body, token);
      toast.success("Sesión cerrada.");
    } catch (error) {
      console.error("Error durante el logout en la API:", error);
    } finally {
      setUser(null);
      setRol(null);
      setToken(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("rol");
      navigate("/");
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    //Pasa los valores como un objeto
    <AuthContext.Provider
      value={{ user, token, rol, signup, setNewPassword, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
