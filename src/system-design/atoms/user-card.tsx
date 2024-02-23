import React, { useState } from "react";
import styles from "../../styles/components/user-card.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";

export default function Usercard() {
  const { playersList, owners, socket, isOwner} = usePartyContext();

  function giveAdmin(socketID:any) {
    socket.emit("add-admin", { socketID })
}

console.log(owners);


  return (
    <>
      {playersList.map((user) => (
        <div onClick={isOwner ? () => giveAdmin(user.socketID) : undefined} key={user._id} className={`${styles["card"]}`}>
          <div className={user.type === "spectador" ? styles["card__spectator"] : (user.vote ? styles["card__playerVote"] : styles["card__player"])}>
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

