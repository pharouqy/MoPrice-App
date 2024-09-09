import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email est requis";
    } else if (!validateEmail(email)) {
      formErrors.email = "Format d'email invalide";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const sanitizedEmail = email.replace(/[<>]/g, "");

      axios
        .post(`${apiUrl}/forgot-password`, { email: sanitizedEmail }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          setMessage("Un email de réinitialisation a été envoyé.");
        })
        .catch((error) => {
          setMessage(`Erreur: ${error.message}`);
        });
    }
  };

  return (
    <div className="forgot-password">
      <h1>Mot de passe oublié</h1>
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
          <button type="submit">Envoyer</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
