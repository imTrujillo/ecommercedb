import { createContext, useContext, useState, useEffect } from "react"; // Añadido useEffect
import { useNavigate } from "react-router-dom";
import { apiServiceDelete, apiServicePost } from "../../API/apiService";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Inicializa el estado desde sessionStorage al cargar el componente
  const getInitialAuthState = () => {
    try {
      const storedTokenData = sessionStorage.getItem("token");
      if (storedTokenData) {
        const parsedData = JSON.parse(storedTokenData);
        return {
          user: parsedData.user || null,
          rol: parsedData.rol || null,
          token: parsedData.token || null,
        };
      }
    } catch (error) {
      console.error("Error parsing token from sessionStorage:", error);
      // Limpia el sessionStorage si hay un error al parsear
      sessionStorage.removeItem("token");
    }
    return { user: null, rol: null, token: null };
  };

  const initialAuthState = getInitialAuthState();
  const [user, setUser] = useState(initialAuthState.user);
  const [rol, setRol] = useState(initialAuthState.rol);
  const [token, setToken] = useState(initialAuthState.token);

  const navigate = useNavigate();

  const login = async (data) => {
    try {
            const response = await apiServicePost("login", data);

      if (response && response.status === 200) {
        setUser(response.data.username);
        setRol(response.data.rol);
        setToken(response.data.token);

        //Guarda el objeto como una cadena JSON en sessionStorage
        sessionStorage.setItem(
          "token",
          JSON.stringify({
            user: response.data.username,
            rol: response.data.rol,
            token: response.data.token,
          })
        );

        if (response.data.rol === "admin") {
          navigate("/admin");
        } else if (response.data.rol === "employee") {
          navigate("/employee");
        } else {
          // Si el rol no es ni admin ni employee, puedes redirigir a una página por defecto o mostrar un mensaje
          navigate("/dashboard"); // Ejemplo: Redirigir a un dashboard genérico
        }
        toast.success("Inicio de sesión exitoso.");
      } else {
        // Manejo de errores si el status no es 200 o la respuesta es inesperada
        toast.error("Credenciales incorrectas o error en el servidor.");
        console.error("Login failed with status:", response?.status);
      }
    } catch (error) {
      // Captura errores de red o errores lanzados por apiServicePost
      console.error("Error durante el inicio de sesión:", error);
      toast.error("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  const logout = async () => {
    try {
      await apiServiceDelete("logout", token);
    } catch (error) {
      console.error("Error durante el logout en la API:", error);
      toast.error("Error al cerrar sesión en el servidor, pero su sesión local ha sido cerrada.");
    } finally {
      // Siempre limpia el estado y el sessionStorage localmente
      setUser(null);
      setRol(null);
      setToken(null);
      sessionStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    //Pasa los valores como un objeto
    <AuthContext.Provider value={{ user, token, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};