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
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to={`/user/${id}`}>Profil</Link>
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
          {token ? (
            <>
              <li>
                <button onClick={() => logout()}>Logout</button>
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
