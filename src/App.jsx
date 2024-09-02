import AppRouter from "./router/index";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
