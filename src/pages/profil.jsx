import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useLogout from "../hooks/useLogout";
import Cookies from "js-cookie";

const Profil = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const logout = useLogout();
  const token = localStorage.getItem("token");
  const [completeName, setCompleteName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch user data
    axios
      .get(`${apiUrl}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompleteName(response.data.name);
        setEmail(response.data.email);
        setInitialName(response.data.name);
        setInitialEmail(response.data.email);
      })
      .catch((error) => {
        setStatus(`Erreur lors de la recherche : ${error.message}`);
      });
  }, [apiUrl, id, token]);

  const handleFieldClick = (field) => {
    setEditingField(field); // Passe le champ en mode édition
  };

  const handleSaveField = (field) => {
    if (field === "name" && completeName === initialName) {
      setEditingField(null); // Ne fait rien si le nom n'a pas changé
      return;
    }
    if (field === "email" && email === initialEmail) {
      setEditingField(null); // Ne fait rien si l'email n'a pas changé
      return;
    }

    const updatedData = { [field]: field === "name" ? completeName : email };

    axios
      .put(`${apiUrl}/user/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setEditingField(null); // Quitte le mode édition après la sauvegarde
        setStatus(`${field} mis à jour avec succès`);

        // Met à jour les valeurs initiales après la sauvegarde
        if (field === "name") {
          setInitialName(completeName);
        } else if (field === "email") {
          setInitialEmail(email);
        }
      })
      .catch((error) => {
        setStatus(`Erreur lors de la mise à jour : ${error.message}`);
      });
  };

  const handlePasswordChange = () => {
    if (password === "") return;

    axios
      .put(
        `${apiUrl}/user/${id}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setPassword(""); // Réinitialise le champ du mot de passe après la mise à jour
        setStatus("Mot de passe mis à jour avec succès");
      })
      .catch((error) => {
        setStatus(
          `Erreur lors de la mise à jour du mot de passe : ${error.message}`
        );
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${apiUrl}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Cookies.remove("email");
        Cookies.remove("password");

        setStatus("Profil supprimé avec succès");
        logout();
      })
      .catch((error) => {
        setStatus(`Erreur lors de la suppression : ${error.message}`);
      });
  };

  return (
    <div className="profil">
      <h1>Profil</h1>
      <div>
        <ul>
          <li>
            Name:
            {editingField === "name" ? (
              <input
                type="text"
                value={completeName}
                onChange={(e) => setCompleteName(e.target.value)}
                onBlur={() => handleSaveField("name")} // Sauvegarde en quittant le champ
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveField("name"); // Sauvegarde en appuyant sur Enter
                }}
                autoFocus
              />
            ) : (
              <span onClick={() => handleFieldClick("name")}>
                {completeName}
              </span>
            )}
          </li>
          <li>
            Email:
            {editingField === "email" ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleSaveField("email")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveField("email");
                }}
                autoFocus
              />
            ) : (
              <span onClick={() => handleFieldClick("email")}>{email}</span>
            )}
          </li>
          <li>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Changer mot de passe</button>
          </li>
        </ul>
      </div>
      <div>
        <button onClick={handleDelete}>Supprimer</button>
      </div>
      <p>{status}</p>
    </div>
  );
};

export default Profil;
