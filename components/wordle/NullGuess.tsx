import React from "react";
import styles from "./Wordle.module.css";

const NullGuess = () => {
  return (
    <div className={styles.cellContainer}>
      {Array.from({ length: 5 }).map((_, i) => {
        return <div className={styles.cell} key={i}></div>;
      })}
    </div>
  );
};

export default NullGuess;
