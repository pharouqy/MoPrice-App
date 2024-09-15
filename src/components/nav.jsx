import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Nav = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const logout = useLogout();

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
                <Link to="/home">Accueil</Link>
              </li>
              <li>
                <Link to={`/user/${id}`}>Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Inscription</Link>
              </li>
              <li>
                <Link to="/">Connexion</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {token ? (
            <>
              <li>
                <button onClick={() => logout()}>Déconnexion</button>
              </li>
            </>
          ) : (
            <>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
