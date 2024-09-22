// src/components/AuthCheck.js
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthCheck = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Rediriger vers la page de connexion si le token n'est pas présent
    return <Navigate to="/login" />;
  }

  // Rendre les enfants si le token est présent
  return token ? children : null;
};

AuthCheck.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCheck;
