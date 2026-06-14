import React, { useState } from "react";
// Import useNavigate to change pages when buttons are clicked
import { useNavigate } from "react-router-dom";
// Import our CSS module styles
import styles from "./Header.module.css";
// import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

// import icons for mobile menu
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  // Simple function to handle logout by clearing the token
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Check if user is logged in to conditionally change the button
  const isLoggedIn = !!localStorage.getItem("token");

  // mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Side: Brand Logo / Name */}
        <div className={styles.logo} onClick={() => navigate("/")}>
          CodeVerse<span>Hub</span>
        </div>

        {/* Mobile Menu Icon */}
        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Right Side: Navigation Links */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <p
            onClick={() => {
              navigate("/home");
              setMenuOpen(false);
            }}
          >
            Home
          </p>

          <p
            onClick={() => {
              navigate("/how-it-works");
              setMenuOpen(false);
            }}
          >
            How it Works
          </p>

          <p className={styles.darkModeToggle}>
            <DarkModeToggle />
          </p>

          {/* If logged in show Logout, otherwise show Login */}
          {isLoggedIn ? (
            <button
              className={styles.authBtn}
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Log Out
            </button>
          ) : (
            <button
              className={styles.authBtn}
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
