import { createContext, useState, useContext, useEffect } from "react";

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  useEffect(() => {
    const isDarkTheme = localStorage.getItem("isDarkTheme");
    setIsDarkTheme(JSON.parse(isDarkTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
