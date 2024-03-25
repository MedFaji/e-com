import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Cart from "./pages/Cart";
import LoginRegister from "./pages/LoginRegister";
import kids_banner from "./assets/banner_kids.png";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import Footer from "./components/Footer/Footer";
import Product from "./pages/Product";
import { Children } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory category={"men"} banner={men_banner} />}
          />
          <Route
            path="/women"
            element={<ShopCategory category={"women"} banner={women_banner} />}
          />
          <Route
            path="/kids"
            element={<ShopCategory category={"kid"} banner={kids_banner} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/:category/product/:id" element={<Product />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
