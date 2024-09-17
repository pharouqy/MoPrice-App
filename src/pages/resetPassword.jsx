import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!password) {
      newErrors.password = "Veuillez entrer un nouveau mot de passe.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(`${apiUrl}/reset-password/${token}`, { password })
      .then((response) => {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
        setErrors({});
        setTimeout(() => {
          navigate("/"); // Redirection après succès
        }, 3000);
      })
      .catch((error) => {
        setErrors({
          apiError: "Erreur lors de la réinitialisation du mot de passe.",
        });
        console.error(error.message);
      });
  };

  return (
    <div className="reset-password">
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
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
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        {errors.apiError && <p className="error">{errors.apiError}</p>}
        {message && (
          <p aria-live="polite" className="success-message">
            {message}
          </p>
        )}
        <button type="submit">Réinitialiser</button>
      </form>
    </div>
  );
};

export default ResetPassword;
