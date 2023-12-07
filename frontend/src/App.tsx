import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import UserProfile from "./pages/auth/UserProfile";

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<UserProfile />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  </BrowserRouter>
};

export default App;
