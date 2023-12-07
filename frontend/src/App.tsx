import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/auth/UserProfile";
import UserProvider, { useUser } from "./contexts/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect, useState } from "react";


const App = () => {
  const [user,setUser] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem("user");
    console.log(token,"hi")
    if(token){
       setUser(token)
    }
  },[])

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute token={user} />}>
            <Route path="/" element={<UserProfile token={user}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
