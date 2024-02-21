import React, { useEffect, useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import Footer from "./footer";
import InvitationModal from "./invitation-modal";
import Header from "./header";

const TableDisplay = () => {
  const { classroomName, socket, isOwner, allNonSpectatorVoted, setInvitationBlur, invitationBlur } =
    usePartyContext();
  const [reset, setReset] = useState(false);

  function handleRevealCards() {
    socket.emit("reveal-cards");
  }

  function handleResetMatch() {
    socket.emit("reset-classroom");
  }

  return (
    <>
    {invitationBlur ? <InvitationModal /> : <></>}
      <div className={`${styles["container"]}`}>
        <Header></Header>
        <main>
          <div className={styles["container__desk"]}></div>
          <div className={styles["container__desk2"]}></div>
          <div className={styles["container__desk3"]}>
            {isOwner && allNonSpectatorVoted && !reset ? (
              <button
                onClick={() => {handleRevealCards(); setReset(true)}}
                className={styles["container__button-reveal"]}
              >
                Revelar Cartas
              </button>
            ) : reset ? (
              <button
                onClick={() => {handleResetMatch(); setReset(false)}}
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
