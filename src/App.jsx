import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import ScrollToTop from "./utils/ScrollToTop";
import CartProvider from "./context/cartContext";
function App() {
  const [isNavbarExtended, setIsNavbarExtended] = useState(false);
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar
          isNavbarExtended={isNavbarExtended}
          setIsNavbarExtended={setIsNavbarExtended}
        />
        <div className="" onClick={() => setIsNavbarExtended(false)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
