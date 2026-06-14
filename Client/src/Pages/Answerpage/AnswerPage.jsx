import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Instance from "../../axiosConfig";
import styles from "./AnswerPage.module.css";
import { ClipLoader } from "react-spinners";

function AnswerPage() {
  // =========================
  // ROUTE PARAM
  // =========================
  const { questionId } = useParams();

  // =========================
  // STATES
  // =========================
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // FETCH QUESTION
  // =========================
  async function fetchQuestion() {
    const token = localStorage.getItem("token");

    const { data } = await Instance.get(`/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setQuestion(data.question);
  }

  // =========================
  // FETCH ANSWERS
  // =========================
  async function fetchAnswers() {
    const token = localStorage.getItem("token");

    const { data } = await Instance.get(`/answers/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAnswers(data.answers || []);
  }

  // =========================
  // LOAD PAGE DATA
  // =========================
  async function loadPageData() {
    try {
      setLoading(true);
      setError("");

      await fetchQuestion();
      await fetchAnswers();
    } catch (error) {
      setError(
        error?.response?.data?.message || "Failed to load question details",
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // RUN ON PAGE LOAD
  // =========================
  useEffect(() => {
    loadPageData();
  }, [questionId]);

  // =========================
  // POST ANSWER
  // =========================
  async function handlePostAnswer(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!newAnswer.trim()) {
      setError("Please write your answer");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await Instance.post(
        "/answers",
        {
          answer: newAnswer,
          questionid: questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Answer posted successfully");

      setNewAnswer("");

      // Refresh answers list
      fetchAnswers();
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to post answer");
    }
  }

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ClipLoader size={50} color="#516cf0" />
        <p className={styles.loaderText}>Loading...</p>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className={styles.container}>
      <Link to="/home" className={styles.backLink}>
        ◀ Back to Dashboard
      </Link>

      {error && <p className={styles.error}>{error}</p>}

      {success && <p className={styles.success}>{success}</p>}

      {/* QUESTION */}
      <div className={styles.questionCard}>
        <h2 className={styles.questionTitle}>{question.title}</h2>

        <p className={styles.questionContent}>{question.content}</p>

        <small className={styles.questionAuthor}>
          Asked By: {question.username}
        </small>
      </div>

      {/* ANSWERS */}
      <div className={styles.answersSection}>
        <h3>Community Answers</h3>

        {answers.length === 0 ? (
          <p className={styles.noAnswers}>No answers yet.</p>
        ) : (
          answers.map((answer) => (
            <div key={answer.answerid} className={styles.answerCard}>
              <strong>{answer.username}</strong>

              <p>{answer.answer}</p>
            </div>
          ))
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handlePostAnswer} className={styles.answerForm}>
        <h3>Your Answer</h3>

        <textarea
          className={styles.textarea}
          placeholder="Write your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />

        <button type="submit" className={styles.button}>
          Post Answer
        </button>
      </form>
    </div>
  );
}

export default AnswerPage;
