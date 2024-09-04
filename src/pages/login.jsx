import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
          alert("Connexion réussie !");
          const { userId, token } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("id", userId);
          navigate("/home");
        })
        .catch((error) => {
          alert(`Erreur lors de l'inscription : ${error.message}`);
        });
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <Link to="/forgot-password">Mot de passe oublié ?</Link>
      </div>
    </div>
  );
};

export default Login;
