import { createContext, useState, useContext } from "react";

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

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
