import React, { FC } from "react";
import styles from "./Wordle.module.css";

type currentGuessType = {
  guess: Array<string>;
};
const CurrentGuess: FC<currentGuessType> = ({ guess }) => {
  return (
    <div className={styles.cellContainer}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div className={styles.cell} key={i}>
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
};

export default CurrentGuess;
