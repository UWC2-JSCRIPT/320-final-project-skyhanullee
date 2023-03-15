import { createContext, useState } from "react";

const ThemeContext = createContext({
  themeName: ''
});

export default ThemeContext

export function ThemeController({ children }) {
  const [themeName, setThemeName] = useState('dark-mode');
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {/* everything inside of this provider is a child of ThemeContext */}
      {children}
    </ThemeContext.Provider>
  )
}
