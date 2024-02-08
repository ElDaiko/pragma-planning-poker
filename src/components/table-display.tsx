import { useRouter } from "next/router";
import styles from "../styles/components/poker-table.module.scss"
import styles2 from "../styles/components/user-card.module.scss"
import { useUserContext } from "@/hooks/useUserContext";
import Usercard from "@/system-design/atoms/user-card";

import React from "react";

const TableDisplay = () => {
  const router = useRouter();
  const { partyName } = router.query;
  const { rolConText, userNameContext } = useUserContext();
  const adminList = []
  
  
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
          {partyName}
        </h1>
        <button className={`${styles["element3"]} ${styles["invite-button"]}`}>
          Invitar
        </button>
      </header>
      <main>
        <div className={styles["top-chairs"]}>top-chairs</div>
        <div className={styles["desk"]}></div>
        <div className={styles["desk2"]}></div>
        <div className={styles["desk3"]}></div>
        <div className={styles["left-chair"]}>left-chair</div>
        <div className={styles["rigth-chair"]}>rigth-chair</div>
        <div className={styles["botton-chairs"]}>
          <Usercard className={rolConText === "espectador" ? styles2["card-spectator"] : styles2["card-player"]}>{rolConText === "espectador" ? <p>{userNameContext.slice(0, 2).toUpperCase()}</p> : <></>}</Usercard>
        </div>
      </main>
      <div className={styles["card-title"]}>
        <h2>Elige una carta 👇</h2>
      </div>
      <footer>
        <div className={styles["card-numbers"]}>0</div>
        <div className={styles["card-numbers"]}>1</div>
      </footer>
    </div>
  );
};

export default TableDisplay;
