import React, { useState } from "react";
import Instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await Instance.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid Email or Password");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* FIX: Only show paragraph if error is not empty */}
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
