import { createContext, useState } from "react";

const ThemeContext = createContext({
  themeName: 'light'
});

export default ThemeContext

export function ThemeController({ children }) {
  const [themeName, setThemeName] = useState('light');
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {/* everything inside of this provider is a child of ThemeContext */}
      {children}
    </ThemeContext.Provider>
  )
}
