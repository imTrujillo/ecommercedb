import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "../components/Search";

import {
  IconPackage,
  IconBox,
  IconBuildingStore,
  IconTruckDelivery,
  IconMoon,
  IconSun,
  IconSearch,
  IconPackages,
  IconUsersPlus,
  IconShoppingCart,
  IconLogin2,
  IconLogout2,
} from "@tabler/icons-react";
import { useAuth } from "../pages/session/AuthProvider";

export default function Navbar({ darkTheme, handleTheme }) {
  var location = useLocation();
  const { rol, logout, token } = useAuth();

  return (
    <nav>
      <header className="navbar d-md-none d-print-none">
        <div className="container-xl">
          {rol ? (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-menu"
              aria-controls="navbar-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : (
            ""
          )}

          <div className=" d-flex align-items-center flex-row gap-2">
            <button
              className="nav-link px-0"
              title={darkTheme ? "Modo claro" : "Modo oscuro"}
              onClick={handleTheme}
            >
              {darkTheme ? (
                <IconMoon size={24} stroke={2} />
              ) : (
                <IconSun size={24} stroke={2} />
              )}
            </button>
            <a
              className={`nav-item ${
                location.pathname === "/" ? "btn" : "d-none"
              }`}
              data-bs-toggle="offcanvas"
              href="#offcanvasEnd"
              role="button"
              aria-controls="offcanvasEnd"
            >
              <IconShoppingCart />
            </a>
            <form action="./" method="get" autoComplete="off" noValidate>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <IconSearch size={24} stroke={2} />
                </span>
                <input
                  type="text"
                  value=""
                  className="form-control"
                  placeholder="Buscar…"
                  aria-label="Search in website"
                />
              </div>
            </form>
            <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
              {/* <a href=".">
                <img
                  src="/logo.png"
                  width="110"
                  height="32"
                  alt="ECommerce"
                  className="z-1 navbar-brand-image theme-light-dark-fix"
                />
              </a> */}
              <div className="p-0 d-md-none align-self-center">
                {token ? (
                  <button
                    onClick={logout}
                    className="btn btn-outline-danger px-3 space-x-2"
                  >
                    <IconLogout2 />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-outline-success px-3 space-x-2"
                  >
                    <IconLogin2 />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className=" container-xl">
              <ul className="navbar-nav">
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                  <a href=".">
                    <img
                      src="/logo.png"
                      width="110"
                      height="32"
                      alt="ECommerce"
                      className="z-1 navbar-brand-image d-none d-md-block  theme-light-dark-fix"
                    />
                  </a>
                </h1>

                {rol ? (
                  <>
                    <li
                      className={`nav-item ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                    >
                      <Link to="/" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconBuildingStore size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Tienda </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/inventario" ? "active" : ""
                      }`}
                    >
                      <Link to="/inventario" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconPackage size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Inventario </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/categorias" ? "active" : ""
                      }`}
                    >
                      <Link to="/categorias" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconBox size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Categorías </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/proveedores" ? "active" : ""
                      }`}
                    >
                      <Link to="/proveedores" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconTruckDelivery size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Proveedores </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/pedidos" ? "active" : ""
                      }`}
                    >
                      <Link to="/pedidos" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconPackages size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Pedidos </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/clientes" ? "active" : ""
                      }`}
                    >
                      <Link to="/clientes" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <IconUsersPlus size={24} stroke={2} />
                        </span>
                        <span className="nav-link-title"> Clientes </span>
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              <div className="d-none d-md-flex flex-row gap-3">
                {/* ACTIVAR MODO CLARO/OSCURO */}
                <button
                  className="nav-link px-0"
                  onClick={handleTheme}
                  title={darkTheme ? "Modo claro" : "Modo oscuro"}
                >
                  {darkTheme ? (
                    <IconSun size={24} stroke={2} />
                  ) : (
                    <IconMoon size={24} stroke={2} />
                  )}
                </button>

                {/* CARRITO DE COMPRAS */}
                <a
                  className={`nav-item ${
                    location.pathname === "/" ? "btn" : "d-none"
                  }`}
                  data-bs-toggle="offcanvas"
                  href="#offcanvasEnd"
                  role="button"
                  aria-controls="offcanvasEnd"
                >
                  <IconShoppingCart />
                </a>

                {/* BUSCAR ITEM DE UNA TABLA */}
                <Search
                  tableIds={[
                    "table-categories",
                    "table-orders",
                    "table-inventary",
                    "table-customers",
                    "table-suppliers",
                  ]}
                />
                <div className="p-0 align-self-center">
                  {!token ? (
                    <Link
                      to="/login"
                      className="btn btn-outline-success px-3 space-x-2"
                    >
                      <IconLogin2 /> Iniciar Sesión
                    </Link>
                  ) : (
                    <button
                      onClick={logout}
                      className="btn btn-outline-danger px-3 space-x-2"
                    >
                      <IconLogout2 /> Cerrar Sesión
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}
