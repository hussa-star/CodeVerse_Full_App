import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import styles from "./Home.module.css";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider.jsx";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // 1. FETCH DATA FUNCTION
  // =========================
  async function fetchAllQuestions() {
    const token = localStorage.getItem("token");

    try {
      const { data } = await Instance.get("/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(data.questions || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load forum questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // 2. USE EFFECT (ON MOUNT)
  // =========================
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  // =========================
  // 3. LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ClipLoader color="#516cf0" size={60} />
        <p className={styles.loaderText}>Loading questions...</p>
      </div>
    );
  }

  // =========================
  // 4. ERROR STATE
  // =========================
  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  // =========================
  // 5. MAIN UI
  // =========================
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Dashboard Forum</h2>
        <div className={styles.welcomeBox}>
          <h1>
            Welcome <span>{user?.username}</span> 👋
          </h1>
          <p>Glad to see you back!</p>
        </div>
        <button onClick={() => navigate("/ask")} className={styles.askButton}>
          Ask Question
        </button>
      </div>

      {/* EMPTY STATE */}
      {questions.length === 0 ? (
        <p className={styles.empty}>No questions asked yet.</p>
      ) : (
        // QUESTIONS LIST
        <div className={styles.list}>
          {questions.map((q) => {
            const id = q.questionid || q.id;

            return (
              <div
                key={id}
                className={styles.card}
                onClick={() => navigate(`/answer/${id}`)}
              >
                <h3 className={styles.cardTitle}>{q.title}</h3>

                <p className={styles.cardContent}>
                  {q.content || q.description}
                </p>

                <small className={styles.cardMeta}>
                  Asked by:{" "}
                  <strong className={styles.cardAuthor}>{q.username}</strong>
                </small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
