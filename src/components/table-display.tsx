import styles from "../styles/components/poker-table.module.scss";
import { useUserContext } from "@/hooks/useUserContext";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import { typesOfScores } from "@/utils/score-type";

import React, { useEffect, useState } from "react";

const TableDisplay = () => {
  const { rolConText } = useUserContext();
  const { classroomName, playersList, socket  } = usePartyContext();
  const cardNumbers = typesOfScores["fibonacci"];
  const [card, setCard] = useState<string | null>(null);

  useEffect(() => {
    if (card != null) {
      socket.emit("vote", { card: card });
    }
  }, [card]);
  

  return (
    <div className={`${styles["table-container"]}`}>
      <header>
        <img
          className={`${styles["element1"]} ${styles["table-container-logo"]}`}
          src="/images/ficha-de-poker.png"
        />
        <h1
          className={`${styles["element2"]} ${styles["table-container-title"]}`}
        >
          {classroomName}
        </h1>
        <button className={`${styles["element3"]} ${styles["invite-button"]}`}>
          Invitar
        </button>
      </header>
      <main>
        <div className={styles["desk"]}></div>
        <div className={styles["desk2"]}></div>
        <div className={styles["desk3"]}></div>
        {rolConText !== "" ? <Usercard></Usercard> : null}
      </main>
      <div className={styles["card-title"]}>
        <h2>Elige una carta 👇</h2>
      </div>
      <footer>
        {cardNumbers?.map((number, index) => (
          <div
            onClick={() => setCard(number)}
            key={index}
            className={styles["card-numbers"]}
          >
            {number}
          </div>
        ))}
      </footer>
    </div>
  );
};

export default TableDisplay;
