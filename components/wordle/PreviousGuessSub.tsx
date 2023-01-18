import React, { FC } from "react";
import styles from "./Wordle.module.css";

type previousGuessSubType = {
  all: Array<string>;
  wordle: string;
  charMap: Record<string, number>;
};

const PreviousGuessSub: FC<previousGuessSubType> = ({
  all,
  wordle,
  charMap,
}) => {
  const cMap = { ...charMap };
  return (
    <div className={styles.cellContainer}>
      {all.map((a, i) => {
        const wordleLetter: string = wordle[i];
        let greenCntrl = wordleLetter === a;
        let isPr = false;
        if (!greenCntrl && cMap[a]) {
          isPr = true;
          cMap[a] -= 1;
        }
        return (
          <div
            className={`${styles.cell} ${greenCntrl ? styles.green : ""} ${
              isPr ? styles.yellow : ""
            }`}
            key={i}
          >
            {a}
          </div>
        );
      })}
    </div>
  );
};

export default PreviousGuessSub;
