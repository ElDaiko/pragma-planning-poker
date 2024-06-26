import React, { useState } from "react";
import styles from "../../styles/components/user-card.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";

export default function Usercard() {
  const { playersList, owners, socket, isOwner, revealCards} = usePartyContext();

  function giveAdmin(socketID:any) {
    /* console.log("estoy entrando"); */
    socket.emit("add-admin", { socketID })
}

  return (
    <>
      {playersList.map((user) => (
        <div role={user.type === "spectador" ? "spectadorCard" : "playerCard"} onClick={isOwner ? () => giveAdmin(user.socketID) : undefined} key={user._id} className={`${styles["card"]}`}>
          <div className={user.type === "spectador" ? styles["card__spectator"] : (!revealCards && user.vote ? styles["card__playerVote"] : styles["card__player"])}>
          {revealCards && <p>{user.vote}</p>}
            {user.type === "spectador" ? (
              <p>{user.username.slice(0, 2).toUpperCase()}</p>
            ) : null}
          </div>
          <div className={styles["card-admin"]}>
            <p>{owners.includes(user.socketID) && "👑"}</p>
            <p>{user.username}</p>
            <p style={{visibility:"hidden"}}>{ owners.includes(user.socketID) && "👑"}</p>
          </div>
        </div>
      ))}
    </>
  );
}

