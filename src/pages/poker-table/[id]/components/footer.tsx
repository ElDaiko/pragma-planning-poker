import React, { useEffect, useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";
import { typesOfScores } from "@/utils/score-type";
import { useUserContext } from "@/hooks/useUserContext";

export default function Footer() {
  const { rolConText } = useUserContext();
  const {
    amountOfVotes,
    averageVotes,
    revealCards,
    socket,
    allNonSpectatorVoted,
    contextCard, setContextCard, globalTypeOfScores
  } = usePartyContext();
  const cardNumbers = typesOfScores[globalTypeOfScores];

  useEffect(() => {
    if (contextCard != null) {
      socket.emit("vote", { card: contextCard });
    }
  }, [contextCard]);


  return (
    <>
      {(revealCards && allNonSpectatorVoted && amountOfVotes) ? (
        <>
          <footer>
            {amountOfVotes?.map((number, index) => (
              <div key={index}>
                <button className={styles["container__cards"]}>
                  {number.label}
                </button>
                <div>
                  {number.times > 1 ? (
                    <p>{number.times} votos</p>
                  ) : (
                    <p>{number.times} voto</p>
                  )}
                </div>
              </div>
            ))}
          </footer>
          <div className={styles["container__cards-average"]}>
            Promedio:<h1>{averageVotes}</h1>
          </div>
        </>
      ) : (
        <>
          {rolConText === "player" && (
            <>
              <div className={styles["container__cards-title"]}>
                <h2>Elige una carta 👇</h2>
              </div>
              <footer>
                {cardNumbers?.map((number, index) => (
                  <button
                    onClick={() => setContextCard(number)}
                    key={index}
                    className={`${styles["container__cards-vote"]} ${contextCard == number && styles["container__cards-vote--voted"]}`}
                  >
                    {number}
                  </button>
                ))}
              </footer>
            </>
          )}
        </>
      )}
    </>
  );
}
