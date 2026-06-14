import React, { useEffect, useState } from "react";
import styles from "./DarkModeToggle.module.css";

function DarkModeToggle() {
  // 🔥 Default is TRUE (dark mode on first load)
  const [darkMode, setDarkMode] = useState(true);

  // Apply theme on first load
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");

    // If user already saved preference → use it
    // Otherwise default is DARK
    if (saved === "false") {
      setDarkMode(false);
      document.body.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  }, []);

  const toggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <button className={styles.DarkModeToggle} onClick={toggle}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
