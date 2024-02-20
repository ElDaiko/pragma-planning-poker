import React, { useEffect, useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import Footer from "./footer";

const TableDisplay = () => {
  const[allVote, setAllVote] = useState(Boolean)
  const {
    classroomName,
    socket,
    isOwner,
    playersList,
    amountOfVotes,
  } = usePartyContext();

  

  function handleRevealCards() {
    socket.emit("reveal-cards");
  }

  useEffect(() => {
    const nonSpectatorUsers = playersList.filter(user => user.type !== "spectador");
    const voted = playersList.filter(user => user.vote >= 0);
    const allNonSpectatorVoted = nonSpectatorUsers.length > 0 && nonSpectatorUsers.length == voted?.length;
    
    setAllVote(allNonSpectatorVoted);
  }, [playersList]);
  
  
  

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
        <div className={styles["container__desk3"]}>
          {(isOwner && allVote)? (
            <button
              onClick={handleRevealCards}
              className={styles["container__button-reveal"]}
            >
              Revelar Cartas
            </button>
          ) : (
            <></>
          )}
        </div>
        <Usercard></Usercard>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default TableDisplay;
