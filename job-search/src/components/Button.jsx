// import useTheme from "./useTheme";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Icon } from '@iconify/react';

function useTheme() {
  // this is a custom hook
  const theme = useContext(ThemeContext);
  return (theme)
}

function Button() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  return (
    <button 
      id="theme-button"
      onClick={() => {
        themeName === 'dark-mode' ? setThemeName('light-mode') : setThemeName('dark-mode')
        console.log('theme icon clicked');
      }}>
      <Icon 
        id="theme-icon"
        icon={
            themeName === 'dark-mode' ? 
            "material-symbols:dark-mode" : "material-symbols:light-mode"
          }
      />
    </button>
  )
}
export default Button
