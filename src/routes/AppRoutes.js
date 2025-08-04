import App from "../layouts/App";
import Guest from "../layouts/Guest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index as InventaryIndex } from "../pages/inventary/Index";
import { Index as SuppliersIndex } from "../pages/suppliers/Index";
import { Index as ShopIndex } from "../pages/shop/Index";
import { Index as CategoriesIndex } from "../pages/categories/Index";
import { Index as OrdersIndex } from "../pages/orders/Index";
import { Index as CustomersIndex } from "../pages/customers/Index";
import { Index as EmployeesIndex } from "../pages/employees/Index";
import { Login } from "../pages/session/Login";
import { SignUp } from "../pages/session/Signup";
import { ForgotPassword } from "../pages/session/ForgotPassword";
import AuthProvider from "../pages/session/AuthProvider";
import PrivateRoute from "../pages/session/PrivateRoute";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* RUTAS DEL CLIENTE */}
            <Route
              path="/"
              element={
                <App>
                  <ShopIndex />
                </App>
              }
            ></Route>

            <Route
              path="/login"
              element={
                <Guest>
                  <Login />
                </Guest>
              }
            ></Route>

            <Route
              path="/sign-up"
              element={
                <Guest>
                  <SignUp />
                </Guest>
              }
            ></Route>

            <Route
              path="/forgotpassword"
              element={
                <Guest>
                  <ForgotPassword />
                </Guest>
              }
            ></Route>

            {/* RUTAS DEL ADMIN */}
            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route
                path="/empleados"
                element={
                  <App>
                    <EmployeesIndex />
                  </App>
                }
              ></Route>
              <Route
                path="/clientes"
                element={
                  <App>
                    <CustomersIndex />
                  </App>
                }
              ></Route>
              <Route
                path="/categorias"
                element={
                  <App>
                    <CategoriesIndex />
                  </App>
                }
              ></Route>
              <Route
                path="/proveedores"
                element={
                  <App>
                    <SuppliersIndex />
                  </App>
                }
              ></Route>
            </Route>

            {/* RUTAS DEL EMPLEADO */}
            <Route
              element={<PrivateRoute allowedRoles={["Employee", "Admin"]} />}
            >
              <Route
                path="/inventario"
                element={
                  <App>
                    <InventaryIndex />
                  </App>
                }
              ></Route>
            </Route>

            {/* RUTAS DEL CLIENTE */}
            <Route
              element={
                <PrivateRoute
                  allowedRoles={["Customer", "Employee", "Admin"]}
                />
              }
            >
              <Route
                path="/pedidos"
                element={
                  <App>
                    <OrdersIndex />
                  </App>
                }
              ></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
