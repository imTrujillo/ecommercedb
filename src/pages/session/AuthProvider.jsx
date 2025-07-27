import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiServiceDelete, apiServicePost } from "../../API/apiService";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || []);

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = apiServicePost("login", data);

      if (response.status == 200) {
        setUser(response.data.username);
        setToken(response.data.token);

        if (response.data.rol == "admin") {
          setRol("admin");
          sessionStorage.setItem("token", {
            user: user,
            rol: "admin",
            token: response.data.token,
          });

          navigate("/admin");
          return;
        } else if (response.data.rol == "employee") {
          setRol("employee");
          sessionStorage.setItem("token", {
            user: user,
            rol: "employee",
            token: response.data.token,
          });

          navigate("/employee");
          return;
        }
      }
    } catch (error) {
      toast.error("Error", "Ocurrió un error :/");
    }
  };

  const logout = () => {
    const response = apiServiceDelete("logout", token);
    setUser("");
    setToken([]);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={(user, token, rol, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
