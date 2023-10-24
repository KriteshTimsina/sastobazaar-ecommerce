import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import ScrollToTop from "./utils/ScrollToTop";
import CartProvider from "./context/cartContext";
import { useTheme } from "./context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import Protected from "./utils/ProtectedRoute";
import Checkout from "./pages/checkout/Checkout";
import Success from "./pages/checkout/Success";
import Error from "./pages/404/Error";
import Footer from "./components/Footer";
import Wishlist from "./pages/wishlist/WishlistPage";
function App() {
  const [isNavbarExtended, setIsNavbarExtended] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const { isDarkTheme } = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className={`${isDarkTheme ? "dark" : "light"}`}>
      <CartProvider>
        <ScrollToTop />
        <Navbar
          {...{
            isNavbarExtended,
            setIsNavbarExtended,
            toggleProfile,
            setToggleProfile,
          }}
        />
        <div
          onClick={() => {
            setIsNavbarExtended(false), setToggleProfile(false);
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route
              path="/cart"
              element={
                <Protected {...{ isAuthenticated, loginWithRedirect }}>
                  <Cart />
                </Protected>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>

        {(pathname === "/product" || pathname === "/") && <Footer />}
      </CartProvider>
    </div>
  );
}

export default App;
