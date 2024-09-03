import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
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
  return (
    <div className="menu">
      <div className="logo">
        <p>MoPrice</p>
      </div>
      <nav>
        <ul>
          {token ? (
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
