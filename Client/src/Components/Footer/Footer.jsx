import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1: Logo & Socials */}
        <div className={styles.column}>
          <h3 className={styles.logo}>
            CodeVerse<span>Hub</span>
          </h3>
          <p>
            Connect with peers, ask questions, and build technical answers
            together.
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div className={styles.column}>
          <h4>Useful Links</h4>
          <ul>
            <li>How it Works</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className={styles.column}>
          <h4>Contact Info</h4>
          <p>CodeVerse Hub</p>
          <p>support@codeversehub.com</p>
          <p>+1-123-456-7890</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
