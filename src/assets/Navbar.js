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
} from "@tabler/icons-react";

export default function Navbar() {
  var location = useLocation();

  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "light";
  document.documentElement.classList.remove("theme-light", "theme-dark");
  document.documentElement.classList.add(`theme-${theme}`);

  document.querySelectorAll(".hide-theme-light").forEach((el) => {
    el.style.display = theme === "light" ? "none" : "";
  });
  document.querySelectorAll(".hide-theme-dark").forEach((el) => {
    el.style.display = theme === "dark" ? "none" : "";
  });

  return (
    <nav>
      <header className="navbar d-md-none d-print-none">
        <div className="container-xl">
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

          <div className=" d-flex flex-row gap-3">
            <button
              className="nav-link px-0 hide-theme-dark"
              title="Modo oscuro"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              onClick={() => {
                window.location.href = "?theme=dark";
              }}
            >
              <IconMoon size={24} stroke={2} />
            </button>
            <button
              className="nav-link px-0 hide-theme-light"
              title="Modo claro"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              onClick={() => {
                window.location.href = "?theme=light";
              }}
            >
              <IconSun size={24} stroke={2} />
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
            <form action="./" method="get" autocomplete="off" novalidate>
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
          </div>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src="/logo.png"
                width="110"
                height="32"
                alt="ECommerce"
                className="z-1 navbar-brand-image  theme-light-dark-fix"
              />
            </a>
          </h1>
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
              </ul>
              <div className="d-none d-md-flex flex-row gap-3">
                {/* ACTIVAR MODO CLARO/OSCURO */}
                <a
                  href="?theme=light"
                  className="nav-link px-0 hide-theme-light"
                  title="Activar modo claro"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  <IconSun size={24} stroke={2} />
                </a>
                <a
                  href="?theme=dark"
                  className="nav-link px-0 hide-theme-dark"
                  title="Activar modo oscuro"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  <IconMoon size={24} stroke={2} />
                </a>

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
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}
