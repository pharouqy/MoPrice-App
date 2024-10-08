import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = "L'email est requis.";
    } else if (!validateEmail(email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    if (!name) {
      newErrors.name = "Le nom est requis.";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un chiffre.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post(
          `${apiUrl}/register`,
          {
            email: email,
            name: name,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setStatus("Inscription réussie !");
          setTimeout(() => {
            axios
            .post(
              `${apiUrl}/login`,
              {
                email: email,
                password: password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              const token = response.data.token;
              const userId = response.data.userId;
              localStorage.setItem("token", token);
              localStorage.setItem("id", userId);
              navigate("/home");
            })
            .catch((error) => {
              setStatus(`Erreur lors de la connexion : ${error.message}`);
            });
          }, 1000);
        })
        .catch((error) => {
          setStatus(`Erreur lors de l'inscription : ${error.message}`);
        });
    }
  };

  return (
    <div className="register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="instruction">
            Le mot de passe doit contenir au moins 8 caractères, dont une
            majuscule et un chiffre.
          </p>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <button type="submit">Inscription</button>
        </div>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Register;
