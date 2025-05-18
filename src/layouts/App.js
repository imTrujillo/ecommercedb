import React from "react";
import Navbar from "./../assets/Navbar";
import { ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";

export default function App({ children }) {
  // ACTIVAR/DESACTIVAR MODO OSCURO PARA EL POP UP
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ToastContainer
        id="toast-popup"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
}
