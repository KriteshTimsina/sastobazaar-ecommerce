import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-y7b1lfas1o860suw.us.auth0.com"
      clientId="k4hq0EnrHoYmeyDJUzX8QcocgWKd2WEc"
      authorizationParams={{
        redirect_uri: "https://sastobazaar.netlify.app",
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </BrowserRouter>
);
