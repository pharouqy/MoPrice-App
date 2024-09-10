import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const apiUrlPhone = import.meta.env.VITE_API_URL_PHONE;
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedDeviceImage, setSelectedDeviceImage] = useState(""); 
  const [showFinalPrice, setShowFinalPrice] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);
  const currentYear = new Date().getFullYear();
  const depreciatingRate = 0.2;

  useEffect(() => {
    axios
      .get(apiUrlPhone)
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching phone models", error);
      });
  }, [apiUrlPhone]);

  const calculateTheFinalPrice = (price, numbersOfYear, depreciatingRate) => {
    return Math.ceil(price * (1 - depreciatingRate) ** numbersOfYear);
  };

  const handleCalculatePrice = () => {
    if (year && price && selectedModel) {
      const numbersOfYear = currentYear - year;
      setFinalPrice(
        calculateTheFinalPrice(price, numbersOfYear, depreciatingRate)
      );
      setShowFinalPrice(true);
    }
  };

  const generateYearOptions = () => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 3) {
      const filtered = models.data.flatMap((brand) =>
        brand.device_list.filter((device) =>
          device.device_name.toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels([]);
    }
  };
  const handleModelSelect = (device) => {
    setSelectedModel(device.device_name);
    setSearchTerm(device.device_name);
    setSelectedDeviceImage(device.device_image);
    setFilteredModels([]);
  };

  return (
    <div className="home">
      <h1>Home</h1>
      <p className="presentation">
        Découvrez notre application révolutionnaire qui évalue la valeur de
        revente de votre smartphone après des années d&apos;utilisation.
      </p>
      <form action="" method="post">
        {/* Année d'achat */}
        <div>
          <label htmlFor="year">L&apos;année d&apos;achat du smartphone</label>
        </div>
        <div>
          <select
            name="year"
            id="year"
            onChange={(e) => setYear(parseInt(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              Séléctionner l&apos;année
            </option>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Le Prix d&apos;achat du smartphone neuf</label>
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Prix en dinars algériens"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="search">Rechercher un modèle</label>
        </div>
        <div>
          <input
            type="text"
            id="search"
            placeholder="Minimum 3 caractères"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {filteredModels.length > 0 && (
          <ul className="suggestions-list">
            {filteredModels.map((device) => (
              <li
                key={device.device_id}
                onClick={() => handleModelSelect(device)}
              >
                {device.device_name}
              </li>
            ))}
          </ul>
        )}
        {selectedDeviceImage && (
          <div className="selected-device-image">
            <img src={selectedDeviceImage} alt={selectedModel} />
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={handleCalculatePrice}
            className="button"
          >
            Calculer
          </button>
        </div>
      </form>
      {showFinalPrice && (
        <aside>
          <h2>
            Le prix final approximatif de revente en {currentYear} est de:{" "}
            <span>{finalPrice}</span> Dinars Algériens
          </h2>
        </aside>
      )}
    </div>
  );
};

export default Home;
