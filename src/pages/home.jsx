import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const apiUrlPhone = import.meta.env.VITE_API_URL_PHONE;
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const currentYear = new Date().getFullYear();
  const depreciatingRate = 0.20;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
  };

  const calculateTheFinalPrice = (price, numbersOfYear, depreciatingRate) => {
    return Math.ceil(price * (1 - depreciatingRate) ** numbersOfYear);
  };

  useEffect(() => {
    if (year && price) {
      const numbersOfYear = currentYear - year;
      setFinalPrice(
        calculateTheFinalPrice(price, numbersOfYear, depreciatingRate)
      );
    }
  }, [currentYear, price, year]);

  // Fetching models of phones from an external API
  useEffect(() => {
    const fetchPhoneModels = async () => {
      try {
        const response = await axios.post("/api", options); // Replace with actual API endpoint
        const data = response.data;
        console.log(JSON.stringify(data));
        // Process and group models by brand (assuming the API provides this info)
        const groupedModels = data.reduce((brands, phone) => {
          const brand = phone.brand;
          if (!brands[brand]) {
            brands[brand] = [];
          }
          brands[brand].push(phone.model);
          return brands;
        }, {});

        setModels(groupedModels);
      } catch (error) {
        console.error("Error fetching phone models:", error);
      }
    };

    fetchPhoneModels();
  }, []);

  const generateYearOptions = () => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  return (
    <div className="home">
      <h1>Home</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="year">Year of sell</label>
        </div>
        <div>
          <select
            name="year"
            id="year"
            onChange={(e) => setYear(parseInt(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              Select year
            </option>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price of sell</label>
        </div>
        <div>
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="model">Phone Model</label>
        </div>
        <div>
          <select
            name="model"
            id="model"
            onChange={(e) => setSelectedModel(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select model
            </option>
            {Object.keys(models).map((brand) => (
              <optgroup key={brand} label={brand}>
                {models[brand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </form>
      <aside>
        <h2>
          The Final Price For The Buy in {currentYear} is : <span>{finalPrice}</span> Da
        </h2>
      </aside>
    </div>
  );
};

export default Home;
