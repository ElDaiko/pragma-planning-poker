import React, { useEffect, useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";
import { typesOfScores } from "@/utils/score-type";
import { useUserContext } from "@/hooks/useUserContext";


export default function Footer() {
  const { rolConText } = useUserContext();
  const { amountOfVotes, averageVotes, revealCards , socket} = usePartyContext();
  const cardNumbers = typesOfScores["fibonacci"];
  const [card, setCard] = useState<string | null>(null);

  useEffect(() => {
    if (card != null) {
      socket.emit("vote", { card: card });
    }
  }, [card]);

  return (
    <>
      {revealCards ? (
        <footer>
          {amountOfVotes?.map((number, index) => (
            <div key={index}>
              <button className={styles["container__cards"]}>
                {number.label}
              </button>
              <div>{number.times} votos</div>
            </div>
          ))}
          <div>Promedio {averageVotes}</div>
        </footer>
      ) : (
        <>
          {rolConText === "player" ? (
            <>
              <div className={styles["container__cards-title"]}>
                <h2>Elige una carta 👇</h2>
              </div>
              <footer>
                {cardNumbers?.map((number, index) => (
                  <button
                    onClick={() => setCard(number)}
                    key={index}
                    className={styles["container__cards-vote"]}
                  >
                    {number}
                  </button>
                ))}
              </footer>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
