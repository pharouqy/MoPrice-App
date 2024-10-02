import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Suppression des informations locales
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    try {
      await axios.get(
        `${apiUrl}/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // Redirection après la déconnexion réussie
      navigate("/");
    } catch (error) {
      console.log(`Erreur lors de la déconnexion : ${error.message}`);
    }
  };

  return logout;
};

export default useLogout;

