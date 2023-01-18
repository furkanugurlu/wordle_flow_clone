import React, { FC, useMemo, useState } from "react";
import CurrentGuess from "./CurrentGuess";
import NullGuess from "./NullGuess";
import PreviousGuess from "./PreviousGuess";
import styles from "./Wordle.module.css";

type WordleType = { wordle: string };
const Wordle: FC<WordleType> = ({ wordle }) => {
  if (wordle.length !== 5) {
    throw new Error("5 HARFLİ BİR KELİME YAMALASIN");
  }

  const [guess, setGuess] = useState<Array<string>>([]);
  const [guessAll, setGuessAll] = useState<Array<Array<string>>>([]);
  React.useEffect(() => {
    const handleKeyFunction = (e: KeyboardEvent) => {
      const letterCntrl = /^[a-z]$/.test(e.key);
      const backspace = e.key == "Backspace";
      const enter = e.key == "Enter";
      if (backspace) {
        setGuess(guess.filter((gss) => gss != guess[guess.length - 1]));
      } else if (letterCntrl && guess.length < 5) {
        setGuess((prev) => [...prev, e.key]);
      } else if (enter && guess.length == 5) {
        setGuessAll((prev) => [...prev, guess]);
        setGuess([]);
      }
    };
    window.addEventListener("keydown", handleKeyFunction);
    return () => {
      window.removeEventListener("keydown", handleKeyFunction);
    };
  }, [guess]);

  const refreshHandle = () => {
    setGuessAll([]);
    setGuess([]);
  };

  const isCorrect =
    guessAll.length > 0 && guessAll[guessAll.length - 1].join("") == wordle;
  const isFailuer = !isCorrect && guessAll.length == 6;

  const charMap = useMemo(() => {
    return wordle.split("").reduce<Record<string, number>>((acc, char) => {
      if (!acc.hasOwnProperty(char)) {
        acc[char] = 1;
      } else {
        acc[char] += 1;
      }
      return acc;
    }, {});
  }, [wordle]);

  return (
    <div className={styles.container}>
      <PreviousGuess wordle={wordle} guessAll={guessAll} charMap={charMap} />
      {!isCorrect && !isFailuer && <CurrentGuess guess={guess} />}
      {Array.from({ length: 6 - guessAll.length - (isCorrect ? 0 : 1) }).map(
        (_, i) => {
          return <NullGuess key={i} />;
        }
      )}
      <div className={styles.currentGuess}>
        {isCorrect && "Tahmininiz doğru"}
      </div>
      <div className={styles.failureGuess}>
        {isFailuer && "Tahmininiz hakkı doldu"}
      </div>

      <div onClick={() => refreshHandle()} className={styles.refreshGame}>
        Play Again
      </div>
    </div>
  );
};

export default Wordle;
