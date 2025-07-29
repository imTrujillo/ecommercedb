import React, { useEffect, useState } from "react";
import Navbar from "./../assets/Navbar";
import { ToastContainer } from "react-toastify";
import { useLocation, useSearchParams } from "react-router-dom";

export default function App({ children }) {
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const themeParam = searchParams.get("theme");
    if (themeParam === "light" || themeParam === "dark") {
      const newTheme = themeParam === "dark";
      if (newTheme !== darkTheme) {
        setDarkTheme(newTheme);
      }
    }

    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme, searchParams]);

  const handleTheme = () => {
    const newTheme = !darkTheme;
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    window.location.href = newTheme ? "?theme=dark" : "?theme=light";
  };

  const toastTheme = darkTheme ? "dark" : "light";

  return (
    <>
      <Navbar darkTheme={darkTheme} handleTheme={handleTheme} />

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
        theme={toastTheme}
      />
    </>
  );
}
