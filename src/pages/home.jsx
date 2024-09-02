import { useState, useEffect } from "react";

const Home = () => {
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const currentYear = new Date().getFullYear();
  const numbersOfYear = currentYear - year;
  const depreciatingRate = 0.20;
  const calculateTheFinalPrice = (price, numbersOfYear, depreciatingRate) => {
    return Math.ceil(price * (1 - depreciatingRate) ** numbersOfYear);
  };
  useEffect(() => {
    setFinalPrice(
      calculateTheFinalPrice(price, numbersOfYear, depreciatingRate)
    );
  }, [price, numbersOfYear]);
  return (
    <div className="home">
      <h1>Home</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="year">Year of sell</label>
        </div>
        <div>
          <input
            type="text"
            name="year"
            id="year"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price of sell</label>
        </div>
        <div>
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </form>
      <aside>
        <h2>
          The Final Price For The Resell is : <span>{finalPrice}</span> Da
        </h2>
      </aside>
    </div>
  );
};

export default Home;
