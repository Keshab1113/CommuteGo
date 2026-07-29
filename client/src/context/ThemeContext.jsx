// ThemeContext.js
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Always use dark mode - no toggle
  const [darkMode] = useState(true);

  useEffect(() => {
    // Always add dark class to body
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode: true, toggleDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
