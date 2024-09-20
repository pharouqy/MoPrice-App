import AppRouter from "./router/index";
import "@fontsource/playwrite-cu";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
