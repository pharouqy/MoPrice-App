import { Routes, Route } from "react-router-dom";
import AuthCheck from "../components/authCheck";
import Home from "../pages/home";
import Profil from "../pages/profil";
import Login from "../pages/login";
import Register from "../pages/register";
import Contact from "../pages/contact";
import Errors from "../pages/errors";

const AppRouter = () => {
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
          path="/profil/:id"
          element={
            <AuthCheck>
              <Profil />
            </AuthCheck>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </>
  );
};

export default AppRouter;
