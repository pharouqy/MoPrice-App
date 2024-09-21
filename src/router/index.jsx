import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthCheck from "../components/authCheck";
import Home from "../pages/home";
import User from "../pages/profil";
import Login from "../pages/login";
import Register from "../pages/register";
import Contact from "../pages/contact";
import Errors from "../pages/errors";
import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/resetPassword";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

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
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </>
  );
};

export default AppRouter;

