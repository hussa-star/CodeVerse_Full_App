import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import styles from "./AskQuestion.module.css";

function AskQuestion() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await Instance.post(
        "/questions",
        {
          title,
          description,
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(data.message);

      setTitle("");
      setDescription("");
      setTag("");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to create question");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Ask Question</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          placeholder="Enter a clear and short title (e.g. How to fix login error?)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your full question here in detail. Include what you tried and what happened. Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Add tags separated by commas (e.g. react, nodejs, mysql)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button type="submit">
          {loading ? <ClipLoader size={20} color="#fff" /> : "Post Question"}
        </button>
      </form>
    </div>
  );
}

export default AskQuestion;
