import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setErrors("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setErrors("Les mots de passe ne correspondent pas.");
      return;
    }

    axios
      .post(`${apiUrl}/reset-password/${token}`, { password })
      .then((response) => {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
        setErrors("");
        setTimeout(() => {
          navigate("/");
        }, 3000); // Redirection après 3 secondes
      })
      .catch((error) => {
        setErrors("Erreur lors de la réinitialisation du mot de passe.");
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
          />
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
        </div>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit">Réinitialiser</button>
      </form>
    </div>
  );
};

export default ResetPassword;
