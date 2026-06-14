import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        {/* Left Side Info Section */}
        <div className={styles.infoBox}>
          <p className={styles.tagline}>About the Platform</p>
          <h1>CodeVerse Hub</h1>
          <p className={styles.description}>
            A place where software engineers share ideas, solve programming
            bugs, and elevate their engineering standards together. Join your
            peer network today.
          </p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate("/register")}
          >
            Create an Account
          </button>
        </div>

        {/* Right Side Visual Block */}
        <div className={styles.visualBox}>
          <div className={styles.card}>
            <h3>Got Questions?</h3>
            <p>
              Post anonymously or with your handle and get answers within hours.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Share Knowledge</h3>
            <p>
              Earn credit and help fellow junior developers master core
              fundamentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
