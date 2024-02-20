import React, { useEffect, useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import Footer from "./footer";
import InvitationModal from "./invitation-modal";

const TableDisplay = () => {
  const { classroomName, socket, isOwner, allNonSpectatorVoted } =
    usePartyContext();

  const [reset, setReset] = useState(false);
  const [blur, setBlur] = useState(false);

  function handleRevealCards() {
    socket.emit("reveal-cards");
  }

  function handleResetMatch() {
    socket.emit("reset-classroom");
  }

  return (
    <>
    {blur ? <InvitationModal /> : <></>}
      <div className={`${styles["container"]}`}>
        <header>
          <img
            className={`${styles["container__logo"]}`}
            src="/images/ficha-de-poker.png"
          />
          <h1 className={`${styles["container__title"]}`}>{classroomName}</h1>
          <div className={`${styles["container__user"]}`}>
            <button
              onClick={() => setBlur(true)}
              className={`${styles["container__user-invite"]}`}
            >
              Invitar
            </button>
          </div>
        </header>
        <main>
          <div className={styles["container__desk"]}></div>
          <div className={styles["container__desk2"]}></div>
          <div className={styles["container__desk3"]}>
            {isOwner && allNonSpectatorVoted && !reset ? (
              <button
                onClick={() => {
                  handleRevealCards();
                  setReset(true);
                }}
                className={styles["container__button-reveal"]}
              >
                Revelar Cartas
              </button>
            ) : reset ? (
              <button
                onClick={() => {
                  handleResetMatch();
                  setReset(false);
                }}
                className={styles["container__button-reveal"]}
              >
                Nueva votación
              </button>
            ) : (
              <></>
            )}
          </div>
          <Usercard></Usercard>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
};

export default TableDisplay;
