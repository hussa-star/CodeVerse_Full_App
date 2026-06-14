import React, { useState } from "react";
import Instance from "../../axiosConfig";
import styles from "./auth.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !firstname || !lastname || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const { data } = await Instance.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      // FIX: Set message FIRST so they see it
      setSuccess(data.message || "Registration successful!");

      // CLEAR FORM
      setUsername("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");

      // Delay navigation slightly so they can read the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
