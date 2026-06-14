import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import styles from "./ProtectedRoute.module.css";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("AUTH RESULT:", isAuth);

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    async function checkUser() {
      try {
        await Instance.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ClipLoader size={50} color="#516cf0" />
        <p className={styles.loaderText}>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
