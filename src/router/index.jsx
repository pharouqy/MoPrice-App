import { Routes, Route, Navigate } from "react-router-dom";
import AuthCheck from "../components/authCheck";
import Home from "../pages/home";
import User from "../pages/profil";
import Login from "../pages/login";
import Register from "../pages/register";
import Contact from "../pages/contact";
import Errors from "../pages/errors";
import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/resetPassword";

const AppRouter = () => {
  const token = !!localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route
          path="/user/:id"
          element={
            <AuthCheck>
              <User />
            </AuthCheck>
          }
        />
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </>
  );
};

export default AppRouter;
