import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Name should only contain letters and be at least 2 characters long
    const nameRegex = /^[A-Za-z]{2,}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    // Check if fields are empty
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Tous les champs doivent être remplis.");
      return;
    }

    // Validate the name
    if (!validateName(formData.name)) {
      setStatus(
        "Le nom doit contenir uniquement des lettres et avoir au moins 2 caractères."
      );
      return;
    }

    // Validate the email
    if (!validateEmail(formData.email)) {
      setStatus("Veuillez entrer une adresse email valide.");
      return;
    }

    setStatus("Envoi en cours...");
    try {
      const response = await axios.post(`${apiUrl}/contact`, formData);
      if (response.status === 200) {
        setStatus("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" }); // Reset the form
      } else {
        setStatus("Échec de l'envoi du message.");
      }
    } catch (error) {
      setStatus(
        `Une erreur est survenue lors de l'envoi du message : ${error.message}`
      );
    }
  };

  return (
    <div className="contact">
      <h1>Contact</h1>
      <p className="contact-form">
        Si vous rencontrez des bugs ou si vous avez besoin de plus
        d&apos;informations, n&apos;hésitez pas à m&apos;envoyer un message.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Votre nom</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Votre email</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Votre message</label>
        </div>
        <div>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Envoyer le message</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Contact;
