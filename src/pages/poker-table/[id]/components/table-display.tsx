import styles from "../../../../styles/components/poker-table.module.scss";
import { useUserContext } from "@/hooks/useUserContext";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import { typesOfScores } from "@/utils/score-type";

import React, { useEffect, useState } from "react";

const TableDisplay = () => {
  const { rolConText } = useUserContext();
  const { classroomName, socket } = usePartyContext();
  const cardNumbers = typesOfScores["fibonacci"];
  const [card, setCard] = useState<string | null>(null);

  useEffect(() => {
    if (card != null) {
      socket.emit("vote", { card: card });
    }
  }, [card]);

  return (
    <div className={`${styles["container"]}`}>
      <header>
        <img
          className={`${styles["container__logo"]}`}
          src="/images/ficha-de-poker.png"
        />
        <h1 className={`${styles["container__title"]}`}>{classroomName}</h1>
        <div className={`${styles["container__user"]}`}>
          <button className={`${styles["container__user-invite"]}`}>
            Invitar
          </button>
        </div>
      </header>
      <main>
        <div className={styles["container__desk"]}></div>
        <div className={styles["container__desk2"]}></div>
        <div className={styles["container__desk3"]}></div>
        <Usercard></Usercard>
      </main>

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
                className={styles["container__cards"]}
              >
                {number}
              </button>
            ))}
          </footer>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableDisplay;