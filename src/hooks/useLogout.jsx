// hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("id");

    axios
      .get(
        `${apiUrl}/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(`Erreur lors de la déconnexion : ${error.message}`);
      });
  };

  return logout;
};

export default useLogout;
