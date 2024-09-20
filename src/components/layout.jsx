import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "../styles/header.css";
import PropTypes from "prop-types";
import "../styles/footer.css";

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const logout = useLogout();
  const currentYear = new Date().getFullYear();
  return (
    <>
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
                  <Link to={`/user/${id}`}>Profil</Link>
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
              <></>
            )}
          </ul>
        </nav>
      </div>{" "}
      {children}
      <footer>
        <div className="footer">
          <p className="footer-text">Copyright {currentYear} Moprice</p>
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
