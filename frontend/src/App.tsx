import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/auth/UserProfile";
import  { useUser } from "./contexts/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import ProductsListing from "./pages/product/ProductsListing";


const App = () => {
  const {saveUserToken} = useUser()
  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      saveUserToken(foundUser);
    }
  }, [loggedInUser])

  return (
      <BrowserRouter>
        <Sidebar>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute  />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsListing />} />
          </Route>
        </Routes>
        </Sidebar>
      </BrowserRouter>
  );
};

export default App;
