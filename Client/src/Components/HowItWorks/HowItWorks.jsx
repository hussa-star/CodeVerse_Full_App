import React from "react";
import styles from "./HowItWorks.module.css";

function HowItWorks() {
  return (
    
    <section className={styles.container}>
      <div className={styles.heading}>
        <h2>How Our Platform Works</h2>
        <p>
          Connect with developers, ask coding questions, share solutions, and
          grow your software engineering skills together.
        </p>
      </div>

      <div className={styles.cards}>
        {/* Step 1 */}
        <div className={styles.card}>
          <div className={styles.number}>1</div>
          <h3>Ask Questions</h3>
          <p>
            Stuck on a bug or struggling with a concept? Post your question and
            describe your problem in detail.
          </p>
        </div>

        {/* Step 2 */}
        <div className={styles.card}>
          <div className={styles.number}>2</div>
          <h3>Receive Answers</h3>
          <p>
            Experienced developers and community members provide solutions,
            suggestions, and best practices.
          </p>
        </div>

        {/* Step 3 */}
        <div className={styles.card}>
          <div className={styles.number}>3</div>
          <h3>Share Knowledge</h3>
          <p>
            Help other developers by answering questions and sharing your coding
            experience.
          </p>
        </div>

        {/* Step 4 */}
        <div className={styles.card}>
          <div className={styles.number}>4</div>
          <h3>Grow Together</h3>
          <p>
            Learn modern technologies, improve problem-solving skills, and
            become a better developer every day.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
