import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const apiUrlPhone = import.meta.env.VITE_API_URL_PHONE; // URL de l'API pour récupérer les modèles de téléphones
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [models, setModels] = useState({}); // État pour stocker les modèles de téléphones
  const [selectedModel, setSelectedModel] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedDeviceImage, setSelectedDeviceImage] = useState(""); // Stocke l'image du téléphone sélectionné
  const [showFinalPrice, setShowFinalPrice] = useState(false); // Pour afficher le prix final après que l'utilisateur a rempli tous les champs
  const currentYear = new Date().getFullYear();
  const depreciatingRate = 0.2; // Taux de dépréciation

  // API request to get phone models
  useEffect(() => {
    axios
      .get(apiUrlPhone)
      .then((response) => {
        setModels(response.data); // Stocke les modèles récupérés depuis l'API
      })
      .catch((error) => {
        console.error("Error fetching phone models", error); // Gère les erreurs lors de la requête
      });
  }, [apiUrlPhone]);

  // Calcul du prix final
  const calculateTheFinalPrice = (price, numbersOfYear, depreciatingRate) => {
    return Math.ceil(price * (1 - depreciatingRate) ** numbersOfYear);
  };

  // Fonction pour calculer le prix seulement quand l'utilisateur appuie sur "Calculate"
  const handleCalculatePrice = () => {
    if (year && price && selectedModel) {
      const numbersOfYear = currentYear - year;
      setFinalPrice(
        calculateTheFinalPrice(price, numbersOfYear, depreciatingRate)
      );
      setShowFinalPrice(true); // Montre le prix final
    }
  };

  // Génère les options pour les années
  const generateYearOptions = () => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Fonction appelée lorsque l'utilisateur sélectionne un modèle de téléphone
  const handleModelChange = (e) => {
    const selectedDeviceKey = e.target.value;
    setSelectedModel(selectedDeviceKey);

    // Trouver l'image du téléphone sélectionné
    models.data.forEach((brand) => {
      brand.device_list.forEach((device) => {
        if (device.device_name === selectedDeviceKey) {
          setSelectedDeviceImage(device.device_image); // Stocke l'image du téléphone sélectionné
        }
      });
    });
  };

  return (
    <div className="home">
      <h1>Home</h1>
      <p className="presentation">
        Découvrez notre application révolutionnaire qui évalue la valeur de
        revente de votre smartphone après des années d&apos;utilisation. Grâce à
        un algorithme intelligents, elle analyse le prix approximative pour
        vendre sans se tromper, elle fournis une estimation précise et juste.
        Que vous cherchiez à vendre ou à acheter, cette application vous guide
        avec transparence et simplicité, pour vous assurer de faire la meilleure
        affaire. Ne laissez pas l&apos;incertitude freiner vos transactions,
        obtenez la vraie valeur de votre téléphone en un clin d&apos;œil !
      </p>
      <form action="" method="post">
        {/* Année de vente */}
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

        {/* Prix de vente */}
        <div>
          <label htmlFor="price">Le Prix d&apos;achat du smartphone neuf</label>
        </div>
        <div>
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>

        {/* Modèle de téléphone */}
        <div>
          <label htmlFor="model">Le model du télephone</label>
        </div>
        <div>
          <select
            name="model"
            id="model"
            onChange={handleModelChange}
            defaultValue=""
          >
            <option value="" disabled>
              Séléctionner le model
            </option>
            {/* Les modèles seront affichés ici si récupérés depuis l'API */}
            {models.data &&
              models.data.map((brand) => (
                <optgroup key={brand.brand_id} label={brand.brand_name}>
                  {brand.device_list.map((device) => (
                    <option key={device.device_id} value={device.device_name}>
                      {device.device_name}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>
        </div>

        {/* Affichage de l'image du téléphone sélectionné */}
        {selectedDeviceImage && (
          <div className="selected-device-image">
            <img src={selectedDeviceImage} alt={selectedModel} />
          </div>
        )}

        {/* Bouton pour calculer le prix */}
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

      {/* Affichage du prix final si tout est rempli */}
      {showFinalPrice && (
        <aside>
          <h2>
            Le prix final approximative de re-vente en {currentYear} est de:{" "}
            <span>{finalPrice}</span> Dinars Algériens
          </h2>
        </aside>
      )}
    </div>
  );
};

export default Home;
