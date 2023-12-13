import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState(storedTheme ? JSON.parse(storedTheme) : false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.isDarkMode;
};

export const useToggleTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useToggleTheme must be used within a ThemeProvider");
  }
  return context.toggleTheme;
};
