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
      setStatus("All fields must be filled.");
      return;
    }

    // Validate the name
    if (!validateName(formData.name)) {
      setStatus("Name must contain only letters and be at least 2 characters long.");
      return;
    }

    // Validate the email
    if (!validateEmail(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setStatus("Sending...");
    try {
      const response = await axios.post(`${apiUrl}/contact`, formData);
      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset the form
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus(`Error occurred while sending the message: ${error.message}`);
    }
  };

  return (
    <div className="contact">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="message">Message</label>
        </div>
        <div>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Contact;
