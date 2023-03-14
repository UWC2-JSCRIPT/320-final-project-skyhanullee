// import useTheme from "./useTheme";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import { Icon } from '@iconify/react';

function useTheme() {
  // this is a custom hook
  const theme = useContext(ThemeContext);
  return (theme)
}

function Button() {
  const { themeName, setThemeName } = useTheme()
  return (
    <button 
      id="theme-button"
      onClick={() => {
      themeName === 'dark'? (setThemeName('dark') ) : (setThemeName('light') )
      }}>
      <Icon 
        id="theme-icon"
        icon={
            themeName === 'dark' ? 
            "material-symbols:dark-mode" : "material-symbols:light-mode"
          }
      />
    </button>
  )
}
export default Button
