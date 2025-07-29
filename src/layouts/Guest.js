import { ToastContainer } from "react-toastify";
import style from "../css/Auth.module.css";

export default function App({ children }) {
  return (
    <>
      <main className={style.guestContainer}>{children}</main>
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
        theme="dark"
      />
    </>
  );
}
