import React, { FC } from "react";
import PreviousGuessSub from "./PreviousGuessSub";
import styles from "./Wordle.module.css";

type previousGuessType = {
  guessAll: Array<Array<string>>;
  wordle: string;
  charMap: Record<string, number>;
};
const PreviousGuess: FC<previousGuessType> = ({
  guessAll,
  wordle,
  charMap,
}) => {
  return (
    <>
      {guessAll.map((all, i) => {
        return (
          <div key={i}>
            <PreviousGuessSub wordle={wordle} all={all} charMap={charMap} />
          </div>
        );
      })}
    </>
  );
};

export default PreviousGuess;
