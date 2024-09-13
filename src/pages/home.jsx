import { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/pdfRendering";

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
  const depreciatingRate = 0.15;
  const [condition, setCondition] = useState(3); // Valeur initiale : "Good condition"

  const getConditionLabel = (value) => {
    switch (value) {
      case 1:
        return "Neuf";
      case 2:
        return "Comme neuf";
      case 3:
        return "Bonne condition";
      case 4:
        return "Condition acceptable";
      case 5:
        return "Mauvaise condition";
      default:
        return "Good condition";
    }
  };

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

  const calculateTheFinalPrice = (
    price,
    numbersOfYear,
    depreciatingRate,
    condition
  ) => {
    return (
      Math.ceil(price * (1 - depreciatingRate) ** numbersOfYear) *
      (1 - condition / 10)
    ).toFixed(2);
  };

  const handleCalculatePrice = () => {
    if (year && price && selectedModel) {
      const numbersOfYear = currentYear - year;
      setFinalPrice(
        calculateTheFinalPrice(
          price,
          numbersOfYear,
          depreciatingRate,
          condition
        )
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
            step="1000"
            type="number"
            name="price"
            placeholder="Prix en dinars algériens"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="conditionRange">Condition du smartphone :</label>
        </div>
        <div>
          <input
            type="range"
            id="conditionRange"
            name="condition"
            min="1"
            max="5"
            step="1"
            value={condition}
            onChange={(e) => setCondition(parseInt(e.target.value))}
          />
          <span>{getConditionLabel(condition)}</span>
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
            Le prix final approximatif de revente du {selectedModel} en{" "}
            {currentYear} est de: <span>{finalPrice}</span> Dinars Algériens
          </h2>
          <p>
            <PDFDownloadLink
              document={
                <MyDocument
                  model={selectedModel}
                  image={selectedDeviceImage}
                  finalPrice={finalPrice}
                  year={year}
                />
              }
              fileName="estimation_smartphone.pdf"
            >
              {({ loading }) =>
                loading ? "Téléchargment du document ..." : "Obtenir le résultat en document format PDF"
              }
            </PDFDownloadLink>
          </p>
        </aside>
      )}
    </div>
  );
};

export default Home;
