import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // État pour la case à cocher
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  // Récupérer les informations des cookies lors du chargement du composant
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Coche la case automatiquement si les informations sont récupérées
    }
  }, []); // Le tableau vide [] garantit que cet effet est exécuté une seule fois, au montage du composant

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation des champs
    if (!email) {
      formErrors.email = "Email est requis";
    } else if (!validateEmail(email)) {
      formErrors.email = "Format d'email invalide";
    }

    if (!password) {
      formErrors.password = "Mot de passe est requis";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Assurez-vous d'échapper les données pour prévenir les attaques XSS
      const sanitizedEmail = email.replace(/[<>]/g, "");
      const sanitizedPassword = password.replace(/[<>]/g, "");

      axios
        .post(
          `${apiUrl}/login`,
          {
            email: sanitizedEmail,
            password: sanitizedPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setStatus("Connexion réussie !");
          const { userId, token } = response.data;

          if (rememberMe) {
            localStorage.setItem("email", email);
          } else {
            localStorage.remove("email");
          }
          localStorage.setItem("token", token);
          localStorage.setItem("id", userId);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          setStatus(
            `Erreur lors de l'inscription : ${error.response.data.message}`
          );
        });
    }
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Se souvenir de moi
          </label>
        </div>
        <div>
          <button type="submit">Connexion</button>
        </div>
      </form>
      <div>
        <Link to="/forgot-password">Mot de passe oublié ?</Link>
      </div>
      <p>{status}</p>
    </div>
  );
};

export default Login;
