import React, { useEffect, useState } from "react";
import App from "../layouts/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index as InventaryIndex } from "../pages/inventary/Index";
import { Index as SuppliersIndex } from "../pages/suppliers/Index";
import { Index as ShopIndex } from "../pages/shop/Index";
import { Index as CategoriesIndex } from "../pages/categories/Index";
import { Index as OrdersIndex } from "../pages/orders/Index";
import { Index as CustomersIndex } from "../pages/customers/Index";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/inventario"
            element={
              <App>
                <InventaryIndex />
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
          <Route
            path="/pedidos"
            element={
              <App>
                <OrdersIndex />
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
            path="/"
            element={
              <App>
                <ShopIndex />
              </App>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
