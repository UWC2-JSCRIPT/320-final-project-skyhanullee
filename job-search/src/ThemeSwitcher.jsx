import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import ThemeContext from "./ThemeContext"
// import ThemeContext from "../contexts/ThemeContext"
// import Moon from "../images/moon.svg"
// import Sun from "../images/sun.svg"
import { Icon } from '@iconify/react';

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="button-theme"
    >
      <img
        src={theme === "dark" ? <Icon icon="material-symbols:light-mode" /> : <Icon icon="material-symbols:dark-mode" />}
        className="theme-icon"
        alt="theme"
      />
    </Button>
  )
}

export default ThemeSwitcher
