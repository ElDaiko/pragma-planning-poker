import React, { useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import Usercard from "@/system-design/atoms/user-card";
import { usePartyContext } from "@/hooks/usePartyContext";
import Footer from "./footer";
import InvitationModal from "./invitation-modal";
import Header from "./header";
import CardLoader from "./cardLoader";

const TableDisplay = () => {
  const { socket, isOwner, allNonSpectatorVoted, invitationBlur } =
    usePartyContext();
  const [reset, setReset] = useState(false);
  const [loadingVotes, setLoadingVotes] = useState(Boolean);

  function handleRevealCards() {
    setLoadingVotes(true);
    setTimeout(() => {
      socket.emit("reveal-cards");
      setLoadingVotes(false);
    }, 3000);
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
              <>
                {!loadingVotes && (
                  <button
                    onClick={() => {
                      handleRevealCards();
                      setReset(true);
                    }}
                    className={styles["container__button-reveal"]}
                  >
                    Revelar Cartas
                  </button>
                )}
              </>
            ) : reset && !loadingVotes ? (
              <button
                onClick={() => {
                  handleResetMatch();
                  setReset(false);
                }}
                className={styles["container__button-reveal"]}
              >
                Nueva votación
              </button>
            ) : loadingVotes ? (
              <CardLoader></CardLoader>
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
